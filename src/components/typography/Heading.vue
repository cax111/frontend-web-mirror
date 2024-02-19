<template>
  <div class="q-pl-md q-pt-lg">
    <h5 class="q-mb-none q-mt-none text-weight-bold text-primary">
      <q-icon :name="icon_link" size="lg" :style="replaceImageColor" />
      <span> {{ title }}</span>
    </h5>
  </div>
</template>

<script>
export default {
  props: [
    "icon_link",
    "title",
    "is_breadcrumb",
    "value",
    "level",
    "label_level_1",
    "label_level_2",
    "label_level_3",
    "label_level_4",
    "data",
  ],

  components: {
  },
  data() {
    return {
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },
};
</script>
