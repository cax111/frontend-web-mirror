<template>
  <div
    class="q-pa-md text-center absolute left-to-center"
    style="top: 50%; transform: translateX(-50%) translateY(-50%)"
  >
    <div
      class="q-pa-md bg-grey-5 text-white"
      style="
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        width: 80px;
      "
    >
      <q-icon name="fas fa-user" size="xl" />
    </div>
    <div class="q-mt-sm text-blue-8 text-weight-medium">
      {{ userProfile.name }}
    </div>
    <div class="q-mb-sm">{{ userProfile.email }}</div>
    <button
      class="q-py-xs q-px-md bg-blue-8 text-white"
      style="border-radius: 40px; border: 0px"
    >
      <q-icon name="fas fa-check" class="text-green q-mr-sm" />
      {{ userProfile.role }}
    </button>
    <div>
      <button
        class="q-my-md q-py-xs q-px-md bg-red-4 text-white"
        style="border-radius: 40px; border: 0px; width: 360px; cursor: pointer"
        @click="actionsClick"
      >
        Logout
      </button>
    </div>
    <DialogConfirm
      :dialog="dialog_confirm"
      :is_icon="is_icon"
      :image_link="icon_link"
      :heading="title"
      :subheading="description"
      :value="'logout'"
      @dialog-confirm="dialogConfirm"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    DialogConfirm: () => import("components/dialog/DialogConfirm.vue"),
  },
  data() {
    return {
      dialog_confirm: false,
      is_icon: false,
      icon_link: "",
      icon_color: "",
      title: "",
      description: "",
    };
  },
  methods: {
    ...mapActions({
      logout: "account/logout",
      getUser: "account/getUserProfile",
    }),
    actionsClick() {
      this.dialog_confirm = true;
      this.is_icon = false;
      this.icon_link =
        "/icons/" + process.env.WEB_LOGO_PATH + "/logo-header.png";
      this.icon_color = "primary";
      this.title = `Keluar dari ${process.env.WEB_TITLE}?`;
      this.description = "Kamu selalu dapat masuk kembali kapan saja.";
    },
    dialogConfirm(e) {
      if (e == false) {
        this.logout();
        this.dialog_confirm = false;
        window.location = "/login";
      } else {
        this.dialog_confirm = false;
      }
    },
  },
  computed: {
    ...mapGetters({ userProfile: "account/getUserProfile" }),
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
.left-to-center {
  left: calc(50% + 100px);
}

@media screen and (max-width: 600px) {
  .left-to-center {
    left: 50%;
  }
}
</style>