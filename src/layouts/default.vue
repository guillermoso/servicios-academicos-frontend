<template>
  <v-app>
    <nav-drawer :state.sync="drawer" />
    <nav-bar @nav-btn-click="drawer = true" />
    <v-main class="background">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import nav_bar from "@/components/global/nav-bar.vue"
import nav_drawer from "@/components/global/nav-drawer.vue";

export default {
  name: "default",
  components: {
    "nav-drawer": nav_drawer,
    "nav-bar": nav_bar
  },
  data: () => ({
    drawer: false
  })
};
</script>
