<template>
  <div>
    <q-img
      :src="cover_img"
      :style="`width: ${width_img} ; height:${height_img}`"
      :fit="contain_img"
    >
      <template v-slot:error>
        <div :class="`${class_img}`">
          <div :class="`${class_error}`">
            <ErrorImg
              :icon_name="icon_name"
              :icon_size="icon_size"
              :icon_color="icon_color"
              :title="title"
              :is_title="is_title"
            />
          </div>
        </div>
      </template>
    </q-img>
  </div>
</template>
<script>
import ErrorImg from "../error/ErrorImg.vue";
export default {
  props: [
    "cover_img",
    "width_img",
    "max_width_img",
    "height_img",
    "contain_img",
    "class_img",
    "class_error",
    "icon_name",
    "icon_size",
    "icon_color",
    "title",
    "is_title",
  ],
  components: {
    ErrorImg,
  },
};
</script>
