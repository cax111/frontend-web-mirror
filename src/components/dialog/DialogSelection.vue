<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white q-py-lg">
        <div>Ubah Jenis Seleksi</div>
        <q-space />
        <q-btn dense flat icon="close" @click="$emit('dialogClose', false)">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="q-mx-md q-mt-md" style="width: 300px">
        <q-btn
          v-for="item in selection"
          unelevated
          :color="model == item.id ? 'primary' : 'white text-grey-10'"
          class="full-width q-my-xs"
          :label="item.name"
          :key="item.id"
          @click="model = item.id"
        />
        <!-- <q-select
          dense
          outlined
          emit-value
          map-options
          v-model="model"
          :options="selection"
          option-value="id"
          option-label="name"
          label="Selection"
          class="radius-10"
          style="background: white"
        /> -->
      </div>
      <q-card-actions class="text-primary q-px-md q-mb-sm">
        <q-btn
          dense
          unelevated
          color="secondary"
          class="full-width"
          label="Submit"
          :disabled="!model"
          :loading="load"
          @click="updateChange"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["dialog"],
  data() {
    return {
      load: false,
      model: null,
    };
  },
  methods: {
    ...mapActions({
      updateProfile: "account/postProfile",
      getSelection: "common/getSelection",
      setActiveSelection: "common/setActiveSelection",
    }),
    updateChange() {
      this.load = true;
      this.updateProfile({ selection_id: this.model }).then((res) => {
        this.getSelection().then((val) => {
          this.setActiveSelection();
          this.load = false;
        });
        this.$emit("dialogClose", false);
      });
    },
  },
  computed: {
    ...mapGetters({
      selection: "common/getSelection",
      activeSelection: "common/getActiveSelection",
    }),
  },
  watch: {
    activeSelection: function (val) {
      this.model = val.id;
    },
  },
};
</script>
