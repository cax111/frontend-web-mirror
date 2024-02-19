<template>
  <q-dialog v-model="dialog_check" persistent>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="row align-start">
          <div class="col-11 text-h6">Our Changing Planet</div>

          <div class="col text-right">
            <q-btn
              dense
              round
              size="sm"
              color="primary"
              icon="close"
              @click="cancelDialog"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ButtonAdvance from "../buttons/ButtonAdvance.vue";
import Subtitle from "../typography/Subtitle.vue";
export default {
  props: [
    "dialog",
    "explain_text",
    "explain_video",
    "isCorrect",
    "colorDialog"
  ],

  components: {
    Subtitle,
    ButtonAdvance
  },

  data() {
    return {
      dialog_check: false
    };
  },

  computed: {
    ...mapGetters({
      // set_course_item: "course/setCourseItem",
      // activeQuestion: "course/setCourseactiveQuestion",
      // isCorrect: "course/setCourseisCorrect",
      // colorDialog: "course/setCoursecolorDialog",
    })
  },

  methods: {
    ...mapActions({
      question_next: "course/questionNext",
      clear_answer: "course/clearAnswer"
    }),
    goBack() {
      this.$router.go(-1);
    },
    changeQuestionNext() {
      this.question_next();
    },
    clear() {
      this.clear_answer();
    },
    cancelDialog() {
      this.dialog_check = false;
      this.$emit("closeDialog", false);
    }
  },

  watch: {
    dialog: {
      immediate: true,
      deep: true,
      handler(dialog) {
        this.dialog_check = dialog;
      }
    },
    is_correct: {
      immediate: true,
      deep: true,
      handler(is_correct) {
        this.isCorrect = is_correct;
      }
    },
    color_dialog: {
      immediate: true,
      deep: true,
      handler(color_dialog) {
        this.colorDialog = color_dialog;
      }
    }
  }
};
</script>
