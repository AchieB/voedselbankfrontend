import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import Homepage from '../components/Homepage.vue'   
import Productencatalogus from '../components/Productencatalogus.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/productencatalogus',
    name: 'Productencatalogus',
    component: Productencatalogus
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router