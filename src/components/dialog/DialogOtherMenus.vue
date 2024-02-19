<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-2" style="max-width: 500px; width: 100%">
      <q-bar class="bg-primary text-white q-py-lg">
        <span class="text-body2 q-ml-xs">Menu</span>
        <q-space />
        <q-btn dense flat icon="close" @click="$emit('closeDialog', false)">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="q-mx-lg q-my-sm">
        <AdditionalMenu v-if="generalInfo.apps.other_menu" />
        <div class="q-mb-lg" v-else><Empty message="Menu lainnya tidak tersedia." /></div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["dialog"],
  components: {
    AdditionalMenu: () =>
      import("components/master/right-drawer-components/AdditionalMenu.vue"),
    Empty: () => import("components/master/EmptyState.vue"),
  },
  methods: {},
  computed: {
    ...mapGetters({
      generalInfo: "common/setGeneralInfo",
    }),
  },
};
</script>