<template>
  <div>
    <q-dialog v-model="dialog_app" persistent>
      <q-card class="q-pa-sm" style="width: 400px; color: #555b6c">
        <q-card-section>
          <q-img
            src="~assets/images/asn.png"
            alt="image-popup"
            style="min-height: 200px; max-width: 100%"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-4 text-grey-6">
                <div class="text-center">
                  <ErrorImg
                    :icon_name="'image'"
                    :icon_size="'100px'"
                    :title="'Cannot load image'"
                    :is_title="true"
                  />
                </div>
              </div>
            </template>
          </q-img>
          <q-item-label class="col-9 text-h6 text-justify q-pr-sm q-mt-sm">
            aplikasi untuk mobile tersedia di platform Android dan IOS, yuk
            install {{ title }} di perangkat anda sekarang!
          </q-item-label>
        </q-card-section>
        <q-card-section class="row">
          <div class="col">
            <q-img
              class="cursor-pointer"
              src="~assets/images/google_play.png"
              alt="image-popup"
              style="min-height: 30px; max-width: 100%"
              @click="openLink('play')"
            />
          </div>
          <div class="col q-pl-sm">
            <q-img
              class="cursor-pointer"
              src="~assets/images/app_store.png"
              alt="image-popup"
              style="min-height: 30px; max-width: 100%"
              @click="openLink('store')"
            />
          </div>
          <div class="col-12 q-py-sm">
            <q-btn
              unelevated
              class="full-width bg-primary text-white"
              label="Lanjutkan di WEB APP"
              @click="dialog_app = !dialog_app"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <DialogInfo
      :dialog="dialog_info"
      :is_icon="true"
      :icon_link="'engineering'"
      :icon_color="'blue-10'"
      :heading="'Sedang dalam tahap Pengembangan !'"
      @dialog-info="dialogInfo"
    />
  </div>
</template>
<script>
import ErrorImg from "../error/ErrorImg";
import DialogInfo from "../dialog/DialogInfo.vue";
export default {
  props: ["dialog"],
  components: {
    ErrorImg,
    DialogInfo,
  },

  data() {
    return {
      title: process.env.WEB_TITLE,
      dialog_app: false,
      dialog_info: false,
    };
  },

  methods: {
    openLink(link) {
      if (link == "play") {
        window.open(process.env.PLAY_STORE);
      } else if (link == "store") {
        this.dialog_info = true;
      }
    },
    dialogInfo(e) {
      this.dialog_info = e.is_dialog;
    },
  },

  watch: {
    dialog: {
      immediate: true,
      deep: true,
      handler(dialog) {
        this.dialog_app = dialog;
      },
    },
  },
};
</script>
