<template>
  <p
    :class="'text-weight-bold text-subtitle2 q-mb-sm ' + class_add"
    :style="`color: ${text_color}`"
  >
    {{ subtitle }}
  </p>
</template>

<script>
export default {
  props: ["subtitle", "text_color", "class_add"],
};
</script>
<style></style>
