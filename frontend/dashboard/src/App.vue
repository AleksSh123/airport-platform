<script setup>
  const HOST = import.meta.env.VITE_TASK_HOST;
  const PORT = Number(import.meta.env.VITE_TASK_PORT);
  const TASK_URL = `http://${HOST}:${PORT}/tasks`;
  const MODE = import.meta.env.MODE;
  function getTasks() {
    fetch(TASK_URL)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

</script>

<template>
  <div>  
    <header>
      Заголовок
    </header>
  </div>

<div class="main_area">
  <div class="button_area">
    <button @click="getTasks"> Отобразить задачи</button>
    <button> Записать задачи </button>
  </div>
  <div class="task_area">
    ffgnngn
    {{ TASK_URL }}
    <div>
      curent mode is:  {{ MODE }}
    </div>
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
