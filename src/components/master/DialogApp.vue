<template>
  <div>
    <q-dialog v-model="dialog_app" persistent>
      <q-card class="q-pa-sm" style="width: 400px; color: #231f20">
        <q-card-section>
          <q-img
            :src="`/icons/${logoPath}/logo-header.png`"
            alt="image-popup"
            style="min-height: 100px; max-width: 100%"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-4 text-grey-6">
                <div class="text-center">
                  <q-icon name="info" size="md" color="warning" />
                </div>
              </div>
            </template>
          </q-img>
          <q-item-label class="col-9 text-h6 q-pr-sm q-mt-sm">
            Untuk menggunakan aplikasi versi mobile, kamu harus mendownload di
            PlayStore atau AppStore sekarang juga!
          </q-item-label>
        </q-card-section>
        <q-card-section class="row justify-center">
          <div class="col">
            <q-img
              class="cursor-pointer"
              src="/img/google_play.jpg"
              alt="image-popup"
              style="min-height: 30px; max-width: 100%"
              @click="openLink('play')"
            />
          </div>
          <div class="col q-pl-sm">
            <q-img
              class="cursor-pointer"
              src="/img/app_store.jpg"
              alt="image-popup"
              style="min-height: 30px; max-width: 100%"
              @click="openLink('store')"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: ["dialog"],
  data() {
    return {
      dialog_app: false,
      logoPath: process.env.WEB_LOGO_PATH,
    };
  },
  methods: {
    openLink(link) {
      if (link == "play") {
        window.open(process.env.PLAY_STORE);
      } else if (link == "store") {
        window.open(process.env.APP_STORE);
      }
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