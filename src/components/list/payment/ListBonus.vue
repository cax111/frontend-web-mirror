<template>
  <q-expansion-item
    v-model="expanded"
    class="bg-white text-grey-8 text-weight-medium radius-10"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="image_icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section> {{ type_name }} </q-item-section>
    </template>
    <div class="q-px-md q-py-sm">
      <div v-for="itemLink in item_groups" :key="itemLink.id" class="q-my-sm">
        <q-btn
          unelevated
          rounded
          class="full-width q-my-sm"
          color="primary"
          :label="itemLink.name"
          @click="linkGroup(itemLink.link)"
        />
        <!-- <q-item
          class="q-pa-md bg-info"
          style="border-radius: 5px"
          clickable
          v-ripple
          @click="linkGroup(itemLink.link)"
        >
          <q-item-section>
            <q-item-label
              lines="2"
              class="text-weight-bold text-subtitle2 text-white"
              >{{ itemLink.name }}</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-icon size="sm" name="navigate_next" color="white" />
          </q-item-section>
        </q-item> -->
      </div>
    </div>
  </q-expansion-item>
  <!-- <q-item
    class="q-pa-md"
    :style="`border:1px solid #${colorPrimary};
    border-radius: 10px;`"
  >
    <q-item-section>
      <q-item-label lines="2" class="text-weight-bold text-subtitle2">{{
        type_name
      }}</q-item-label>
      <div v-if="link_groups.length == 0">
        <Empty :message="'Bonus Paket Premium ini belum tersedia'" />
      </div>
      <div v-else>
        <div
          v-for="itemLink in item_groups"
          :key="itemLink.id"
          class="q-mb-sm q-mt-sm"
        >
          <q-item
            class="q-pa-md shadow-3 bg-info"
            style="border-radius: 5px"
            clickable
            v-ripple
            @click="linkGroup(itemLink.link)"
          >
            <q-item-section>
              <q-item-label
                lines="2"
                class="text-weight-bold text-subtitle2 text-white"
                >{{ itemLink.name }}</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-icon size="sm" name="navigate_next" color="white" />
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-item-section>
  </q-item> -->
</template>

<script>
import { mapActions } from "vuex";
import Empty from "../../master/EmptyState.vue";
export default {
  props: ["image_icon", "type_id", "type_name", "link_groups"],

  components: {
    Empty,
  },

  data() {
    return {
      expanded: false,
      item_groups: [],
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
    };
  },

  methods: {
    ...mapActions({
      postPixelAnalytics: "analytics/postPixelAnalytics",
    }),
    linkGroup(item) {
      let pixelData = {
        event_name: "Bonus Premium",
        action_source: 'website',
        custom_data: {
          platform: 'web',
          id: this.type_id,
          name: this.type_name
        }
      }
      this.postPixelAnalytics(pixelData);
      if (!item.startsWith("http")) {
        item = "https://" + item;
      }
      window.open(item, "_blank");
    },
  },

  watch: {
    link_groups: {
      immediate: true,
      deep: true,
      handler(link_groups) {
        this.item_groups = link_groups;
      },
    },
  },
};
</script>
