<template>
  <div
    class="fullscreen bg-white text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <lottie-animation
        path="img/lottie/maintenance.json"
        :width="500"
        :height="500"
      />
    </div>
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
