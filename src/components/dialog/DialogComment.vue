<template>
  <q-dialog v-model="dialog_comment" persistent>
    <q-card>
      <div>
        <q-btn
          unelevated
          dense
          round
          color="negative"
          icon="close"
          style="
            position: absolute;
            z-index: 1;
            right: -10px;
            margin-top: -10px;
          "
          @click="cancelDialog()"
        />
      </div>
      <q-card-section>
        <Title :title="title_comment" :text_color="'#000000'" />

        <q-form @submit="actionButton(type)">
          <div class="row">
            <q-input
              v-if="type == 'comment'"
              v-model="comment_text"
              rounded
              outlined
              :placeholder="label_comment"
              type="textarea"
              class="col-12"
              :rules="[
                (val) => !!val || 'Isi komentarnya dulu...',
                (val) =>
                  val == val.match(/^[\S]+(?:\s[\S]+)*\s?$/) ||
                  'Terlalu banyak spasi!',
                (val) => val.length > 20 || 'Minimal 20 karakter',
                (val) => val.length <= 500 || 'Maksimal 500 karakter',
              ]"
              clearable
            ></q-input>
            <q-input
              v-else
              v-model="qna_text"
              outlined
              :placeholder="label_comment"
              type="textarea"
              class="col-12"
              :rules="[
                (val) => !!val || 'Isi QnA dulu...',
                (val) =>
                  val == val.match(/^[\S]+(?:\s[\S]+)*\s?$/) ||
                  'Terlalu banyak spasi!',
                (val) => val.length > 20 || 'Minimal 20 karakter',
                (val) => val.length <= 500 || 'Maksimal 500 karakter',
              ]"
              clearable
            ></q-input>

            <q-file
              v-model="file_photo"
              color="primary"
              dense
              outlined
              clearable
              label="Lampirkan Foto"
              accept=".jpg, image/*"
              max-file-size="2048000"
              class="col-12"
              @rejected="handleFileUpload"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
          </div>

          <div class="q-mt-sm text-center">
            <q-btn
              class="text-white full width bg-primary"
              size="md"
              no-caps
              :style="'border-radius: 5px; width: 40%; max-width: 100%;'"
              padding="xs lg"
              label="Kirim"
              type="submit"
              :loading="loading_btn"
              :disable="qna_text || (comment_text && file_photo) ? false : true"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";
import Title from "../typography/Title.vue";
export default {
  props: ["dialog", "liveclass_id", "label_comment", "title_comment", "type"],

  components: {
    Title,
  },

  data() {
    return {
      dialog_comment: false,
      loading_btn: false,
      comment_text: "",
      qna_text: "",
      file_photo: null,
    };
  },

  methods: {
    ...mapActions({
      post_comment: "liveclass/postLiveclassComment",
      post_qna: "liveclass/postLiveclassQna",
    }),

    handleFileUpload() {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: `Maaf, file tidak lolos validasi (harus berekstensi .jpg/.jpeg/.png dan maksimal ukuran 2MB`,
      });
    },

    cancelDialog() {
      this.dialog_comment = false;
      this.comment_text = null;
      this.qna_text = null;
      this.file_photo = null;
      this.$emit("dialog-comment", false);
    },

    actionButton(type) {
      if (type == "comment") {
        let item_data = new FormData();
        item_data.append("live_class_id", this.liveclass_id);
        item_data.append("comment", this.comment_text);
        if (this.file_photo.length > 0)
          item_data.append("photos", this.file_photo);

        this.postComment(item_data);
      } else if (type == "qna") {
        let item_data = new FormData();
        item_data.append("live_class_id", this.liveclass_id);
        item_data.append("qna", this.qna_text);
        if (this.file_photo) item_data.append("photos[0]", this.file_photo);
        this.postQnA(item_data);
      }
    },

    postComment(data) {
      this.loading_btn = true;
      this.post_comment(data)
        .then((response) => {
          this.loading_btn = false;
          this.$emit("dialog-comment", false);
          this.comment_text = null;
          this.file_photo = null;
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Komentar berhasil ditambahkan",
          });
        })
        .catch((error) => {
          this.loading_btn = false;
          this.$emit("dialog-comment", false);
          this.comment_text = null;
          this.file_photo = null;
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Komentar gagal ditambahkan",
          });
        });
    },
    postQnA(data) {
      this.loading_btn = true;
      this.post_qna(data)
        .then((response) => {
          this.loading_btn = false;
          this.$emit("dialog-comment", false);
          this.comment_text = null;
          this.file_photo = null;
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "QnA berhasil ditambahkan",
          });
        })
        .catch((error) => {
          this.loading_btn = false;
          this.$emit("dialog-comment", false);
          this.comment_text = null;
          this.file_photo = null;
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "QnA gagal ditambahkan",
          });
        });
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_comment = val;
    },
  },
};
</script>

<style>
.top-align {
  margin-top: -5px;
}
</style>
