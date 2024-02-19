<template>
  <p
    :class="'text-weight-bold text-subtitle1 q-mb-sm ' + class_add"
    :style="`color: ${text_color}`"
  >
    {{ title }}
  </p>
</template>

<script>
export default {
  props: ["title", "text_color", "class_add"],
};
</script>
<style></style>
