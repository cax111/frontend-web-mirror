<template>
  <q-layout class="bg-secondary">
    <q-page-container>
      <q-page
        class="flex justify-center items-center"
        style="min-height: 100vh; height: 100%"
      >
        <LoadingAnimation :textColor="'text-white'" v-if="isLoadPage" />
        <q-card v-else class="my-card" flat style="border-radius: 10px">
          <q-card-section class="bg-white pa-m-lg">
            <div class="text-center">
              <q-img
                class="relative"
                :src="`icons/${logoPath}/logo.png`"
                spinner-color="primary"
                style="height: 140px; max-width: 350px"
              />
            </div>
            <form class="" @submit.prevent="tryLogin">
              <q-input
                dense
                class="q-my-md"
                outlined
                required
                v-model="username"
                label="Username"
              />
              <q-input
                dense
                class="q-my-md"
                outlined
                required
                type="password"
                v-model="password"
                label="Password"
              />
              <q-btn
                type="submit"
                color="primary"
                class="q-mt-lg full-width"
                label="Login"
                :loading="isLoadButton"
              />
            </form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoadingAnimation from "components/loading/LoadingAnimation.vue";

export default {
  components: {
    LoadingAnimation,
  },
  data() {
    return {
      isLoadPage: false,
      isLoadButton: false,
      logoPath: process.env.WEB_LOGO_PATH,
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions({
      login: "account/login",
    }),
    async tryLogin() {
      this.isLoadButton = true;
      await this.login({ email: this.username, password: this.password })
        .then((response) => {
          this.$q.notify({
            icon: "announcement",
            progress: true,
            color: "primary",
            position: "top",
            message: response.data.message,
            timeout: 1000,
          });
          return setTimeout(() => (window.location.href = "/"), 1000);
        })
        .catch((err) => {
          this.$q.notify({
            icon: "announcement",
            progress: true,
            color: "red",
            position: "top",
            message: err.response.data.message,
          });
        })
        .finally(() => {
          this.isLoadButton = false;
        });
    },
  },
};
</script>

<style>
.my-card {
  height: 100%;
  width: 100%;
  max-width: 350px;
}

.pa-m-lg {
  padding: 60px 20px;
}

.pa-m-md {
  padding: 30px 20px;
}

@media screen and (min-width: 600px) {
  .my-card {
    width: 100%;
    max-width: 600px;
  }
}

@media screen and (min-width: 900px) {
  .my-card {
    width: 100%;
    max-width: 800px;
  }
}
</style>
