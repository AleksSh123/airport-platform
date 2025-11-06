<script setup>
const props = defineProps(['customer_hint'])
</script>
<template>
  <div>
    <div class="row">
      <span>Name:</span>
      <span> {{ props.customer_hint?.name }} </span>
    </div>
    <div class="row">
      <span>Second:</span>
      <span> {{ props.customer_hint?.second }} </span>
    </div>
  </div>
</template>
<style scoped></style>
