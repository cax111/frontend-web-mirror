<template>
  <div>
    <div v-if="load">
      <SkeletonTryout
        :card="true"
        :custom_width="`800px`"
        :custom_height="`200px`"
      />
      <SkeletonTryout
        v-for="n in 5"
        :key="n"
        :text_left="true"
        :custom_width="`800px`"
        class="q-mt-sm"
      />
    </div>
    <div v-else :style="`font-size: ${zoom_explain}px !important;`">
      <p
        v-if="question_explain"
        :key="(question_text = question_explain.content_question)"
        v-html="hideFontSizeQuestion(question_explain.content_question)"
        class="pre"
      ></p>
      <table
        v-if="question_explain ? question_explain.answer_type === 'table' : false"
        class="q-my-md"
        border="1"
        style="
          font-size: 12px;
          width: 100%;
          border: 1px solid black;
          border-collapse: collapse;
          border-radius: 10px;
        "
      >
        <tr>
          <th style="padding: 10px">Pernyataan</th>
          <th
            v-for="(header, i) in question_explain.table_headers.split('NBSWCZDF')"
            :key="i"
            style="width: 100px"
          >
            <div v-html="hideFontSizeQuestion(header)" class="pre"></div>
          </th>
        </tr>
        <tr
          class="text-center"
          v-for="(row, i) in question_explain.table_rows"
          :key="i"
        >
          <td class="text-left" style="width: 150px; padding: 10px">
            <div v-html="hideFontSizeQuestion(row.statement)" class="pre"></div>
          </td>
          <td
            v-for="header in question_explain.table_headers.split('NBSWCZDF')"
            :key="header"
            style="width: 100px"
          >
            <div style="">
              <div
                :style="`transform: translate(-50%, 0); margin-left: 50%; border: black 1px solid; height: 20px; width: 20px; border-radius: 50%;`"
              >
                <div
                  v-if="row.correct_statement === header"
                  style="
                    margin: 2px 0px 0 2px;
                    background: rgb(132, 218, 146);
                    border-radius: 50%;
                    height: 14px;
                    width: 14px;
                  "
                ></div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <q-dialog v-model="dialog_question">
      <q-img :src="image_data ? image_data[0] : ''" />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import common from "../../../mixins/common.js";
export default {
  props: ["load", "explain_question"],
  mixins: [common],
  components: {
    SkeletonTryout: () => import("components/loading/SkeletonTryout.vue"),
  },

  data() {
    return {
      question_explain: {},

      question_text: null,
      image_data: null,

      dialog_question: false,
    };
  },

  methods: {
    reRender() {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    },

    hideFontSizeQuestion(val) {
      if (val) {
        let data = val.replace(/font-size:/g, "");
        if (this.question_explain.answer_type == "table") {
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

        return data;
      } else return "";
    },
  },

  mounted() {
    this.reRender();

    let _ = this;
    window.showImageQuestions = function () {
      _.image_data =
        _.question_explain.content_question.match(/src=[\"\']([^\"\']+)/g);

      if (_.image_data.length) {
        _.image_data.forEach((item, i) => {
          _.image_data[i] = item.replace(/(src=\")/g, "");
          _.dialog_question = true;
        });
      }
    };
  },

  created() {
    this.reRender();
  },

  computed: {
    ...mapGetters({
      zoom_explain: "account/setTryoutExplainZoom",
    }),
  },

  watch: {
    explain_question: {
      immediate: true,
      deep: true,
      handler(explain_question) {
        this.question_explain = explain_question;
      },
    },

    question_text: function () {
      this.$nextTick().then(() => {
        this.reRender();
      });
    },
  },
};
</script>