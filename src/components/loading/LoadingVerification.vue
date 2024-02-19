<template>
  <div class="text-center">
    <lottie-animation
      path="img/lottie/checklist.json"
      :width="250"
      :height="250"
      :speed="1"
    />
    <div class="text-caption q-mt-none">Data sedang diverifikasi mohon tunggu sebentar</div>
  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  components: {
    LottieAnimation,
  },
};
</script>