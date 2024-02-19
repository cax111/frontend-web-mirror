<template>
  <q-page>
    <div class="row q-pa-xs">
      <div class="col-9 q-pl-sm q-pr-sm">
        <div v-if="is_active" class="text-center">
          <lottie-animation
            :path="`img/lottie/${logoPath}/book_animation.json`"
            :width="256"
            :height="256"
            :speed="3"
          />
        </div>
        <div v-else>
          <div v-if="list_active.length == null">
            <lottie-animation
              :path="`img/lottie/${logoPath}/empty_state.json`"
              :width="250"
              :height="250"
            />
            <Title
              :text_color="`#${colorPrimary}`"
              :class_add="'text-center'"
              :title="'Anda Belum Mendaftar Paket, lakukan pendaftaran Premium terlebih dahulu !'"
            />
          </div>
          <div v-else v-for="history in list_active" :key="history.id">
            <ListActive
              :image="history.image"
              :name="history.name"
              :end_date="history.end_date"
              :remaining_days="history.remaining_days"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import ListActive from "../list/payment/ListActive.vue";
import Title from "../typography/Title.vue";

export default {
  components: {
    ListActive,
    LottieAnimation,
    Title,
  },
  data() {
    return {
      list_active: [],
      is_active: false,
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
      logoPath: process.env.WEB_LOGO_PATH,
    };
  },

  created() {
    this.fetchPackageActives();
  },

  methods: {
    fetchPackageActives() {
      this.is_active = true;
      axios
        .get(this.$store.state.example.base_url + `/membership/user?feature=1`)
        .then((response) => {
          this.list_active = response.data.data;
          this.is_active = false;
        })
        .catch((error) => {
          this.is_active = false;
        });
    },
  },
};
</script>

<style></style>
