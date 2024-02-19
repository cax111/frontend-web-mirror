<template>
  <q-dialog v-model="dialog_share" position="bottom" persistent>
    <q-card style="width: 450px">
      <div class="text-right">
        <q-btn
          unelevated
          dense
          round
          color="negative"
          icon="close"
          style="position: absolute; z-index: 1; right: 5px; margin-top: -15px"
          @click="cancelDialog()"
        />
      </div>
      <q-card-section class="row">
        <Subtitle
          :subtitle="'Share halaman ini menggunakan media sosial dibawah :'"
        />
        <Separator />
        <div
          class="col-4 text-center q-my-sm"
          v-for="item in networkShare"
          :key="item.id"
        >
          <ShareNetwork
            :network="item.name"
            :url="deep_link"
            :title="share_title"
            :description="share_description"
            :quote="share_quote"
            :hashtags="tagline"
          >
            <q-btn :icon="'img:/img/icons/' + item.icon" :color="item.color" />
          </ShareNetwork>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import Subtitle from "../typography/Subtitle.vue";
import Separator from "../separator/Separator.vue";
export default {
  props: [
    "dialog",
    "deep_link",
    "share_title",
    "share_description",
    "share_quote",
  ],
  components: {
    Subtitle,
    Separator,
  },
  data() {
    return {
      tagline: process.env.WEB_TAGLINE,
      dialog_share: false,
      networkShare: [
        {
          id: 1,
          name: "whatsapp",
          icon: "whatsapp.svg",
          color: "green-9",
        },
        {
          id: 2,
          name: "line",
          icon: "line.svg",
          color: "green-8",
        },
        {
          id: 3,
          name: "telegram",
          icon: "telegram.svg",
          color: "blue-6",
        },
        {
          id: 4,
          name: "facebook",
          icon: "facebook.svg",
          color: "blue-9",
        },
        {
          id: 5,
          name: "twitter",
          icon: "twitter.svg",
          color: "blue-5",
        },
      ],
    };
  },
  methods: {
    cancelDialog() {
      this.dialog_share = false;
      this.$emit("dialog-share", false);
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_share = val;
    },
  },
};
</script>

<style>
.header-dialog {
  background-color: #ffffff;
  color: white;
  font-size: small;
  position: fixed;
}
</style>
