import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/Auth.js";

import LoginPage from "../components/LoginPage.vue";
import Homepage from "../components/Homepage.vue";
import Productencatalogus from "../components/Productencatalogus.vue";
import KlantenTest from "../components/KlantenTest.vue"; 
import Bestellingen from '../components/bestellingen/Bestellingen.vue'

const routes = [
  {
    path: "/",            
=======
import Klanten from "../components/Klanten.vue";

const routes = [
  {
    path: "/",           
>>>>>>> origin/klanten
    name: "Login",
    component: LoginPage
  },
  {
    path: "/home",
    name: "Home",
    component: Homepage,
    meta: { requiresAuth: true }
  },
  {
    path: "/productencatalogus",
    name: "Productencatalogus",
    component: Productencatalogus,
    meta: { requiresAuth: true }
  },
  {
    path: "/klanten",
    name: "Klanten",
    component: Klanten,          
>>>>>>> origin/klanten
    meta: { requiresAuth: true }
  },
{
    path: '/bestellingen',
    name: 'Bestellingen',
    component: Bestellingen,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    return { name: "Login" }; // 
  }
});

export default router;