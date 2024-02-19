<template>
  <div>
    <q-btn
      dense
      class="gt-sm q-mb-xs"
      v-if="!load"
      flat
      icon="chevron_left"
      label="Kembali"
      color="white"
      @click="back()"
    />
    <div>
      <SkeletonTryout v-if="load" :text_center="true" :custom_width="`250px`" />
      <Subheading
        v-else
        :subheading="`Pratinjau Soal`"
        :text_color="'#ffffff'"
        :class_add="'subheading-position text-center'"
      />

      <div class="row justify-between items-center">
        <SkeletonTryout v-if="load" :row_rank="true" :item="1" />
        <div v-else class="col row justify-between">
          <div class="col text-body2 text-white" v-if="question_explain">
            Soal ke
            <span class="text-yellow">
              {{ active_question + 1 }}
            </span>
            dari
            <span class="text-yellow">
              {{ question_explain ? question_explain.length : "" }}
            </span>
            soal
          </div>
          <div
            class="col text-right text-body2 text-white"
            v-if="question_explain"
          >
            <span
              class="q-px-sm q-py-xs"
              :class="{
                'bg-yellow-9': question_explain
                  ? question_explain[active_question]
                    ? question_explain[active_question].status == 1
                    : false
                  : false,
                'bg-red-7': question_explain
                  ? question_explain[active_question]
                    ? question_explain[active_question].status == 2
                    : false
                  : false,
                'bg-green-7': question_explain
                  ? question_explain[active_question]
                    ? question_explain[active_question].status == 3
                    : false
                  : false,
                'bg-blue-7': question_explain
                  ? question_explain[active_question]
                    ? question_explain[active_question].status == 4
                    : false
                  : false,
              }"
              style="border-radius: 50px"
              >{{ status }}</span
            >
          </div>
        </div>

        <SkeletonTryout v-if="load" :row_rank="true" :item="1" />
      </div>
    </div>
  </div>
</template>

<script>
import Subheading from "components/typography/Subheading.vue";
import SkeletonTryout from "components/loading/SkeletonTryout.vue";
export default {
  props: ["load", "explain_question", "active_question"],

  components: {
    Subheading,
    SkeletonTryout,
  },

  data() {
    return {
      question_explain: {},
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    status() {
      if (this.question_explain) {
        if (this.question_explain[this.active_question]) {
          switch (this.question_explain[this.active_question].status) {
            case 1:
              return "Draft";
            case 2:
              return "Reject";
            case 3:
              return "Approve";
            case 4:
              return "Ready for QA";
            default:
              return "";
          }
        }
      } else {
        return "";
      }
    },
  },
  watch: {
    explain_question: {
      immediate: true,
      deep: true,
      handler(explain_question) {
        this.question_explain = explain_question;
      },
    },
  },
};
</script>

<style>
@media only screen and (min-width: 1024px) {
  .subheading-position {
    margin-top: -35px;
  }
}
</style>
