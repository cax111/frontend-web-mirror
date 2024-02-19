<template>
  <div
    v-if="is_title"
    class="absolute-full flex flex-center bg-grey-4 text-grey-6"
  >
    <div class="text-center">
      <q-icon :name="icon_name" :size="icon_size" />
      <div style="font-size: 9px">{{ title }}</div>
    </div>
  </div>
  <q-icon
    v-else
    :name="`${icon_name}`"
    :size="`${icon_size}`"
    :color="`${icon_color}`"
  />
</template>
<script>
export default {
  props: ["icon_name", "icon_size", "icon_color", "title", "is_title"],
};
</script>