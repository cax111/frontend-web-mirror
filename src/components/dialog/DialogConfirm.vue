<template>
  <q-dialog v-model="dialog_confirm" persistent>
    <q-card style="width: 300px">
      <q-card-section class="text-center">
        <q-icon
          v-if="is_icon"
          :name="icon_link"
          :color="icon_color"
          style="font-size: 4rem"
        />
        <q-img
          v-else
          :src="image_link"
          class="cursor-pointer"
          style="width: 100%"
        >
          <template v-slot:error>
            <ErrorImg
              :icon_name="'image'"
              :icon_size="'30px'"
              :icon_color="'white'"
              :is_title="false"
            />
          </template>
        </q-img>
        <div class="text-grey-9 text-body2">{{ heading }}</div>
        <div class="text-grey-7 text-caption">{{ subheading }}</div>

        <FormFile
          v-if="value == 'file_photo'"
          :hint="'Pilih Foto'"
          @fill-photo="fillPhoto"
        />

        <FormTextArea v-if="value == 'feedback'" @model-text="modelText" />

        <q-btn
          rounded
          label="Ya"
          color="primary"
          no-caps
          class="full-width q-mt-sm"
          @click="btnConfirm()"
        />

        <q-btn
          rounded
          label="Tidak"
          color="primary"
          flat
          no-caps
          class="full-width q-mt-sm"
          @click="cancelDialog()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Subtitle from "../typography/Subtitle.vue";
import Description from "../typography/Description.vue";
import FormFile from "../form/FormFile.vue";
import FormTextArea from "../form/FormTextArea.vue";
import ErrorImg from "../error/ErrorImg.vue";
export default {
  components: {
    Subtitle,
    Description,
    FormFile,
    ErrorImg,
    FormTextArea,
    ErrorImg,
  },

  props: [
    "dialog",
    "is_icon",
    "icon_link",
    "icon_color",
    "image_link",
    "heading",
    "subheading",
    "data_item",
    "value",
  ],

  data() {
    return {
      dialog_confirm: false,
      item_data: null,
    };
  },

  methods: {
    cancelDialog() {
      this.dialog_confirm = false;
      this.$emit("dialog-confirm", { is_action: false, is_dialog: false });
    },

    btnConfirm(e) {
      this.dialog_confirm = false;
      this.$emit("dialog-confirm", false);
    },

    fillPhoto(e) {
      this.item_data = e;
    },

    modelText(e) {
      this.item_data = e;
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_confirm = val;
    },

    data_item: {
      immediate: true,
      deep: true,
      handler(data_item) {
        this.item_data = data_item;
      },
    },
  },
};
</script>

<style>
.q-dialog__inner > div {
  pointer-events: all;
  overflow: unset;
  will-change: scroll-position;
  border-radius: 20px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}
</style>
