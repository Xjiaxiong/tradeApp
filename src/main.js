import { createApp } from 'vue'
import App from './App.vue'

import 'font-awesome/css/font-awesome.min.css'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import { router } from './router'

//创建
const app = createApp(App)

//挂载
app.use(Element3).use(router).mount('#app')


