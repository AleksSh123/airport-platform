<script setup>
    const props = defineProps(['caption']);
</script>
<template>
    <div> {{ caption }}</div>
</template>
<style scoped>
    div {
        border-right: solid black 1px;
    }
</style>