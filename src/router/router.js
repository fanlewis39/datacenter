import Vue from 'vue'
import VueRouter from 'vue-router'
import ProgressData from '../views/ProgressData'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '进度数据',
    component: ProgressData
  },
  {
    path: '/quality',
    name: '质量安全数据',
    component: () => import('../views/QualityData.vue')
  },
  {
    path: '/change',
    name: '变更跟踪数据',
    component: () => import('../views/ChangeData.vue')
  },
  {
    path: '/equipment',
    name: '设施数据',
    component: () => import('../views/EquipmentData.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
