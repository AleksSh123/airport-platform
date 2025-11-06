<script setup>
const props = defineProps(['location'])
</script>
<template>
  <div>
    <div>
      <span>Terminal:</span>
      <span> {{ props.location?.terminal }} </span>
    </div>
    <div>
      <span>Zone:</span>
      <span> {{ props.location?.zone }}</span>
    </div>
    <div>
      <span>Gate:</span>
      <span> {{ props.location?.gate }}</span>
    </div>
  </div>
</template>
<style scoped></style>
