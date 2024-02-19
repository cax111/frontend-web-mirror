<template>
<div>
<q-skeleton type="QAvatar" :size="`${size}`" />
</div>
</template>
<script>
export default {
    props : ['size']
}
</script>