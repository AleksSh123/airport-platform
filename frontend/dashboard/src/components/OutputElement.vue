<script setup>
    const props = defineProps(['value']);
</script>
<template>
    <div>
        {{ props.value }}
    </div>
</template>
<style scoped>
    div {
        overflow: hidden;
    }
</style>