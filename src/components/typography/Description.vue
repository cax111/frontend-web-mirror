<template>
  <p
    :class="'text-caption text-weight-bold q-mb-none ' + class_add"
    :style="`color: ${text_color}`"
  >
    <q-icon v-if="is_icon" :name="icon_name" size="sm" :color="icon_color" />
    {{ description }}
  </p>
</template>

<script>
export default {
  props: ["description", "text_color", "is_icon", "icon_name", "icon_color", "class_add"],
};
</script>