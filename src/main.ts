import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/es/components/message/style/css'
import './assets/css/tailwind.css'
import './assets/css/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
