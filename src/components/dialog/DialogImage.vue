<template>
  <q-dialog
    v-model="dialog_img"
    full-width
    v-if="this.img.width > 1000 && this.img.width > this.img.height"
    persistent
  >
    <q-card style="width: 100vw">
      <q-img :src="img_thumb">
        <q-btn
          dense
          padding="4px"
          class="bg-white text-grey-10"
          icon="close"
          size="sm"
          style="float: right; margin: 5px; cursor: pointer; z-index: 100"
          @click="cancelDialog()"
        />
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-grey-2 text-grey-8">
            <q-icon name="error_outline" size="xl" />
          </div>
        </template>
      </q-img>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialog_img" v-else persistent>
    <q-card style="width: 100vw">
      <q-img :src="img_thumb">
        <q-icon
          name="close"
          size="xs"
          style="float: right; margin: 5px; cursor: pointer"
          @click="cancelDialog()"
        />
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-grey-2 text-grey-8">
            <q-icon name="error_outline" size="xl" />
          </div>
        </template>
      </q-img>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ["dialog", "img_thumb"],

  data() {
    return {
      dialog_img: false,
      img: new Image(),
    };
  },

  methods: {
    cancelDialog() {
      this.dialog_img = false;
      this.$emit("dialog-img", false);
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_img = val;
    },

    img_thumb: function (val) {
      this.img.src = val;
    },
  },
};
</script>