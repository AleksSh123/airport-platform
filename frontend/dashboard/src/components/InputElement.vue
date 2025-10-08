<script setup>
    const model = defineModel();
</script>
<template>
    <div>
        <input v-model="model" type="text">
    </div>
</template>
<style scoped>
    input {
        width: 100%;
        height: 100%;

    }
</style>