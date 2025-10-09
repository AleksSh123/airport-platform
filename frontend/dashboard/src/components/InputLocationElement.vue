<script setup>
    const model = defineModel();
</script>
<template>
    <div>
        <div>
            <span>Terminal:</span>
            <input v-model="model.terminal" type="text">
        </div>
        <div>
            <span>Zone:</span>
            <input v-model="model.zone" type="text">
        </div>
        <div>
            <span>Gate:</span>
            <input v-model="model.gate" type="text">
        </div>
    </div>
</template>
<style scoped>
</style>