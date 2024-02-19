<template>
  <div>
    <q-item
      clickable
      v-ripple
      class="bg-white border-10 q-pa-md"
      @click="
        is_premium
          ? number <= unlocked
            ? openDialog(name, id, false)
            : openDialog(name, id, true)
          : openDialog(name, id, false)
      "
    >
      <q-item-section avatar>
        <q-icon
          size="sm"
          name="check_circle"
          :color="
            trans
              ? trans[index]
                ? trans[index].is_attempted
                  ? 'primary'
                  : 'grey'
                : 'grey'
              : 'grey'
          "
        />
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1" class="text-subtitle2 text-grey-9">
          {{ name }}
        </q-item-label>
      </q-item-section>
      <q-item-section side v-if="is_premium">
        <q-icon
          size="sm"
          class="text-grey-9"
          :name="number <= unlocked ? 'keyboard_arrow_right' : 'lock'"
        />
      </q-item-section>
      <q-item-section side v-else>
        <q-icon size="sm" name="navigate_next" class="text-grey-9" />
        <q-icon
          :style="`
            position: absolute;
            right: -5px;
            bottom: 15px;
            ${replaceImageColor}
          `"
          size="xl"
          name="img:../img/icons/ic_ribbon_free.svg"
        />
      </q-item-section>
    </q-item>

    <DialogPremium
      :dialog="dialog_lock"
      :subtitle="subtitle"
      :label_yes="label"
      @dialog-premium="dialog_lock = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog_lock: false,
      subtitle: "",
      label: "",

      dialog_list: false,
      tryout_name: "",
      tryout_id: null,
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },

  props: [
    "index",
    "name",
    "trans",
    "number",
    "unlocked",
    "is_premium",
    "id",
    "user_premium",
    "data_tryout",
  ],

  components: {
    DialogPremium: () => import('../../dialog/DialogPremium.vue'),
  },

  methods: {
    openDialog(name, id, is_locked) {
      if (is_locked) {
        if (this.user_premium) {
          this.dialog_lock = true;
          this.subtitle =
            "Paket premium kamu belum bisa mengakses tryout ini, silahkan upgrade paket kamu sekarang";
          this.label = "Upgrade Paket";
        } else {
          this.dialog_lock = true;
          this.subtitle =
            "Sepertinya kamu belum punya paket premium. Yuk beli paket premium sekarang!";
          this.label = "Beli Paket";
        }
      } else {
        this.$emit("list-tryout", {
          is_action: true,
          name: name,
          id: id,
          is_premium: this.is_premium,
        });
      }
    },
  },

  created() {},
};
</script>
<style media="screen">
.border-list {
  border: 1px solid #eee;
  border-radius: 10px;
}
</style>
