<script setup>
    const model = defineModel();
</script>
<template>
    <div>
        <div class="row">
            <span>Terminal:</span>
            <UInput color="neutral" v-model="model.terminal" size="3" />
        </div>
        <div class="row">
            <span>Gate:</span>
            <UInput color="neutral" v-model="model.gate" size="3" />
        </div>
    </div>
</template>
<style scoped>
    .row{
        display: flex;
        justify-content: space-between;
    }
</style>