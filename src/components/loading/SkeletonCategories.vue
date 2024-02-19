<template>
  <div class="row q-gutter-sm q-mb-xs">
    <div v-for="c in category" :key="c">
      <q-skeleton type="QChip" width="150px" height="25.14px" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["category"],
};
</script>
