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
        <UForm class="flex">
            <UFormField label="Order item id*" name="order_item_id">
                <UInput v-model="fields.order_item_id" placeholder="Input order item type" title="Input order item type"/>
            </UFormField>
            <UFormField label="Service type*" name="service_type">
                <UInput v-model="fields.service_type" placeholder="Input service type" title="Input service type"/>
            </UFormField>
            <UFormField label="Provider ID" name="provider_id">
                <UInput v-model="fields.provider_id" placeholder="Input provider id" title="Input provider id"/>
            </UFormField>
            <UFormField label="location">
                <UFormField label="Terminal">
                    <UInput v-model="fields.location.terminal"/>
                </UFormField>
                <UFormField label="Gate">
                    <UInput v-model="fields.location.gate" />
                </UFormField>
                <UFormField label="Zone">
                    <UInput v-model="fields.location.zone" />
                </UFormField>
            </UFormField>
            <UFormField label="Flight">
                <UFormField label="IATA">
                    <UInput v-model="fields.flight.iata"/>
                </UFormField>
                <UFormField label="std">
                    <UInput type="date" v-model="fields.flight.std"/>
                </UFormField>
            </UFormField>
            <UFormField label="Customer hint">
                <UFormField label="Name">
                    <UInput v-model="fields.customer_hint.name"/>
                </UFormField>
                <UFormField label="Second name">
                    <UInput v-model="fields.customer_hint.second"/>
                </UFormField>
            </UFormField>
            <UFormField label="Status">
                <UInput v-model="fields.status"/>
            </UFormField>
            <UFormField label="Checklist">
                <UInput v-model="fields.checklist"/>
            </UFormField>
            <UFormField label="SLA">
                <UInput type="date" v-model="fields.sla_due_at"/>
            </UFormField> 
        </UForm>
    </div>
</template>
<style scoped>
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
</style>