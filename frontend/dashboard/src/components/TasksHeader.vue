<script setup>
    import ColumnHeader from './ColumnHeader.vue';
    const props = defineProps(['columns']);
</script>
<template>
    <div class="row">
        <ColumnHeader :caption="'id'" />
        <ColumnHeader :caption="'order_item_id*'" />
        <ColumnHeader :caption="'service_type*'" />
        <ColumnHeader :caption="'provider_id'" />
        <ColumnHeader :caption="'location'" />
        <ColumnHeader :caption="'flight'" />
        <ColumnHeader :caption="'customer_hint'" />
        <ColumnHeader :caption="'status'" />
        <ColumnHeader :caption="'checklist'" />
        <ColumnHeader :caption="'sla_due_at'" />
        <ColumnHeader :caption="'created_at'" />
        <ColumnHeader :caption="'updated_at'" />
    </div>

</template>
<style scoped>
    .row{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }

</style>