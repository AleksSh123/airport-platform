<script setup>
import { ref, toRef, defineProps, defineModel } from 'vue'
import * as z from 'zod'
const model = defineModel()
const props = defineProps(['selectedRowIsSingle'])
const fields = toRef(model.value)
//console.log(model);
const schema = z.object({
  order_item_id: z.string('Order item id must be a string'),
  service_type: z.string('Service type must be a string'),
  provider_id: z.string().min(5, 'Must be 5 letters min'),
  location: z.object({
    terminal: z.string().optional(),
    gate: z.number('gate must be a number').optional(),
    zone: z.string().optional(),
  }),
})
const statusItems = ref(['new', 'assigned', 'in_progress', 'done', 'failed', 'cancelled'])
</script>
<template>
  <div>
    <UForm class="flex row gap-1" :schema="schema" :state="fields">
      <UFormField label="Order item id*" name="order_item_id">
        <UInput
          v-model="fields.order_item_id"
          placeholder="Input order item type"
          title="Input order item type"
          :disabled="!props.selectedRowIsSingle"
          :ui="{ base: 'disabled:bg-gray-200' }"
        />
      </UFormField>
      <UFormField label="Service type*" name="service_type">
        <UInput
          v-model="fields.service_type"
          placeholder="Input service type"
          title="Input service type"
          :disabled="!props.selectedRowIsSingle"
          :ui="{ base: 'disabled:bg-gray-200' }"
        />
      </UFormField>
      <UFormField label="Provider ID" name="provider_id">
        <UInput
          v-model="fields.provider_id"
          placeholder="Input provider id"
          title="Input provider id"
          :disabled="!props.selectedRowIsSingle"
          :ui="{ base: 'disabled:bg-gray-200' }"
        />
      </UFormField>
      <UFormField label="location">
        <UFormField label="Terminal" name="location.terminal">
          <UInput
            v-model="fields.location.terminal"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
        <UFormField label="Gate" name="location.gate">
          <UInput
            v-model.number="fields.location.gate"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
        <UFormField label="Zone" name="location.zone">
          <UInput
            v-model="fields.location.zone"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
      </UFormField>
      <UFormField label="Flight">
        <UFormField label="IATA">
          <UInput
            v-model="fields.flight.iata"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
        <UFormField label="std">
          <UInput
            type="date"
            v-model="fields.flight.std"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
      </UFormField>
      <UFormField label="Customer hint">
        <UFormField label="Name">
          <UInput
            v-model="fields.customer_hint.name"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
        <UFormField label="Second name">
          <UInput
            v-model="fields.customer_hint.second"
            :disabled="!props.selectedRowIsSingle"
            :ui="{ base: 'disabled:bg-gray-200' }"
          />
        </UFormField>
      </UFormField>
      <UFormField label="Status">
        <USelect v-model="fields.status" :items="statusItems" class="w-full" />
      </UFormField>
      <UFormField label="Checklist">
        <UInput
          v-model="fields.checklist"
          :disabled="!props.selectedRowIsSingle"
          :ui="{ base: 'disabled:bg-gray-200' }"
        />
      </UFormField>
      <UFormField label="SLA">
        <UInput
          type="date"
          v-model="fields.sla_due_at"
          :disabled="!props.selectedRowIsSingle"
          :ui="{ base: 'disabled:bg-gray-200' }"
        />
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
