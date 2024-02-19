<template>
  <q-header
    v-once
    class="bg-primary text-primary border-bottom"
    height-hint="64"
  >
    <q-toolbar class="q-px-none" style="min-height: auto">
      <q-toolbar-title
        class="bg-white q-py-xs py-mobile row align-center"
        style="border-radius: 0 100px 100px 0"
      >
        <a href="/" style="height:37.5px">
          <img
            :src="`./icons/${logoPath}/logo-header.png`"
            height="37.5px"
            width="150px"
            class="cursor-pointer q-mx-md"
            alt="Logo"
            @click="goToHome()"
            style="width: auto"
          />
        </a>
      </q-toolbar-title>
      <div>
        <q-btn
          v-for="(menu, i) in headerMenu"
          :key="i"
          dense
          round
          unelevated
          size="sm"
          class="q-mx-xs"
          color="primary"
          :icon="menu.icon"
          @click="menuAction(menu.action)"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  props: ["invers"],
  components: {},
  data() {
    return {
      tagline: process.env.WEB_TAGLINE,
      logoPath: process.env.WEB_LOGO_PATH,
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
      headerMenu: [
        {
          icon: "menu",
          action: "akun",
        },
      ],
    };
  },

  methods: {
    goToCart() {
      window.location.href = "/pembelian";
    },
    goToReseller() {
      window.location.href = "/mitra";
    },
    goToHistory() {
      window.location.href = "/pembelian/riwayat";
    },
    goToHome() {
      if (this.$route.path != "/") {
        window.location.href = "/";
      }
    },
    menuAction(val) {
      if (val == "bonus") {
        this.$emit("dialogBonus");
      } else {
        this.$router.push({ name: val }).catch(() => {});
      }
    },
  },
};
</script>
<style>
.border-bottom {
  border-bottom: 1px solid #eee;
}
@media only screen and (max-width: 600px) {
  .border-bottom {
    border-bottom: 0px;
  }
  .py-mobile {
    padding: 0;
  }
}
</style>
