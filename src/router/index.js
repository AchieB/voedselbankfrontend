import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/Auth.js";

import LoginPage from "../components/LoginPage.vue";
import Homepage from "../components/Homepage.vue";
import Productencatalogus from "../components/Productencatalogus.vue";
import Klanten from "../components/Klanten.vue";

const routes = [
  {
    path: "/",           
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
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  // simpel & betrouwbaar: check localStorage
  const token = localStorage.getItem("token");

  // of via store (kan ook):
  // const auth = useAuthStore();
  // const token = auth.token;

  if (to.meta.requiresAuth && !token) {
    return { name: "Login" }; // <-- terug naar /
  }
});

export default router;