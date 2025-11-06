<script setup>
const props = defineProps(['caption'])
</script>
<template>
  <div>{{ props.caption }}</div>
</template>
<style scoped>
div {
  overflow: hidden;
}
</style>
