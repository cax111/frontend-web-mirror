<template>
  <q-layout class="bg-grey-2" view="hHh LpR fFf">
    <basic-header :invers="false" @dialogBonus="dialog_bonus = !dialog_bonus" />
    <q-drawer
      :mini="screen < 1025 ? true : false"
      :mini-width="100"
      :width="250"
      :breakpoint="599"
      show-if-above
      side="left"
    >
      <basic-drawer />
    </q-drawer>
    <q-page-container :style="'padding-bottom: 20px'">
      <div :class="`bg-grey-2 ${layoutWithSelection ? 'mobile-screen' : ''}`">
        <router-view />
      </div>
    </q-page-container>
    <q-footer bordered class="bg-white text-primary lt-sm">
      <q-tabs
        dense
        no-caps
        :breakpoint="0"
        align="justify"
        active-color="primary"
        indicator-color="transparent"
        class="text-grey text-tab"
        v-model="tab"
      >
        <q-tab
          v-for="(item, i) in items.filter((val) => val.name != 'Bank' && profile.role == 'teacher')"
          :key="i"
          :name="item.route_name"
          @click="
            item.route_name != $route.name
              ? $router.push({ name: item.route_name })
              : null
          "
        >
          <span
            aria-hidden="true"
            role="presentation"
            class="q-tab__icon q-icon"
            :style="replaceImageColor"
          >
            <q-icon
              :name="
                tab.includes(item.route_name) ? item.icon_active : item.icon
              "
              size="sm"
            />
          </span>
          <div class="q-tab__label">{{ item.name }}</div>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import common from "../mixins/common.js";
import menus from "../json/menus.json";
export default {
  mixins: [common],
  components: {
    BasicHeader: () => import("components/master/BasicHeaderNew.vue"),
    BasicDrawer: () => import("components/master/LeftDrawer.vue"),
  },

  data() {
    return {
      dialog_app: false,
      dialog_bonus: false,
      dialogThumbnail: false,
      is_load: false,
      slide: 1,
      promotion: [],
      thumbnailData: {},
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
      items: menus,
    };
  },
  methods: {
    ...mapActions({
      setActiveSelection: "common/setActiveSelection",
    }),
    openDialogThumbnail(val) {
      this.dialogThumbnail = true;
      this.thumbnailData = val;
    },
  },
  computed: {
    ...mapGetters({
      set_banner: "common/setBannerSlider",
      profile: "account/getUserProfile"
    }),
  },
};
</script>
<style media="screen">
.text-grey .q-tab .q-tab__content {
  margin-top: 5px;
}
.text-grey .q-tab .q-tab__content .q-tab__label {
  margin-top: 3px;
  font-size: 0.7em !important;
}

@media screen and (max-width: 600px) {
  .mobile-screen {
    border-radius: 50px 50px 0px 0px;
    top: -40px;
    position: relative;
    padding-top: 50px;
  }
}
</style>
