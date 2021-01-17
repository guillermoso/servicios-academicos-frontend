import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

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
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Signup.vue"),
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
];

const router = new VueRouter({
  routes,
});

// verificacion de que el token este seteado para continuar al app
router.beforeEach((to, from, next) => {
  // rutas a las que se puede acceder sin estar autenticado
  const allowedRoutes = ["Login", "Signup", "ReestablecerContrasena"];

  const navigatingToUnprotectedRoute = allowedRoutes.indexOf(to.name) > -1;

  if (!navigatingToUnprotectedRoute && !store.getters.isTokenSet) next({ name: "Login" });
  else next();
});

export default router;
