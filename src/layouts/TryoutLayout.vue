<template>
  <q-layout view="hHh LpR fFf" style="background: #e5e5e5">
    <basic-header />
    <q-page-container>
      <div class="row">
        <div class="col-12">
          <router-view />
        </div>
      </div>
    </q-page-container>
    <DialogApp :dialog="dialog_app" />
  </q-layout>
</template>

<script>
export default {
  components: {
    BasicHeader: () => import('src/components/master/BasicHeaderNew.vue'),
    DialogApp: () => import('components/dialog/DialogApp.vue'),
  },
  data() {
    return {
      dialog_app: false,
      screen: null,
    };
  },
  created() {
    this.screen = screen.width;
    if (this.screen < 800) {
      this.dialog_app = true;
    }
  },
};
</script>
