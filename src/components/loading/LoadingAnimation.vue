<template>
  <div class="text-center">
    <lottie-animation
      :path="`img/lottie/${logoPath}/book_animation.json`"
      :width="250"
      :height="250"
      :speed="1"
    />
    <div :class="`text-caption q-mt-none ${textColor}`">
      Mohon tunggu sebentar
    </div>
  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  props: ["textColor"],
  components: {
    LottieAnimation,
  },
  data() {
    return {
      logoPath: process.env.WEB_LOGO_PATH,
    };
  },
};
</script>
