<script setup>
const HOST = import.meta.env.VITE_TASK_HOST
const PORT = Number(import.meta.env.VITE_TASK_PORT)
const TASK_URL = `http://${HOST}:${PORT}/tasks`
//const MODE = import.meta.env.MODE

import { reactive, ref, h, useTemplateRef, computed } from 'vue'
import UCheckbox from '@nuxt/ui/runtime/components/Checkbox.vue'
import InputRow from './components/InputRow.vue'
import FlightCell from './components/FlightCell.vue'
import CustomerHintCell from './components/CustomerHintCell.vue'
import LocationCell from './components/LocationCell.vue'
const table = useTemplateRef('table')
const hoverRow = ref({})
const selectedSingleRow = ref({})
let tasks = ref([])
const selectedIds = ref([])
const selectedRowIsSingle = computed(() => {
  return selectedIds.value.length == 1
})
const newTask = reactive({
  id: '',
  order_item_id: '',
  service_type: '',
  provider_id: '',
  location: {
    terminal: '',
    zone: '',
    gate: '',
  },
  flight: {
    iata: '',
    std: '',
  },
  customer_hint: {
    name: '',
    second: '',
  },
  status: '',
  checklist: '',
  sla_due_at: '',
  created_at: '',
  updated_at: '',

  isValid: function () {
    return this.order_item_id.length > 0 && this.service_type.length > 0
  },
  clear: function () {
    function clearProperty(obj) {
      Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === 'string') {
          obj[k] = ''
        } else if (typeof obj[k] === 'object') {
          clearProperty(obj[k])
        }
      })
    }
    clearProperty(this)
  },
})

const columns = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        color: 'neutral',
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        color: 'neutral',
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
        'aria-label': 'Select row',
      }),
  },
  {
    accessorKey: 'id',
    header: 'Id',
    meta: {
      class: {
        td: 'max-w-32 truncate',
      },
    },
  },
  {
    accessorKey: 'order_item_id',
    header: 'order_item_id',
    meta: {
      class: {
        td: 'border-l border-neutral-300',
      },
    },
  },
  {
    accessorKey: 'service_type',
    header: 'service_type',
    meta: {
      class: {
        //          td: 'max-w-3xs overflow-hidden text-ellipsis whitespace-normal'
        td: 'max-w-3xs text-ellipsis overflow-hidden whitespace-normal',
      },
    },
  },
  {
    accessorKey: 'provider_id',
    header: 'provider_id',
  },
  {
    accessorKey: 'location',
    header: 'location',
  },
  {
    accessorKey: 'flight',
    header: 'flight',
    size: 30,
  },
  {
    accessorKey: 'customer_hint',
    header: 'customer_hint',
  },
  {
    accessorKey: 'status',
    header: 'status',
  },
  {
    accessorKey: 'checklist',
    header: 'checklist',
  },
  {
    accessorKey: 'sla_due_at',
    header: 'sla_due_at',
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      return new Date(row.getValue('created_at')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        timeZoneName: 'short',
        hour12: false,
      })
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      return new Date(row.getValue('created_at')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        timeZoneName: 'short',
        hour12: false,
      })
    },
  },
]
function refineObj(obj) {
  const result = {}
  Object.keys(obj).forEach((k) => {
    //console.debug(`key: ${k}, typeof key: ${typeof obj[k]}, value: ${obj[k]}`)
    if (typeof obj[k] === 'string' && obj[k].length > 0) {
      result[k] = obj[k]
    } else if (typeof obj[k] === 'object') {
      result[k] = refineObj(obj[k])
    }
  })
  return result
}
async function getTasks() {
  const response = await fetch(TASK_URL)
  const responseJson = await response.json()
  return responseJson
}
async function sendTask() {
  console.debug('start sendTask!')
  console.debug(`newTask.isValid: ${newTask.isValid()}`)
  const objectToSend = refineObj(newTask)
  //debugger;
  if (!newTask.isValid()) return
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(refineObj(newTask)),
  }
  let response = await fetch(TASK_URL, options)
  console.log(JSON.stringify(objectToSend))
  if (response.ok) {
    newTask.clear()
  }
  await updateView()
}
async function updateView() {
  tasks.value = await getTasks()
  //console.debug(`tasks is: ${JSON.stringify(tasks.value, null, 2)}`);
}
function onHover(e, row) {
  //console.debug(`e is: ${JSON.stringify(e, null, 2)}`);
  //console.debug(`row is: ${JSON.stringify(row, null, 2)}`);
  hoverRow.value = row
}
function onClick() {
  selectedIds.value.length = 0
  hoverRow.value.toggleSelected(!hoverRow.value.getIsSelected())
  const tableState = table.value.tableApi.getState()
  console.debug(JSON.stringify(tableState.rowSelection, null, 2))
  console.debug(Object.keys(tableState.rowSelection))
  const selectedRows = Object.keys(tableState.rowSelection)
  //debugger;
  selectedRows.forEach((item) => {
    selectedIds.value.push(table.value.tableApi.getRow(Number(item)).original.id)
  })
  console.debug(`selected ids:${selectedIds.value}`)
  console.debug(selectedRowIsSingle.value)
  if (selectedRowIsSingle.value) {
    selectedSingleRow.value = table.value.tableApi.getRow(
      Object.keys(tableState.rowSelection),
    ).original
    copyObjKeys(selectedSingleRow.value, newTask)
  } else {
    selectedSingleRow.value = {}
    newTask.clear()
  }
  console.debug(`selected row: ${JSON.stringify(selectedSingleRow.value, null, 2)}`)
}
function copyObjKeys(objSrc, objDest){
  objDest.id = objSrc.id;
  objDest.order_item_id = objSrc.order_item_id;
  objDest.service_type = objSrc.service_type;
  objDest.provider_id = objSrc.provider_id;
  objDest.location.terminal = objSrc.location.terminal;
  objDest.location.zone = objSrc.location.zone;
  objDest.location.gate = objSrc.location.gate;
  objDest.flight.iata = objSrc.flight.iata
  objDest.flight.std = objSrc.flight.std
  objDest.customer_hint.name = objSrc.customer_hint.name;
  objDest.customer_hint.second = objSrc.customer_hint.second;
  objDest.status = objSrc.status;
  objDest.checklist = objSrc.checklist;
  objDest.sla_due_at = objSrc.sla_due_at;
}
</script>

