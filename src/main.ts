import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

console.log('im here')
const pina = createPinia()
pina.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router)
app.use(pina)
app.use(Antd)

app.mount('#app')
