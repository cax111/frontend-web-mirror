<template>
  <q-input
    v-model="model_text"
    filled
    placeholder="Saran dan Masukan?"
    hint="*Masukan kamu sangat berharga bagi kami"
    type="textarea"
    ref="feedback"
    :rules="[
      (val) => (val && val.length > 0) || 'Isi Dulu ya ..',
      (val) => val.length > 20 || 'Minimal 20 karakter',
    ]"
  ></q-input>
</template>

<script>
export default {
  data() {
    return {
      model_text: "",
    };
  },

  watch: {
    model_text: function (val) {
      this.$emit("model-text", val);
    },
  },
};
</script>