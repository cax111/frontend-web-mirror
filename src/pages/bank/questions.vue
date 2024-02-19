<template>
  <q-page>
    <div class="q-pa-md">
      <q-card
        square
        class="bg-primary"
        style="border-radius: 10px 10px 0 0 !important"
      >
        <q-card-section>
          <ExplainTitle
            :load="set_load && questions.length == 0"
            :explain_question="questions"
            :active_question="question_index"
          />
        </q-card-section>
      </q-card>

      <div class="row" style="border-radius: 0 0 10px 10px; overflow: hidden">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <q-card square flat class="q-pa-md bg-white" style="height: 75vh">
            <q-card-section>
              <q-scroll-area
                style="height: calc(75vh - 180px)"
                visible
                ref="scrollQuestion"
              >
                <ExplainQuestion
                  :load="set_load && questions.length == 0"
                  :explain_question="questions[question_index]"
                />
              </q-scroll-area>

              <ExplainAnswer
                :load="set_load && questions.length == 0"
                :explain_question="questions[question_index]"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12 bg-white" style="height: 75vh">
          <q-card
            square
            flat
            class="q-pr-md q-pl-md q-pt-sm q-pb-sm bg-white"
            style="height: calc(75vh - 190px)"
          >
            <q-card-section>
              <q-scroll-area style="height: calc(75vh - 220px)" visible>
                <ExplainNavigation
                  :load="set_load && questions.length == 0"
                  :explain_question="questions"
                  :index_question="question_index"
                  @explain-navigation="explainNavigation"
                />
              </q-scroll-area>
            </q-card-section>
          </q-card>
          <q-card square flat class="q-pa-sm bg-white">
            <q-card-section>
              <ExplainContent
                :load="set_load && questions.length == 0"
                :explain_content="
                  questions[question_index]
                    ? questions[question_index].content_explanation
                    : ''
                "
                :explain_video="
                  questions[question_index]
                    ? questions[question_index].explanation_video_id
                    : ''
                "
                :question_id="questions[question_index] ? questions[question_index].id : 1"
                :status="questions[question_index] ? questions[question_index].status : 1"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import ExplainTitle from "./component/TryoutExplainTitle.vue";
import ExplainQuestion from "./component/TryoutExplainQuestion.vue";
import ExplainAnswer from "./component/TryoutExplainAnswer.vue";
import ExplainNavigation from "./component/TryoutExplainNavigation.vue";
import ExplainContent from "./component/TryoutExplainContent.vue";
import ExplainActions from "./component/TryoutExplainActions.vue";
export default {
  components: {
    LottieAnimation,
    ExplainTitle,
    ExplainQuestion,
    ExplainAnswer,
    ExplainNavigation,
    ExplainContent,
    ExplainActions,
  },
  data() {
    return {
      lesson_id: null,
      attempt_id: null,
      question_index: 0,
    };
  },

  created() {
    this.getUser();
    this.screen = screen.width;
    if (this.$route.path.includes("request")) {
      this.getQuestions({
        request_id: this.$route.params.id
      });
    } else {
      this.getQuestions({
        chapter_id: this.$route.params.id,
        page: 1
      });
    }
  },

  mounted() {},

  watch: {},

  methods: {
    ...mapActions({
      getQuestions: "account/getQuestion",
      getUser: "account/getUserProfile",
    }),

    decrypt(txt) {
      var decMessage = txt.slice(16);
      var data = decMessage.slice(0, decMessage.length - 16).split("x");
      this.lesson_id = data[0];
      this.attempt_id = data[1];
    },

    explainNavigation(e) {
      this.question_index = e.index_num;
      if (e.scroll_question) {
        this.$refs.scrollQuestion.setScrollPosition(0);
      }
    },

    explainActions(e) {
      if (e.scroll_question) {
        this.$refs.scrollQuestion.setScrollPosition(0);
      }

      if (e.index_num) {
        this.question_index = e.index_num;
      }
    },
  },

  computed: {
    ...mapGetters({
      questions: "account/getQuestions",
      set_load: "account/getUserLoad"
    }),
  },
};
</script>
  
  <style>
@media only screen and (min-width: 1024px) {
  .min-height {
    min-height: 22vh;
  }
}
.bg-cereout-explain {
  background: #356692;
}

.btn {
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 6px;
  height: 35px;
  width: 35px;
}

.q-dialog__inner > div {
  pointer-events: all;
  overflow: unset;
  will-change: scroll-position;
  border-radius: 20px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}

.card-dialog {
  background: #356692;
  padding-top: 5px;
  padding-bottom: 5px;
}

.wrap-lottie {
  display: flex;
  vertical-align: middle;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
}

.logo-lottie {
  align-self: center;
}

.pre {
  height: auto !important;
  width: 100% !important;
}
</style>
  