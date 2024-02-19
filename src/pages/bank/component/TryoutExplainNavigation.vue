<template>
  <div>
    <div
      v-if="load"
      :class="screen > 1366 ? 'row q-gutter-md' : 'row q-gutter-sm'"
    >
      <div v-for="n in 100" :key="n">
        <SkeletonTryout :btn="true" :custom_width="'40px'" />
      </div>
    </div>
    <div v-else :class="screen > 1366 ? 'row q-gutter-md' : 'row q-gutter-sm'">
      <div
        v-for="(question_item, index) in question_explain"
        :key="index"
        :ref="`num-${index}`"
      >
        <ButtonNavigation
          :label_nav="index + 1"
          :class_nav="`q-ma-xs text-weight-bold ${
            index_question == index ? 'bg-red-4' : 'bg-grey-4'
          } text-white btn`"
          :is_icon="
            question_item.scoring_type == 1 || question_item.scoring_type == 3
              ? true
              : false
          "
          :index_nav="index"
          @button-navigation="buttonNavigation"
        />
      </div>
    </div>
    <q-btn
      dense
      unelevated
      v-if="currentPage != lastPage"
      :disabled="currentPage == lastPage"
      :loading="questionsLoad"
      class="q-mt-md full-width"
      color="red-8"
      label="Load More"
      @click="loadMoreQuestions"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ButtonNavigation from "components/buttons/ButtonNavigation.vue";
import SkeletonTryout from "components/loading/SkeletonTryout.vue";
export default {
  props: ["load", "explain_question", "index_question"],

  components: {
    ButtonNavigation,
    SkeletonTryout,
  },

  data() {
    return {
      screen: null,
      question_index: null,
      question_explain: [],
    };
  },

  created() {
    this.screen = screen.width;
  },

  methods: {
    ...mapActions({
      getQuestions: "account/getQuestion",
    }),
    buttonNavigation(e) {
      this.$emit("explain-navigation", e);

      setTimeout(() => {
        const [el] = this.$refs[`num-${e.index_num}`];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 200);
    },

    scrollNum(num) {
      setTimeout(() => {
        const [el] = this.$refs[`num-${num}`];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 200);
    },
    loadMoreQuestions() {
      this.getQuestions({
        chapter_id: this.$route.params.id,
        page: this.currentPage + 1,
      });
    },
  },

  computed: {
    ...mapGetters({
      currentPage: "account/getQuestionsCurrentPage",
      lastPage: "account/getQuestionsLastPage",
      questionsLoad: "account/getQuestionsLoad"
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

    index_question: {
      immediate: true,
      deep: true,
      handler(index_question) {
        this.question_index = index_question;
        if (this.question_index != null) {
          this.scrollNum(this.question_index);
        }
      },
    },
  },
};
</script>