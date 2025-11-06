import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ui from '@nuxt/ui/vue-plugin'

const app = createApp(App)
const router = createRouter({
  routes: [
    {
      path: '/',
      component: App,
    },
  ],
  history: createWebHistory(),
})
app.use(router)
app.use(ui)

app.mount('#app')
