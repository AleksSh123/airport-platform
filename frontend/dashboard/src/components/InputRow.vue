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
        <UInput placeholder="Input order item type" color="neutralsssss" v-model="fields.order_item_id"/>
        <UInput placeholder="Input service type"  color="neutral" v-model="fields.service_type"/>
        <UInput placeholder="Provider ID"  color="neutral"  v-model="fields.provider_id"/>
        <InputLocationElement v-model="fields.location"/>
        <InputFlightElement v-model="fields.flight"/>
        <InputCustomerHintElement v-model="fields.customer_hint"/>
        <UInput placeholder="Input status"  color="neutral"  v-model="fields.status"/>
        <UInput placeholder="Input checklist"  color="neutral" t v-model="fields.checklist"/>
        <UInput placeholder="Input SLA"  color="neutral"  v-model="fields.sla_due_at"/>
    </div>
</template>
<style scoped>
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
</style>