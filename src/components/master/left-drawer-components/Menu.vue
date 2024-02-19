<template>
  <div>
    <q-item
      clickable
      :class="
        tab.includes(item.route_name)
          ? 'menu-drawer q-my-sm radius-10 text-primary bg-white'
          : 'menu-drawer q-my-sm radius-10 text-grey-8 bg-white'
      "
      v-ripple
      v-for="(item, index) in items.filter((val) => (val.name != 'Bank' && profile.role == 'teacher') || profile.role == 'admin')"
      :key="item.name"
      :active="tab == item.route_name"
      :to="{ name: item.route_name }"
      exact
      ref="items"
      @click="goToLink(index)"
      style="text-align: -webkit-center; margin-left: auto; margin-right: auto"
    >
      <q-item-section avatar>
        <q-icon
          :name="tab.includes(item.route_name) ? item.icon_active : item.icon"
          size="sm"
          :style="replaceImageColor"
        />
      </q-item-section>
      <q-item-section class="text-left text-weight-medium text-subtitle2 gt-sm">
        {{
          item.name == "Simulasi"
            ? appName == "Cerebrum"
              ? "Tryout"
              : "Simulasi"
            : item.name
        }}
      </q-item-section>
      <q-item-section side class="gt-sm">
        <q-icon
          name="keyboard_arrow_right"
          size="sm"
          :class="tab.includes(item.route_name) ? 'text-primary' : 'text-grey'"
        />
      </q-item-section>
      <div :class="tab.includes(item.route_name) ? 'drawer-active' : ''"></div>
    </q-item>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["menu_item"],
  data() {
    return {
      index_drawer: 0,
      route_name: "tryout",
      items: [
        {
          name: "Home",
          icon: "home",
          icon_active: "home",
          route_name: "home",
          event_name: "Menu home",
          is_active: false,
        },
        {
          name: "Bank",
          icon: "img:/img/icons/menu/ic_tryout.png",
          icon_active: "img:/img/icons/menu/ic_tryout_blue.png",
          route_name: "bank",
          event_name: "Menu Bank",
          is_active: false,
        },
        {
          name: "Request",
          icon: "img:/img/icons/menu/ic_latsol.png",
          icon_active: "img:/img/icons/menu/ic_latsol_active.png",
          route_name: "request",
          event_name: "Menu Request",
          is_active: false,
        },
        {
          name: "Akun",
          icon: "img:/img/icons/menu/ic_account.png",
          icon_active: "img:/img/icons/menu/ic_account_active.svg",
          route_name: "akun",
          is_active: false,
        },
      ],
      update_akun: false,
      appName: process.env.WEB_TITLE,
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },
  computed: {
    ...mapGetters({ profile: "account/getUserProfile" }),
    tab: {
      set() {},
      get() {
        return this.$route.name;
      },
    },
  },
  methods: {
    goToLink(x) {
      this.route_name = this.items[x].route_name;
    },
  },
  created() {
    var i;
    for (i = 0; i < this.items.length; i++) {
      if (this.$route.name == this.items[i].route_name) {
        this.route_name = this.items[i].route_name;
      } else if (this.$route.name.includes(this.items[i].route_name)) {
        this.route_name = this.items[i].route_name;
      }
    }
  },
  mounted() {
    var i;
    for (i = 0; i < this.items.length; i++) {
      if (this.$route.name == this.items[i].route_name) {
        this.route_name = this.items[i].route_name;
      } else if (this.$route.name.includes(this.items[i].route_name)) {
        this.route_name = this.items[i].route_name;
      }
    }
  },
  watch: {
    menu_item: function (val) {
      this.route_name = this.items[val].route_name;
    },
  },
};
</script>
