<script setup>
  const HOST = import.meta.env.VITE_TASK_HOST;
  const PORT = Number(import.meta.env.VITE_TASK_PORT);
  const TASK_URL = `http://${HOST}:${PORT}/tasks`;
  const MODE = import.meta.env.MODE;
  import { reactive, ref } from 'vue';
  import TasksHeader from './components/TasksHeader.vue'
  import InputRow from './components/InputRow.vue';
  import OutputRow from './components/OutputRow.vue';
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
  console.log(Object.keys(newTask));
  const columns = [
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
  <Uapp>
    <div class="max-w-8xl">  
      <header>
        Airservices dashboard
      </header>
      <div class="main_area">
        <div class="w-fit p-1">
          <button @click="updateView"> Отобразить задачи</button>
          <button @click="sendTask(newTask)"> Записать задачи </button>
        </div>
        <div class="task_area">
          <div>
            current backed url - {{ TASK_URL }}
          </div>

          <TasksHeader :columns="columns" />
          <InputRow v-model="newTask" />
          <OutputRow v-for="(task, index) in tasks" :task="tasks[index]" class="output-row"/>

        </div>
      </div>
    </div>
  </Uapp>
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
  border: 1px solid black;
  width: 100%;
}
.output-row {
  border-bottom: 1px solid black;
}
.output-row:last-of-type {
  border-bottom: none;
}
</style>
