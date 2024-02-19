<template>
  <h5
    :class="'text-weight-bold q-mb-none q-mt-sm ' + class_add"
    :style="'color: ' + text_color"
  >
    {{ title }}
  </h5>
</template>

<script>
export default {
  props: ["title", "class_add", "text_color"],
};
</script>