import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/tramites' },
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
  {
    path: "/tramites",
    name: "Tramites",
    component: () => import("@/views/Tramites.vue")
  },
  {
    path: "/ventanillas",
    name: "Ventanillas",
    component: () => import("@/views/Ventanillas.vue")
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () => import("@/views/Usuarios.vue")
  },
  {
    path: "/escuelas",
    name: "Escuelas",
    component: () => import("@/views/Escuelas.vue")
  },
  {
    path: "/institutos",
    name: "Institutos",
    component: () => import("@/views/Institutos.vue")
  },
  {
    path: "/programas",
    name: "Programas",
    component: () => import("@/views/Programas.vue")
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: () => import("@/views/Configuracion.vue")
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
