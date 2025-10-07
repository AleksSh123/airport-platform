<script setup>
    import InputElement from './InputElement.vue';
</script>
<template>
    <div class="row">
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
        <InputElement />
    </div>
</template>
<style scoped>
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
</style>