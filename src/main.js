import Vue from "vue"
import App from "./App.vue"
import Auth from "./layouts/auth.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "roboto-fontface/css/roboto/roboto-fontface.css"
//https://jossef.github.io/material-design-icons-iconfont/
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => {
    // verificacion de que el token este seteado para continuar al app
    if (store.getters.isTokenSet) {
      // condicion para evitar error de redireccion a la ruta actual
      if (router.currentRoute.fullPath != "/") router.push("") 
      return h(App)
    } 
    // si no se direcciona al login
    else {
      router.push("login")
      return h(Auth)
    }
  },
}).$mount("#app")
