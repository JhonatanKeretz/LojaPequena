import Vue from 'vue'
import VueRouter from 'vue-router'
import Lista from '../views/Lista.vue'
import Form from '../views/Formulario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: Lista
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
