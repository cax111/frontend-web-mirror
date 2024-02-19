<template>
  <q-btn
    :label="label_nav"
    :class="class_nav"
    :style="style_nav"
    :loading="load_nav"
    @click="itemQuestion(index_nav, type_nav)"
  >
    <q-icon
      v-if="is_icon"
      :name="icon_nav"
      size="sm"
      :color="icon_color"
      style="margin-top: -55px; margin-left: 30px"
    />
  </q-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: [
    "label_nav",
    "style_nav",
    "is_icon",
    "icon_nav",
    "icon_color",
    "index_nav",
    "type_nav",
    "class_nav",
    "load_nav",
  ],

  methods: {
    itemQuestion(index, type) {
      this.$emit("button-navigation", {
        scroll_question: true,
        index_num: index,
      });
    },
  },
};
</script>