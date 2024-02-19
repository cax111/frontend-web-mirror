<template>
  <div id="q-app" class="my-font">
    <div v-if="isLoading" class="wrap-logo">
      <img
        class="logo-loading"
        :src="`icons/${logoPath}/logo.png`"
        style="max-width: 320px"
      />
    </div>
    <router-view v-if="!isLoading" />
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/messaging";

export default {
  name: "App",
  meta: {
    title: process.env.WEB_TITLE + " - " + process.env.WEB_TAGLINE,
    link: {
      icon16: {
        rel: "icon",
        type: "image/png",
        size: "16x16",
        href: "icons/" + process.env.WEB_LOGO_PATH + "/favicon-16x16.png",
      },
      icon32: {
        rel: "icon",
        type: "image/png",
        size: "32x32",
        href: "icons/" + process.env.WEB_LOGO_PATH + "/favicon-32x32.png",
      },
      icon96: {
        rel: "icon",
        type: "image/png",
        size: "96x96",
        href: "icons/" + process.env.WEB_LOGO_PATH + "/favicon-96x96.png",
      },
      icon128: {
        rel: "icon",
        type: "image/png",
        size: "128x128",
        href: "icons/" + process.env.WEB_LOGO_PATH + "/favicon-128x128.png",
      },
      icon: {
        rel: "icon",
        type: "image/ico",
        href: "icons/" + process.env.WEB_LOGO_PATH + "/favicon.ico",
      },
    },
  },
  data() {
    return {
      showLoading: true,
      isLoading: true,
      service_server: process.env.SERVICE_SERVER,
      logoPath: process.env.WEB_LOGO_PATH,
      vapidKey: process.env.VAPID_KEY,
    };
  },
  created() {
    this.$q.addressbarColor.set("#2A5275");
    this.isMaintenance();
  },
  methods: {
    async isMaintenance() {
      this.isLoading = false;
    },
    receiveMessage() {
      try {
        firebase.messaging().onMessage((payload) => {
          this.$q.notify({
            message: payload.data.title,
            caption: payload.data.body,
            color: "secondary",
            position: "top",
          });
        });
      } catch (e) {
        console.log(e);
      }
    },

    subscribeTopic(token, topic) {
      axios
        .post(
          "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic,
          {},
          {
            headers: {
              Authorization: "key=" + this.service_server,
            },
          }
        )
        .then((response) => {
          // console.log('Subscribed to "' + topic + '"');
        })
        .catch((error) => {});
    },
  },
  computed: {
    layout() {
      if (this.$route.name != null) {
        this.showLoading = false;
      }
    },
  },
};
</script>
<style media="screen">
.q-virtual-scroll__content {
  padding-bottom: 8px;
}
::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ccc;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>
