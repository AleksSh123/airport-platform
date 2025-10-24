<script setup>
  const HOST = import.meta.env.VITE_TASK_HOST;
  const PORT = Number(import.meta.env.VITE_TASK_PORT);
  const TASK_URL = `http://${HOST}:${PORT}/tasks`;
  const MODE = import.meta.env.MODE;
  import { reactive, ref } from 'vue';
  import TasksHeader from './components/TasksHeader.vue'
  import InputRow from './components/InputRow.vue';
  import OutputRow from './components/OutputRow.vue';
  import FlightCell from './components/FlightCell.vue';
  import CustomerHintCell from './components/CustomerHintCell.vue';

  const task1 = {
    order_item_id: "222",
    service_type: "service1",
    status: "new",
  }
  let tasks = ref([]);
  const newTask = reactive({
    id: "",
    order_item_id: "",
    service_type: "",
    provider_id: "",
    location: {
      terminal: "",
      zone: "",
      gate: "",
    },
    flight: {
      iata: "",
      std: ""
    },
    customer_hint: {
      name: "",
      second: ""
    },
    status: "",
    checklist: "",
    sla_due_at: "",
    created_at: "",
    updated_at: "",

    isValid: function(){
      return ((this.order_item_id.length) > 0 &&
       (this.service_type.length > 0))
    },
    clear: function(){
      function clearProperty(obj){
        Object.keys(obj).forEach(k => {
          if (typeof obj[k] === "string") {
            obj[k] = "";
          } else if (typeof obj[k] === "object"){
            clearProperty(obj[k]);
          }
        })
      }
      clearProperty(this);

    }
  });

  const columns = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'order_item_id',
      header: 'order_item_id',
    },
    {
      accessorKey: 'service_type',
      header: 'service_type',
      meta: { class: { td: 'max-w-3xs overflow-hidden text-ellipsis whitespace-normal'} },
      attrs: (row) => ({
        title: row.getValue?.() ?? '' // <-- покажет полный текст
      })
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
      header: 'created_at',
    },
    {
      accessorKey: 'updated_at',
      header: 'updated_at',
    }
  ]
  const column_names = [
        "id", "order_item_id", "service_type" ,"provider_id", "location", "flight",
        "customer_hint", "status", "checklist", "sla_due_at", "created_at", "updated_at"
            ]
  function refineObj(obj){
    const result = {};
    Object.keys(obj).forEach(k => {
      console.debug(`key: ${k}, typeof key: ${typeof obj[k]}, value: ${obj[k]}`)
      if ((typeof obj[k] === "string") && (obj[k].length > 0)){        
        result[k] = obj[k]
      } else if (typeof obj[k] === "object"){
        result[k] = refineObj(obj[k])
      }
    })
    return result;
  }
  async function getTasks() {
    const response = await fetch(TASK_URL);
      const responseJson = await response.json();
      return responseJson;
  }
  async function sendTask(){
    console.debug("start sendTask!");
    console.debug(`newTask.isValid: ${newTask.isValid()}`)
    const objectToSend = refineObj(newTask);
    //debugger;
    if (!newTask.isValid()) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(refineObj(newTask))
    }
     let response = await fetch(TASK_URL, options);
     console.log(JSON.stringify(objectToSend));
     if (response.ok){
      newTask.clear();
     }
     await updateView();
  }
  async function updateView(){
    tasks.value = await getTasks();
    console.debug(`tasks is: ${JSON.stringify(tasks.value, null, 2)}`);

  }

</script>

<template>
  <UApp>
    <UHeader title="Airservices dashboard">
      <template #right>
        current backed url - {{ TASK_URL }}
      </template>
    </UHeader>
    <UMain>
      <div class="max-w-8xl">  
        <div class="main_area">
          <div class="w-fit p-1">
            <UButton @click="updateView" class="m-1"
            color="neutral" variant="outline">
              Отобразить задачи
            </UButton>
            <UButton @click="sendTask(newTask)" class="m-1"
            color="neutral" variant="outline">
              Записать задачи
            </UButton>
          </div>
          <div class="task_area">
            <TasksHeader :columns="columns" />
            <InputRow v-model="newTask" />
<!--             <OutputRow v-for="(task, index) in tasks" :task="tasks[index]" class="output-row"/> -->
            <UTable :data="tasks" :columns="columns" class="max-w-7xl">
              <template #location-cell="{ row }">
                    <div>
                      <div>
                          <span>Terminal:</span>
                          <span> {{ row.original.location?.terminal }} </span>
                      </div>
                      <div>
                          <span>Zone:</span>
                          <span> {{ row.original.location?.zone }}</span>
                      </div>
                      <div>
                          <span>Gate:</span>
                          <span> {{ row.original.location?.gate }}</span>
                      </div>
                  </div>
              </template>
              <template #flight-cell=" { row } ">
                <FlightCell :flight="row.original.flight" />
              </template>
              <template #customer_hint-cell=" { row } ">
                <CustomerHintCell :customer_hint="row.original.customer_hint" />
              </template>
            </UTable>

          </div>
        </div>
      </div>
    </UMain>

    <UFooter>

    </UFooter>
  </UApp>
</template>

<style scoped>
header {
  height: 3rem;
  font-size: 2rem;
}
@media (min-width: 1024px) {
}
.main_area {
  display: flex;

}
.button_area {
  width: 10rem

}
.task_area {

  width: 100%;
}
.output-row {
  border-bottom: 1px solid black;
}
.output-row:last-of-type {
  border-bottom: none;
}
</style>
