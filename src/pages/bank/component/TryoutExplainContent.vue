<template>
  <div v-if="load" class="text-center">
    <SkeletonTryout :btn="true" :custom_width="'300px'" />
  </div>
  <div v-else>
    <div v-if="$route.name.includes('request')" class="row q-mb-md q-gutter-md">
      <q-btn
        no-caps
        :loading="isProcess"
        :disabled="status == 1"
        class="col"
        color="yellow-9"
        label="To Draft"
        @click="questionActionProcess('draft')"
      />
      <q-btn
        no-caps
        :loading="isProcess"
        :disabled="status == 4"
        class="col"
        color="blue-7"
        label="Ready for QA"
        @click="questionActionProcess('ready')"
      />
    </div>
    <div
      v-if="userProfile.role == 'admin' && $route.name.includes('request')"
      class="q-mb-md row q-gutter-md"
    >
      <q-btn
        no-caps
        :loading="isProcess"
        :disabled="status == 2"
        class="col"
        color="red-7"
        label="Reject"
        @click="dialog_reject = true"
      />
      <q-btn
        no-caps
        :loading="isProcess"
        :disabled="status == 3"
        class="col"
        color="green"
        label="Approve"
        @click="questionActionProcess('approve')"
      />
    </div>
    <q-item
      clickable
      v-ripple
      class="text-caption bg-primary"
      style="border-radius: 10px"
      @click="openDialogExplain(explain_content, explain_video)"
    >
      <q-item-section avatar>
        <q-icon size="sm" name="article" color="white" />
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1" class="text-weight-bold text-white">
          Lihat pembahasan
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon size="sm" name="navigate_next" color="white" />
      </q-item-section>
    </q-item>

    <DialogExplanation
      :dialog="dialog_explain"
      :explain_text="content_explain"
      :explain_video="video_explain"
      @dialog-explanation="dialogExplanation"
    />

    <q-dialog v-model="dialog_reject" persistent>
      <q-card class="q-pa-md" style="width: 400px">
        <div class="text-right q-mb-sm">
          <q-btn dense round unelevated color="red" icon="close" />
        </div>
        <div>
          <q-input outlined dense v-model="text" label="Reject Note" />
          <q-btn
            dense
            unelevated
            class="q-mt-sm full-width"
            color="primary"
            label="Simpan"
            @click="questionActionProcess('reject')"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DialogExplanation from "components/dialog/DialogExplanation.vue";
import SkeletonTryout from "components/loading/SkeletonTryout.vue";
export default {
  props: ["load", "explain_content", "explain_video", "question_id", "status"],

  components: {
    DialogExplanation,
    SkeletonTryout,
  },

  data() {
    return {
      dialog_reject: false,
      dialog_explain: false,
      content_explain: null,
      video_explain: null,
      isProcess: false,
      text: "",
    };
  },

  methods: {
    ...mapActions({
      getQuestions: "account/getQuestion",
      questionAction: "account/questionAction",
    }),
    questionActionProcess(action) {
      this.isProcess = true;
      let data;
      if (action == "reject") {
        data = {
          id: this.question_id,
          action: action,
          rejected_note: this.text,
        };
      } else {
        data = { id: this.question_id, action: action };
      }
      this.questionAction(data)
        .then((res) => {
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Berhasil melakukan aksi.",
          });
          if (this.$route.path.includes("request")) {
            this.getQuestions({
              request_id: this.$route.params.id,
            });
          } else {
            this.getQuestions({
              chapter_id: this.$route.params.id,
            });
          }
        })
        .catch(() => {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Gagal melakukan aksi.",
          });
        })
        .finally(() => {
          this.isProcess = false;
          this.text = "";
          this.dialog_reject = false;
        });
    },
    openDialogExplain(content, video) {
      this.dialog_explain = true;
      this.content_explain = content;
      this.video_explain = video;
    },

    dialogExplanation(e) {
      this.dialog_explain = e.is_dialog;
      this.content_explain = e.content;
      this.video_explain = e.video;
    },
  },

  computed: {
    ...mapGetters({
      userProfile: "account/getUserProfile",
    }),
  },
};
</script>