<template>
  <UApp>
    <UHeader title="Airservices dashboard">
      <template #right> current backed url - {{ TASK_URL }} </template>
    </UHeader>
    <UMain>
      <div class="flex">
        <div class="flex flex-col p-1">
          <UButton
            @click="updateView"
            class="m-1 transition-all duration-150 transform active:scale-95 disabled:bg-gray-100"
            color="neutral"
            variant="outline"
          >
            Отобразить задачи
          </UButton>
          <UButton
            @click="sendTask(newTask)"
            class="m-1 transition-all duration-150 transform active:scale-95 disabled:bg-gray-100"
            color="neutral"
            variant="outline"
          >
            Записать задачу
          </UButton>
          <UButton
            @click="updateTask(newTask)"
            class="m-1 transition-all duration-150 transform active:scale-95 disabled:bg-gray-100"
            color="neutral"
            variant="outline"
            disabled
          >
            Обновить задачу
          </UButton>
        </div>
        <UContainer class="max-w-8xl">
          <InputRow v-model="newTask" :selectedRowIsSingle="selectedRowIsSingle" />
          <UTable
            sticky
            ref="table"
            :data="tasks"
            :columns="columns"
            @hover="onHover"
            @click="onClick"
          >
            <template #location-cell="{ row }">
              <LocationCell :location="row.original.location" />
            </template>
            <template #flight-cell="{ row }">
              <FlightCell :flight="row.original.flight" />
            </template>
            <template #customer_hint-cell="{ row }">
              <CustomerHintCell :customer_hint="row.original.customer_hint" />
            </template>
          </UTable>
        </UContainer>
      </div>
    </UMain>
  </UApp>
</template>
<style scoped></style>
