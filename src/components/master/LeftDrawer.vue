<template>
  <div class="row" style="overflow: hidden">
    <q-card flat class="col q-pa-md">
      <div class="row items-center justify-center">
        <div class="col-lg-12 col-md-12 col-sm-12 text-center">
          <div class="column items-center gt-sm">
            <div class="col">
              <div @click="goToProfile()">
                <q-avatar color="grey-4" text-color="white">
                  <q-icon name="fas fa-user" size="sm" />
                </q-avatar>
                <Subtitle
                  :subtitle="user_profile.name"
                  :class_add="'cursor-pointer text-grey-9'"
                  :style="'margin-bottom: 0px'"
                />
                <Subtitle
                  :subtitle="user_profile.role"
                  :class_add="'cursor-pointer text-grey-9'"
                  :style="'margin-bottom: 0px'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-list>
        <Menu :menu_item="idx_menu" />
      </q-list>
      <q-list padding class="q-mt-lg">
        <q-item
          class="menu-drawer"
          clickable
          v-ripple
          @click="actionsClick()"
          style="border-radius: 10px"
        >
          <q-item-section avatar>
            <q-icon
              name="img:/img/icons/ic_quit_active.png"
              size="sm"
              :style="replaceImageColor"
            />
          </q-item-section>
          <q-item-section class="text-grey-9 text-subtitle1 text-left gt-sm">
            Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
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
import { mapActions } from "vuex";
import ErrorImg from "components/error/ErrorImg.vue";
export default {
  components: {
    ErrorImg,
    SkeletonDrawer: () => import("../loading/SkeletonDrawer.vue"),
    Subtitle: () => import("../typography/Subtitle.vue"),
    Description: () => import("../typography/Description.vue"),
    DialogConfirm: () => import("../dialog/DialogConfirm.vue"),
    Menu: () => import("./left-drawer-components/Menu.vue"),
  },
  data() {
    return {
      is_premium: false,
      user_profile: {},
      update_akun: false,
      load_menu: true,

      dialog_confirm: false,
      is_icon: false,
      icon_link: "",
      icon_color: "",
      title: "",
      description: "",

      idx_menu: null,
      appName: process.env.WEB_TITLE,
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    ...mapActions({
      logout: "account/logout",
      get_user: "account/getUserProfile",
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
    goToProfile() {
      this.idx_menu = 4;
      this.$router.push({
        name: "akun",
      });

      localStorage.setItem("up_ak", true);
      this.update_akun = localStorage.getItem("up_ak");
    },
    getUser() {
      this.get_user()
        .then((response) => {
          this.user_profile = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goProfile() {
      this.$router.push({
        name: "akun",
      });
    },
    goToMarket() {
      window.location.href = "/pembelian";
    },
  },
};
</script>

<style>
.rounded {
  border-radius: 10px;
}

.text-custom-sidebar {
  font-size: 0.8em;
}

.icon-avatar-custom {
  padding: 0;
}
@media screen and (max-width: 1024px) {
  .icon-avatar-custom {
    align-items: center;
  }
  .menu-drawer {
    padding: 0px;
    width: 56px;
  }
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
