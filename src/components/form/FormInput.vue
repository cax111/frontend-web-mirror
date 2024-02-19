<template>
  <q-input
    v-model="data_model"
    :label="label_name"
    color="primary"
    label-color="primary"
    dense
    class="q-mt-sm"
    :disable="value == 'email_model' ? true : false"
    :rules="[(val) => (val && val.length > 0) || 'Isi Dulu ya ..']"
  >
    <template v-if="value == 'phone_model'" v-slot:prepend>
      <span class="text-subtitle1 q-pl-sm q-pr-sm">+62</span>
      <span class="text-weight-light">|</span>
    </template>
    <template v-slot:append>
      <q-icon size="xs" color="brown" name="edit" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ["model_data", "label_name", "value"],

  data() {
    return {
      data_model: "",
    };
  },

  watch: {
    model_data: {
      immediate: true,
      deep: true,
      handler(model_data) {
        this.data_model = model_data;
      },
    },

    data_model: {
      immediate: true,
      deep: true,
      handler(data_model) {
        this.$emit("model-data", { data: data_model, value: this.value });
      }
    }
  },
};
</script>