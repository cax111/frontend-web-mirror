<template>
  <q-btn
    rounded
    icon="replay"
    label="Muat Ulang"
    no-caps
    style="background: #4077aa; color: white"
    @click="actionClick(value)"
  />
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["value"],

  methods: {
    ...mapActions({}),
    actionClick(value){}
  }
}
</script>