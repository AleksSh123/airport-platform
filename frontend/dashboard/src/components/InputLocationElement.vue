<script setup>
    const model = defineModel();
</script>
<template>
    <div>
        <div class="row">
            <span>Terminal:</span>
            <input v-model="model.terminal" type="text" size="3">
        </div>
        <div class="row">
            <span>Zone:</span>
            <input v-model="model.zone" type="text" size="3">
        </div>
        <div class="row">
            <span>Gate:</span>
            <input v-model="model.gate" type="text" size="3">
        </div>
    </div>
</template>
<style scoped>
    .row{
        display: flex;
        justify-content: space-between;
    }
</style>