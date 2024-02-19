<template>
  <div v-if="load">
    <SkeletonTryout
      v-for="n in 4"
      :key="n"
      :text_left="true"
      :custom_width="`800px`"
      class="q-mt-sm"
    />
  </div>
  <div v-else>
    <div class="row q-ma-sm">
      <div class="col-auto text-center" style="align-self: center">
        <q-icon name="zoom_in" size="md" />
      </div>
      <div class="col q-pl-sm">
        <q-slider v-model="zoom" :min="14" :max="30" />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md">
        <div v-if="explain_question" class="text-body2 text-grey-9 text-weight-medium">
          No. Urut Soal :
          {{
            explain_question
              ? explain_question.no_urut
                ? explain_question.no_urut
                : "-"
              : "-"
          }}
        </div>
      </div>
      <div class="col-xs-12 col-md text-body2 text-grey-9 text-weight-medium">
        <div v-if="explain_question">
          Level :
          <q-rating
            v-model="level"
            :max="4"
            size="1em"
            color="red-7"
            readonly
            icon="fiber_manual_record"
          />
        </div>
      </div>
      <div class="col-xs-12 col-md">
        <div v-if="explain_question" class="text-body2 text-grey-9 text-weight-medium">
          Kunci jawaban :
          <span
            v-html="
              hideFontSizeQuestion(
                explain_question
                  ? explain_question.answer_type == 'short_answer'
                    ? explain_question.answer_options
                      ? explain_question.answer_options.replaceAll(
                          'NBSWCZDF',
                          ' / '
                        )
                      : '-'
                    : explain_question.answer_type == 'table'
                    ? explain_question.table_rows
                        .map((val) => val.correct_statement)
                        .join(' / ')
                    : explain_question.correct_answer
                    ? explain_question.correct_answer.toUpperCase()
                    : '-'
                  : '-'
              )
            "
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SkeletonTryout from "components/loading/SkeletonTryout.vue";
import Title from "components/typography/Title.vue";
export default {
  props: ["load", "explain_question", "max_speed", "min_speed"],

  components: {
    SkeletonTryout,
    Title,
  },

  data() {
    return {
      zoom: 16,
      type: process.env.WEB_TITLE,
    };
  },

  methods: {
    ...mapActions({
      zoom_explain: "account/zoomQuestionExplain",
    }),
    hideFontSizeQuestion(val) {
      let data = "";
      if (val) {
        data = val.replace(/font-size:/g, "");
        if (this.explain_question.answer_type == "table") {
          data = data.replace(/<p>/g, "");
          data = data.replace(/<\/p>/g, "");
        }
        if (this.screen < 600) {
          data = data.replace(/(width:\w+)/g, "width:100%;");
          data = data.replace(/(height:\w+;)/g, "");
          data = data.replace(/(width: \w+)/g, "width:100%;");
          data = data.replace(/(height: \w+;)/g, "");
        }
        data = data.replace(
          /(<img)/g,
          `<img onclick="showImageQuestions" class="cursor-pointer"`
        );
      }
      return data;
    },
  },
  computed: {
    level() {
      if (this.explain_question.level.toLowerCase() == "mudah") {
        return 1;
      } else if (this.explain_question.level.toLowerCase() == "sedang") {
        return 2;
      } else if (this.explain_question.level.toLowerCase() == "sulit") {
        return 3;
      } else if (this.explain_question.level.toLowerCase() == "hots") {
        return 4;
      } else {
        return 0;
      }
    },
  },

  watch: {
    zoom: function (val) {
      this.zoom_explain(val);
    },
  },
};
</script>

<style>
.top-items {
  margin-top: -10px;
}
</style>
