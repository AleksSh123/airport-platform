<script setup>
    const model = defineModel();
</script>
<template>
    <div>
        <div class="row">
            <span>Iata:</span>
            <input v-model="model.iata" type="text" size="3">
        </div>
        <div class="row">
            <span>Std:</span>
            <input v-model="model.std" type="date" placeholder="date">
        </div>
    </div>
</template>
<style scoped>
    .row{
        display: flex;
        justify-content: space-between;
    }
</style>