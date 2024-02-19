<template>
  <div>
    <lottie-animation
      :path="`img/lottie/${logoPath}/empty_state.json`"
      :width="200"
      :height="200"
    />

    <p
      class="text-subtitle1 text-primary text-weight-bold text-center"
      style="margin-bottom: -5px"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  props: ["message"],
  components: {
    LottieAnimation,
  },
  data() {
    return {
      logoPath: process.env.WEB_LOGO_PATH,
    }
  }
};
</script>
