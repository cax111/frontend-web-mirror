<template>
  <q-dialog v-model="dialog_lock" persistent>
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-grey-10 text-center">{{ subtitle }}</div>

        <div v-if="is_promo" class="q-mb-sm q-mt-sm">
          <Countdown />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          rounded
          label="Lain Kali"
          color="grey-10"
          no-caps
          @click="closeDialog()"
        />
        <q-btn
          flat
          rounded
          :label="label_yes"
          color="primary"
          no-caps
          to="/pembelian"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Countdown from "../../components/master/CountdownPromo.vue";
import Subtitle from "../../components/typography/Subtitle.vue";
export default {
  props: ["dialog", "subtitle", "label_yes"],
  components: {
    Countdown,
    Subtitle,
  },
  data() {
    return {
      is_promo: localStorage.getItem("t_promo"),
      dialog_lock: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialog_lock = false;
      this.$emit("dialog-premium", false);
    },
  },
  watch: {
    dialog: function (val) {
      this.dialog_lock = val;
    },
  },
};
</script>

<style>
.q-dialog__inner > div {
  pointer-events: all;
  overflow: unset;
  will-change: scroll-position;
  border-radius: 20px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}
</style>
