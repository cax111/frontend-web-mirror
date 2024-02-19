<template>
  <q-dialog v-model="dialog_info" persistent>
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
          style="width: 50px; height: 60px"
        >
          <template v-slot:error>
            <q-icon name="info" size="30px" color="white" />
          </template>
        </q-img>

        <Subtitle :subtitle="heading" :text_color="`#${colorPrimary}`" />

        <q-btn
          rounded
          label="Kembali"
          color="primary"
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
export default {
  props: [
    "dialog",
    "is_icon",
    "icon_link",
    "icon_color",
    "image_link",
    "heading",
  ],

  components: {
    Subtitle,
  },

  data() {
    return {
      dialog_info: false,
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
    };
  },

  methods: {
    cancelDialog() {
      this.dialog_info = false;
      this.$emit("dialog-info", false);
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_info = val;
    },
  },
};
</script>
