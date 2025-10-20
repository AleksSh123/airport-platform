<script setup>
    import InputElement from './InputElement.vue';
    import InputLocationElement from './InputLocationElement.vue';
    import InputFlightElement from './InputFlightElement.vue';
    import InputCustomerHintElement from './InputCustomerHintElement.vue';
    import DumbElement from './DumbElement.vue';
    import { toRef } from 'vue';
    const model = defineModel();
    const fields = toRef(model.value)
    //console.log(model);
</script>
<template>
    <div class="row">
        <InputElement v-model="fields.id"/>
        <InputElement v-model="fields.order_item_id"/>
        <InputElement v-model="fields.service_type"/>
        <InputElement v-model="fields.provider_id"/>
        <InputLocationElement v-model="fields.location"/>
        <InputFlightElement v-model="fields.flight"/>
        <InputCustomerHintElement v-model="fields.customer_hint"/>
        <InputElement v-model="fields.status"/>
        <InputElement v-model="fields.checklist"/>
        <InputElement v-model="fields.sla_due_at"/>
        <DumbElement />
        <DumbElement />
    </div>
</template>
<style scoped>
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
</style>