<script setup>
    const props = defineProps(['columns']);
</script>
<template>
    <div class="row">
        <div v-for="column in columns">
            {{ column }}
        </div>

    </div>

</template>
<style scoped>
    .row{
        display: flex;
        justify-content: space-around;
    }
</style>