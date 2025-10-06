<script setup>
  const HOST = import.meta.env.VITE_TASK_HOST;
  const PORT = Number(import.meta.env.VITE_TASK_PORT);
  const TASK_URL = `http://${HOST}:${PORT}/tasks`;
  const MODE = import.meta.env.MODE;
  import TasksHeader from './components/TasksHeader.vue'
  const task1 = {
    order_item_id: "222",
    service_type: "service1",
    status: "new",
  }
  const columns = [
        "id", "order_item_id", "service_type" ,"provider_id", "location", "flight",
        "customer_hint", "status", "checklist", "sla_due_at", "created_at", "updated_at"
            ]

  async function getTasks() {
    fetch(TASK_URL)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  async function sendTask(task){
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task1)
    }
     let response = await fetch(TASK_URL, options);
     console.log(JSON.stringify(response));
  }

</script>

<template>
  <div>  
    <header>
      Заголовок2
    </header>
  </div>

<div class="main_area">
  <div class="button_area">
    <button @click="getTasks"> Отобразить задачи</button>
    <button @click="sendTask(task1)"> Записать задачи </button>
  </div>
  <div class="task_area">
    <div>
      current backed url - {{ TASK_URL }}
    </div>

    <TasksHeader :columns="columns"/>
  </div>

</div>
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
</style>
