<template>
  <div>
    <q-item clickable v-ripple class="q-pa-md" @click="goToDetail(itemCourse)">
      <q-item-section avatar>
        <q-img :src="image_icon" width="50px" height="50px" contain>
          <template v-slot:error>
            <ErrorImg
              :icon_name="'image'"
              :icon_size="'50px'"
              :is_title="false"
            />
          </template>
        </q-img>
      </q-item-section>
      <q-item-section>
        <q-item-label
          lines="1"
          class="text-weight-bold q-mb-none text-subtitle1 text-grey-9"
        >
          <div style="align-self: center">
            {{ name }}
          </div>
        </q-item-label>
        <q-item-label
          lines="1"
          class="text-weight-bold q-mb-sm text-caption text-grey-9"
        >
          <div style="align-self: center">Progress Belajar :</div>
        </q-item-label>
        <q-item-label>
          <q-linear-progress
            size="15px"
            :value="percentage_progress / 100"
            style="border-radius: 10px"
            color="light-blue-10"
          >
            <div class="absolute-full flex flex-center">
              <q-badge
                :text-color="
                  percentage_progress / 100 < 0.45 ? 'light-blue-10' : 'white'
                "
                :label="percentage_progress + '%'"
                :color="
                  percentage_progress / 100 < 0.45 ? 'grey-4' : 'light-blue-10'
                "
              />
            </div>
          </q-linear-progress>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon size="md" name="keyboard_arrow_right" class="text-primary" />
        <!-- <q-icon
          v-if="percentage_progress == 100"
          :style="`${replaceImageColor} position: absolute; right: -9px; top: -6px`"
          size="3.5rem"
          name="img:../img/icons/ic_finish.svg"
        /> -->
      </q-item-section>
    </q-item>
  </div>
</template>
<script>
export default {
  props: ["itemCourse", "id", "image_icon", "name", "percentage_progress"],
  components: {},
  data() {
    return {
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },
  methods: {
    goToDetail(course) {
      this.$router.push({ name: "materi-chapter", params: { id: this.id } });
    },
  },
};
</script>
