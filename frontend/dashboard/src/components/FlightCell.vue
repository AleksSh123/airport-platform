<script setup>
const props = defineProps(['flight'])
//console.log(props.flight);
</script>
<template>
  <div>
    <div>
      <span>Iata:</span>
      <span> {{ props.flight?.iata }} </span>
    </div>
    <div>
      <span>Std:</span>
      <span> {{ props.flight?.std }} </span>
    </div>
  </div>
</template>
<style scoped></style>
