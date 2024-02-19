<template>
  <h6
    :class="'text-weight-bold q-mb-xs q-mt-none ' + class_add"
    :style="`color: ${text_color}`"
  >
    {{ subheading }}
  </h6>
</template>

<script>
export default {
  props: ["subheading", "text_color", "class_add"]
};
</script>
