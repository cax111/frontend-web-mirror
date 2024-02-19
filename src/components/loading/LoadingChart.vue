<template>
  <div class="text-center">
    <lottie-animation
      path="img/lottie/graph_anim.json"
      :width="250"
      :height="250"
      :speed="1"
    />
    <div class="text-caption q-mt-none">Mempersiapkan grafik</div>
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