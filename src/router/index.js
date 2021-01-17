import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      layout: "auth",
    },
  },
  //*                               *//
  // siempre dejar esta ruta hasta abajo
  //*                               *//
  {
    path: "*",
    name: "pagenotfound",
    meta: {
      layout: "page-not-found",
    },
  },
]

const router = new VueRouter({
  routes,
})

export default router
