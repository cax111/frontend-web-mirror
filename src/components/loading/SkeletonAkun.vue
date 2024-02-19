<template>
  <div>
    <div v-if="avatar">
      <q-skeleton type="QAvatar" size="90px" />
    </div>
    <div v-if="list_la">
      <div class="text-center" v-for="la in 3" :key="la">
        <q-skeleton type="text" class="q-mt-sm q-pl-md" width="100%" />
      </div>
    </div>
    <div v-if="list_dp">
      <div class="row justify-between" v-for="la in 3" :key="la">
        <div class="col-4 q-pl-md">
          <q-skeleton type="text" class="q-mt-sm" width="100%" />
        </div>
        <div class="col-4 q-pl-md">
          <q-skeleton type="text" class="q-mt-sm" width="85%" />
        </div>
      </div>
    </div>
    <div>
      <q-item v-if="list_info" class="row items-center q-mt-md q-pt-sm">
        <div class="col-1">
          <q-skeleton type="circle" size="22px" />
        </div>
        <div class="col-9 q-mt-sm q-mb-sm q-px-md">
          <div class="text-subtitle2 text-weight-bold">
            <q-skeleton type="rect" />
          </div>
        </div>
        <div class="col-10 q-pl-xl">
          <q-skeleton size="22px" />
        </div>
      </q-item>
    </div>
  </div>
</template>
<script>
export default {
  props: ["avatar", "list_la", "list_dp", "list_info"],
};
</script>
