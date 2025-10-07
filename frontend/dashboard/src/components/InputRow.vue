<script setup>
    import InputElement from './InputElement.vue';
    const model = defineModel();
</script>
<template>
    <div class="row">
        <InputElement v-model="model.id"/>
        <InputElement v-model="model.order_item_id"/>
        <InputElement v-model="model.service_type"/>
        <InputElement v-model="model.provider_id"/>
        <InputElement v-model="model.location"/>
        <InputElement v-model="model.flight"/>
        <InputElement v-model="model.customer_hint"/>
        <InputElement v-model="model.status"/>
        <InputElement v-model="model.checklist"/>
        <InputElement v-model="model.sla_due_at"/>
        <InputElement v-model="model.created_at"/>
        <InputElement v-model="model.updated_at"/>
    </div>
</template>
<style scoped>
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
</style>