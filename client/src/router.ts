import { createWebHistory, createRouter } from 'vue-router'

import Chart1 from '@/components/Chart1.vue'
import Chart2 from '@/components/Chart2.vue'
import Home from '@/components/Home.vue'

const routes = [
  { path: '/chart1', component: Chart1 },
  { path: '/chart2', component: Chart2 },
  { path: '/', component: Home }

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
