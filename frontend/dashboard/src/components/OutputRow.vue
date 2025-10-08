<script setup>
    import OutputElement from './OutputElement.vue';
    const props = defineProps(['task']);
</script>
<template>
    <div class="row">
        <OutputElement :value="props.task.id" />
        <OutputElement :value="props.task.order_item_id" />
        <OutputElement :value="props.task.service_type" />
        <OutputElement :value="props.task.provider_id" />
        <OutputElement :value="props.task.location" />
        <OutputElement :value="props.task.flight" />
        <OutputElement :value="props.task.customer_hint" />
        <OutputElement :value="props.task.status" />
        <OutputElement :value="props.task.checklist" />
        <OutputElement :value="props.task.sla_due_at" />
        <OutputElement :value="props.task.created_at" />
        <OutputElement :value="props.task.updated_at" />
    </div>
</template>
<style scoped>
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
</style>