<template>
  <div>
    <div v-for="i in item" :key="i" :class="'row q-pa-sm '+addClass">
      <div class="col-2">
        <q-skeleton type="circle" size="24px" />
      </div>
      <div class="col-7 q-pt-xs">
        <div class="">
          <q-skeleton type="rect" />
        </div>
      </div>
      <div class="col-3 q-pl-sm">
        <q-skeleton size="24px" />
      </div>
    </div>
     <div v-if="text">
      <div>
        <q-skeleton type="text" :width="`${custom_width}`" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item","text","custom_width", "addClass"],
};
</script>