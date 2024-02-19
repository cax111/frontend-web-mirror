<template lang="pug">
    <div class="row q-pa-sm q-gutter-sm">
      <div v-for="c in category" :key="c" class="q-pl-sm">
        <q-skeleton type="QToggle" size="70px" />
      </div>
    </div>
</template>
<script>
export default ({
    props: ['category']
})
</script>