<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white" style="max-width: 500px; width: 100%">
      <q-bar class="bg-primary q-my-sm">
        <q-space />
        <q-btn dense flat icon="close" @click="$emit('dialogClose', false)">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="q-mx-lg q-mb-lg">
        <AccountBonus
          v-if="type == 'bonus'"
          :value="getBonus"
          :title="'Bonus Premium'"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AccountBonus from "components/master/AccountProfileBonus.vue";
import Empty from "components/master/EmptyState.vue";
export default {
  props: ["dialog", "iframe", "type"],
  components: {
    AccountBonus,
    Empty,
  },
  data() {
    return {
      maximizedToggle: true,
    };
  },
  methods: {
    ...mapActions({
      get_bonus: "membership/getBonusMembership",
      get_profile_info: "account/getProfileInfo",
    }),
  },
  created() {
    if (this.getBonus == null) {
      this.get_bonus();
    }
    this.get_profile_info({ is_edit: false });
  },
  computed: {
    ...mapGetters({
      getBonus: "membership/setBonusMembership",
      premium: "membership/setUserPremium",
      set_title: "purchase/setProfileTitle",
    }),
  },
};
</script>
