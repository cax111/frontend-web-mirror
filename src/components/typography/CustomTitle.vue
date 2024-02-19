<template>
  <p
    :class="class_add"
    :style="`color: ${text_color}`"
  >
    {{ custom_title }}
  </p>
</template>

<script>
export default {
  props: ["custom_title", "text_color", "class_add"],
};
</script>
<style>