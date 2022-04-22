import { createRouter, createWebHistory } from 'vue-router'
import TradePage from './pages/TradePage.vue'
import ServiceDataPage from './pages/ServiceDataPage.vue'


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: TradePage, alias: '/index' },
        {
            path: '/servicePage',
            component: ServiceDataPage,
            // children: [
            //     {}
            // ]
        }
    ]
});

 