<template>
  <div>
    <q-expansion-item
      expand-icon=" "
      v-if="list_pkg"
      class="border-list bg-white"
    >
      <template v-slot:header>
        <div class="col-2 q-pt-sm q-pr-sm">
          <q-skeleton type="circle" size="40px" />
        </div>
        <div class="col-8 q-mt-sm q-mb-sm q-px-md">
          <div class="text-subtitle2 text-weight-bold">
            <q-skeleton type="rect" />
            <q-skeleton type="text" />
          </div>
        </div>
        <div class="col-1 q-pl-lg q-pt-md">
          <q-skeleton size="30px" />
        </div>
      </template>
    </q-expansion-item>
    <div v-if="text_center">
      <div class="q-pt-sm flex flex-center">
        <q-skeleton type="rect" :width="`${custom_width}`" />
      </div>
    </div>
    <div v-if="text_custom">
      <div :class="`${custom_class}`">
        <q-skeleton type="rect" :width="`${custom_width}`" />
      </div>
    </div>
    <div v-if="text_left">
      <div>
        <q-skeleton type="rect" :width="`${custom_width}`" />
      </div>
    </div>
    <div v-if="text_title">
      <q-skeleton type="text" />
    </div>
    <div v-if="btn">
      <q-skeleton type="QBtn" :width="`${custom_width}`" />
    </div>
    <div v-if="card">
      <q-skeleton :width="`${custom_width}`" :height="`${custom_height}`" />
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "list_pkg",
    "text_title",
    "custom_width",
    "custom_height",
    "col",
    "btn",
    "card",
    "text_left",
    "text_center",
    "text_custom",
    "custom_class",
  ],
};
</script>
