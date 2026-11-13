import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Chart, registerables } from 'chart.js'
import App from './App.vue'
import { useInputsStore } from './stores/inputs.js'
import { applyRbaRates } from './services/rbaRates.js'
import './style.css'

Chart.register(...registerables)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

applyRbaRates(useInputsStore(pinia))
