<template>
  <q-dialog v-model="dialog_summary" persistent>
    <q-card
      class="bg-white column justify-center"
      :style="`width: 100%; ${
        summary_type == 2 ? 'min-height: 40%' : 'height: 100%'
      }`"
    >
      <div class="col-auto text-white bg-primary q-pa-sm">
        <div class="row">
          <div class="col-auto">
            <q-btn flat round dense icon="arrow_back" @click="cancelDialog()" />
          </div>
          <div class="col q-pr-lg text-center">
            <Subheading
              :subheading="summary_name ? summary_name : 'Rangkuman Materi'"
              text_color="#ffffff"
            />
          </div>
        </div>
      </div>
      <div v-if="loading" class="col self-center">
        <q-spinner
          v-if="loading"
          color="primary"
          size="3em"
          style="height: 100%"
        />
      </div>
      <div v-else class="col">
        <div
          class="q-pa-md"
          v-if="summary_type == 1 || summary_type > 2"
          style="height: 100%"
        >
          <q-pdfviewer
            v-model="pdfviewer"
            :src="summary_content"
            type="html5"
            error-string="Error PDF"
            style="width: 100%; height: 100%"
          />
        </div>
        <q-card-section class="col col-12" v-else-if="summary_type == 2">
          <p v-html="summary_instruction"></p>
        </q-card-section>
      </div>
      <div class="col-auto q-pa-sm" v-if="summary_type == 2 && !loading">
        <q-card-actions class="col-12 q-gutter-y-sm">
          <q-input
            v-if="summary_submit_type == 'textfield'"
            v-model="text"
            filled
            autogrow
            class="full-width q-mb-xs gray-1"
          />
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            @change="onFilePicked"
          />
          <div
            v-if="imageUrl && summary_submit_type == 'upload_file'"
            class="relative-position"
            style="width: 100%"
          >
            <div
              class="absolute-top-right z-top text-subtitle1 text-center bg-transparent"
            >
              <q-btn
                size="12px"
                class="q-mx-md q-my-sm"
                round
                color="primary"
                icon="edit"
                @click="$refs.fileInput.click()"
              />
            </div>
            <div class="overflow-auto" style="width: 100%; height: 300px">
              <q-img class="q-mx-auto" :src="imageUrl" />
            </div>
          </div>
          <q-btn
            v-else-if="summary_submit_type == 'upload_file'"
            unelevated
            no-caps
            stack
            size="18px"
            padding="40px 10px"
            class="full-width"
            color="grey-4"
            text-color="grey-5"
            icon="image"
            label="klik disini untuk upload bukti sudah mengerjakan tugas ini."
            @click="$refs.fileInput.click()"
          />
          <q-btn
            v-if="summary_link"
            unelevated
            no-caps
            dense
            class="full-width"
            color="primary"
            icon="open_in_new"
            label="Link Instruksi"
            :href="
              summary_link.includes('http')
                ? summary_link
                : 'https://' + summary_link
            "
            target="_blank"
          />
          <q-btn
            v-if="summary_submit_type != ''"
            unelevated
            no-caps
            dense
            :disabled="loadingBtn"
            class="full-width"
            color="primary"
            label="Kirim"
            @click="sendInstruction"
          />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Subheading from "../typography/Subheading.vue";
export default {
  props: [
    "dialog",
    "loading",
    "course_id",
    "summary_id",
    "summary_type",
    "summary_name",
    "summary_link",
    "summary_content",
    "summary_instruction",
    "summary_image",
    "summary_submit_type",
    "textfield",
  ],

  components: {
    Subheading,
  },

  data() {
    return {
      text: "",
      dialog_summary: false,
      pdf_data: "",
      pdfviewer: true,
      imageUrl: null,
      image: null,
      loadingBtn: false,
    };
  },

  methods: {
    ...mapActions({
      postCourseInstruction: "course/postCourseInstruction",
      send_progress: "course/sendProgress",
    }),
    cancelDialog() {
      this.dialog_summary = false;
      this.$emit("dialog-summary", false);
    },
    getPdf(data) {
      axios
        .get(data, {
          responseType: "blob",
          mode: "no-cors",
          "Access-Control-Allow-Origin": "*",
        })
        .then((response) => {
          this.pdf_data = URL.createObjectURL(response.data);
          window.open(this.pdf_data);
        })
        .catch((err) => {});
    },
    async onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      const formData = new FormData();
    },
    async sendInstruction() {
      this.loadingBtn = true;
      const formData = new FormData();
      formData.append("course_id", this.course_id);
      formData.append("item_id", this.summary_id);
      if (this.summary_submit_type == "textfield") {
        formData.append("textfield", this.text);
        await this.send_progress(formData)
          .then((res) => {
            this.$q.notify({
              type: "positive",
              position: "top",
              message: "Berhasil Mengirim Data",
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              position: "top",
              message: "Gagal Mengirim Data",
            });
          })
          .finally(() => {
            this.text = "";
            this.loadingBtn = false;
            this.$emit("close");
          });
      } else {
        formData.append("file_name", this.image);
        await this.postCourseInstruction(formData)
          .then((res) => {
            this.$q.notify({
              type: "positive",
              position: "top",
              message: "Berhasil Mengirim Data",
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              position: "top",
              message: "Gagal Mengirim Data",
            });
          })
          .finally(() => {
            this.text = "";
            this.loadingBtn = false;
            this.$emit("close");
          });
      }
    },
  },
  watch: {
    dialog: function (val) {
      this.dialog_summary = val;
    },
    summary_content: function (val) {
      // this.getPdf(val);
    },
    summary_image: function (val) {
      this.imageUrl = val;
    },
    textfield: function (val) {
      this.text = val;
    },
  },
};
</script>
