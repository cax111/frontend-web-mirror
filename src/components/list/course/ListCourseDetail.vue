<template>
  <div>
    <q-item
      clickable
      v-ripple
      class="list-style shadow-2 bg-white border-radius-course"
      @click="linkSection(itemChapter)"
    >
      <q-item-section>
        <div class="row q-pt-md">
          <div class="col-2">
            <q-img :src="image_icon" width="50px" height="50px" contain>
              <template v-slot:error>
                <ErrorImg
                  :icon_name="'image'"
                  :icon_size="'50px'"
                  :icon_color="'grey'"
                  :is_title="false"
                />
              </template>
            </q-img>
          </div>
          <div class="col-10 text-weight-bold text-asn q-pr-sm q-pl-lg">
            {{ name }}
            <q-item-label caption class="text-weight-bold q-pt-xs">
              <span v-if="video_total > 0">
                <q-icon name="smart_display" size="xs" class="q-ma-xs" />
                {{ video_done }}/{{ video_total }}
                Video
              </span>
              <span v-if="quiz_total > 0">
                <q-icon name="assignment" size="xs" class="q-ma-xs" />
                {{ quiz_done }}/{{ quiz_total }}
                Kuis
              </span>
              <span v-if="text_total > 0">
                <q-icon name="assignment" size="xs" class="q-ma-xs" />
                {{ text_done }}/{{ text_total }}
                Dokumen
              </span>
            </q-item-label>
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <q-icon name="keyboard_arrow_right" size="md" class="text-primary" />
        <q-icon
          v-if="is_completed"
          style="position: absolute; right: -9px; top: -6px"
          size="3.5rem"
          name="img:../img/icons/ic_finish.svg"
        />
      </q-item-section>
    </q-item>
    <q-dialog v-model="dialog_empty" persistent>
      <q-card style="width: 300px">
        <q-card-section class="text-center">
          <img" :src="`/icons/${logoPath}/logo-header.png`"
          class="cursor-pointer" style="width: 50px; height: 60px" />
          <div class="text-subtitle1 text-blue-10">
            Tidak ada konten apapun.!
          </div>
          <p class="text-grey-6">
            Pilih Kembali untuk melihat konten Lainnya !
          </p>
          <q-btn
            rounded
            flat
            label="Kembali"
            v-close-popup
            no-caps
            class="full-width q-mt-sm bg-materi text-white"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import ErrorImg from "../../error/ErrorImg.vue";
export default {
  components: {
    ErrorImg,
  },
  props: [
    "itemChapter",
    "id",
    "image_icon",
    "name",
    "video_total",
    "video_done",
    "quiz_total",
    "quiz_done",
    "text_total",
    "text_done",
    "is_completed",
  ],
  data() {
    return {
      dialog_empty: false,
    };
  },
  methods: {
    linkSection(chapter) {
      if (
        this.itemChapter.video_progress.total == 0 &&
        this.itemChapter.quiz_progress.total == 0 &&
        this.itemChapter.text_progress.total == 0
      ) {
        this.dialog_empty = true;
      } else {
        this.$router.push({
          name: "materi-section",
          params: { id: this.id },
        });
      }
    },
  },
};
</script>
<style>
.border-radius-custom {
  border-radius: 10px;
  border: 1px solid #eee;
}
.border-radius-course {
  border-radius: 10px;
  border: 1px solid #eee;
}
.q-dialog__inner > div {
  pointer-events: all;
  overflow: unset;
  will-change: scroll-position;
  border-radius: 20px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}
</style>
