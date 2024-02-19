<template>
  <q-dialog v-model="dialog_report" persistent>
    <q-card style="width: 350px">
      <q-card-section class="q-pb-xs">
        <Title
          :class_add="'text-center'"
          :title="title_report"
          :text_color="`#${colorPrimary}`"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <Subtitle
          :class_add="'text-center'"
          :subtitle="'Mengapa kamu mengirimkan laporan ini ?'"
          :text_color="'#555'"
        />

        <!-- <div class="q-pa-md">
          <q-option-group
            :options="options_report"
            label="Notifications"
            type="radio"
            v-model="report_option"
            class="text-caption text-weight-medium"
          />
        </div> -->

        <q-input
          type="textarea"
          outlined
          dense
          v-model="another_report"
          label="Laporan"
          class="q-mb-md"
        />

        <Subtitle
          :class_add="'text-center'"
          :subtitle="
            'Dengan membuat laporan, info mengenai terkait akan dikirim ke ' +
            title
          "
          :text_color="'#555'"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs q-gutter-sm">
        <q-btn
          :loading="load_report"
          :disable="another_report == '' || another_report == ' '"
          no-caps
          rounded
          class="full-width bg-primary text-white"
          label="Kirim"
          @click="reportAction(type)"
        />
        <q-btn
          no-caps
          flat
          rounded
          class="full-width text-primary"
          label="Batal"
          @click="cancelReport()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";
import Title from "../typography/Title.vue";
import Subtitle from "../typography/Subtitle.vue";
export default {
  props: [
    "dialog",
    "title_report",
    "options_report",
    "type",
    "tryout_id",
    "tryout_name",
    "isLatsol",
    "question_id",
    "materi_id",
  ],

  components: {
    Title,
    Subtitle,
  },

  data() {
    return {
      dialog_report: false,
      report_option: "",
      another_report: "",
      load_report: false,
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
      title: process.env.WEB_TITLE,
    };
  },

  methods: {
    ...mapActions({
      report_action: "tryout/postReportTryout",
      report_action_materi: "course/postReportCourse",
      postPixelAnalytics: "analytics/postPixelAnalytics",
    }),

    reportAction(type) {
      let item = {};
      if (type == "question") {
        let pixelData = {
          event_name: this.isLatsol ? "Latsol Report" : "Tryout Report",
          action_source: "website",
          custom_data: {
            platform: "web",
            id: this.tryout_id,
            name: this.tryout_name,
          },
        };
        this.postPixelAnalytics(pixelData);
        item = {
          tryout_id: this.tryout_id,
          report_content: this.another_report,
          question_id: this.question_id,
          type: "question",
        };
        this.postReportTryout(item);
      } else if (type == "materi") {
        item = {
          report: this.another_report,
          id: this.materi_id,
        };
        this.postReportCourse(item);
      } else if (type == "explanation") {
        let pixelData = {
          event_name: this.isLatsol ? "Latsol Report" : "Tryout Report",
          action_source: "website",
          custom_data: {
            platform: "web",
            id: this.tryout_id,
            name: this.tryout_name,
          },
        };
        this.postPixelAnalytics(pixelData);
        item = {
          report_content: this.another_report,
          question_id: this.question_id.id,
          type: "explanation",
        };
        this.postReportTryout(item);
      }
    },
    postReportTryout(item) {
      this.load_report = true;
      this.report_action(item)
        .then((response) => {
          this.$q.notify({
            type: "positive",
            position: "top",
            message: response.data.message,
          });

          this.load_report = false;
          this.$emit("dialog-report", false);

          this.dialog_report = false;

          this.report_option = "";
          this.another_report = "";
        })
        .catch((error) => {
          this.load_report = false;
          this.$emit("dialog-report", false);

          this.report_option = "";
          this.another_report = "";

          this.$q.notify({
            type: "negative",
            position: "top",
            message: `Gagal proses`,
          });
        });
    },
    postReportCourse(item) {
      this.load_report = true;
      this.report_action_materi(item)
        .then((response) => {
          this.$q.notify({
            type: "positive",
            position: "top",
            message: response.data.message,
          });

          this.load_report = false;
          this.$emit("dialog-report", false);

          this.dialog_report = false;

          this.report_option = "";
          this.another_report = "";
        })
        .catch((error) => {
          this.load_report = false;
          this.$emit("dialog-report", false);

          this.report_option = "";
          this.another_report = "";

          this.$q.notify({
            type: "negative",
            position: "top",
            message: `Gagal proses`,
          });
        });
    },
    cancelReport() {
      this.dialog_report = false;
      this.$emit("dialog-report", false);

      this.report_option = "";
      this.another_report = "";
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_report = val;
    },
  },
};
</script>
