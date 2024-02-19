<template>
  <div>
    <!-- List Tryout -->
    <q-item
      v-if="list_tryout"
      class="row items-center q-mt-md border-list bg-white q-pt-sm"
    >
      <div class="col">
        <q-skeleton type="circle" size="22px" />
      </div>
      <div class="col-10 q-mt-sm q-mb-sm q-px-md">
        <div class="text-subtitle2 text-weight-bold">
          <q-skeleton type="rect" />
        </div>
      </div>
      <div class="col">
        <q-skeleton size="22px" />
      </div>
    </q-item>
    <!-- Detail Tryout Result -->
    <div v-if="row_rank">
      <div class="row text-center text-white q-pa-sm q-mt-md">
        <div v-for="it in item" :key="it" class="col">
          <q-skeleton type="QBadge" />
        </div>
      </div>
    </div>
    <div v-if="list_rank">
      <q-item v-for="lr in item" :key="lr">
        <div class="col-1 q-pl-md q-pt-sm">
          <q-skeleton type="circle" size="22px" />
        </div>
        <div class="col-9 q-mt-sm q-px-md">
          <div class="text-subtitle2 text-weight-bold">
            <q-skeleton type="rect" />
          </div>
        </div>
        <div class="col-9 q-pt-sm">
          <q-skeleton size="22px" />
        </div>
      </q-item>
    </div>
    <div v-if="text_center">
      <div class="q-pt-sm flex flex-center">
        <q-skeleton type="rect" :width="`${custom_width}`" />
      </div>
    </div>
    <div v-if="text_left">
      <div>
        <q-skeleton type="rect" :width="`${custom_width}`" />
      </div>
    </div>
    <q-item v-if="row_score">
      <q-item v-for="rs in item" :key="rs" :class="`${col} q-pl-xl`">
        <q-skeleton type="QBadge" width="100px" />
      </q-item>
    </q-item>
    <div v-if="btn">
      <q-skeleton type="QBtn" :width="`${custom_width}`" />
    </div>
    <div v-if="card">
      <q-skeleton :width="`${custom_width}`" :height="`${custom_height}`" />
    </div>
    <div v-if="btn_circle">
      <q-skeleton
        type="circle"
        :width="`${custom_width}`"
        :height="`${custom_height}`"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "list_tryout",
    "item",
    "row_rank",
    "list_rank",
    "text_left",
    "text_center",
    "row_score",
    "custom_width",
    "custom_height",
    "col",
    "btn",
    "card",
    "btn_circle",
  ],
};
</script>

<style>
.border-radius-course {
  border-radius: 10px;
  border: 1px solid #eee;
}
</style>
