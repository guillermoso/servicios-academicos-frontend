<template>
  <v-navigation-drawer
    :width="drawerWidth"
    v-model="drawerState"
    color="#224c91"
    class="nav-drawer-container"
    :permanent="$vuetify.breakpoint.lgAndUp"
    :bottom="$vuetify.breakpoint.mdAndDown"
    dark
    app
  >
    <div class="app-title app-title-padding" v-if="$vuetify.breakpoint.lgAndUp">
      <div>UACJ</div>
      <div>Servicios académicos</div>
      <v-divider></v-divider>
    </div>
    <div v-else class="close-btn-cont">
      <v-icon color="#d3d08d" class="close-btn" @click="drawerState = !drawerState"
        >close</v-icon
      >
    </div>
    <div class="content-nav-drawer">
      <v-list class="custom-active-color" nav expand dense>
        <v-list-group
          v-for="item in getRoles"
          :key="item.nombre"
          value="true"
          active-class="none"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <!-- <v-icon v-text="item.icono"></v-icon> -->
              <v-icon color="#d3d08d">{{item.icono}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="menu-item">{{
              item.nombre
            }}</v-list-item-content>
          </template>

          <template v-for="subItem in item.submodulos">
            <v-list-item
              v-if="subItem.ruta != ''"
              :key="subItem.nombre"
              :to="`/${subItem.ruta}`"
            >
              <v-list-item-content class="menu-item">{{
                subItem.nombre
              }}</v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item style="margin-top: 8px" @click="logout">
          <v-list-item-icon></v-list-item-icon>
          <v-list-item-content class="menu-item">
            Cerrar sesión
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-if="$vuetify.breakpoint.lgAndUp">
      <v-divider></v-divider>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    state: {
      type: Boolean,
      // requerido para que funcione de manera responsiva
      required: true,
    },
  },
  data() {
    return {
      drawerState: false,
      drawerWidth: 300,
      item: 0,
      items: null,
    };
  },
  created() {
    if (this.$width < 1700) {
      this.drawerWidth = 280;
    }
  },
  computed: {
    ...mapGetters(["getRoles"]),
  },
  watch: {
    state(newVal) {
      this.drawerState = this.state;
    },
    drawerState(newVal) {
      if (!newVal) {
        this.close();
      }
    },
  },
  methods: {
    close() {
      this.$emit("update:state", false);
    },
    logout() {
      this.$router.push("login")
      this.$store.commit("logout")
    }
  },
};
</script>

<style scoped>
.app-title {
  color: #d3d08d;
  font-size: 1.5em;
  text-align: center;
}

.menu-item {
  color: #d3d08d;
}

.app-title-padding {
  padding: 8px 8px 0 8px;
}

.close-btn {
  height: 24px;
}

.close-btn-cont {
  height: 40px;
  padding: 8px 16px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.extra-item-cont {
  align-items: center;
  display: flex;
  height: 40px;
  justify-content: flex-end;
  padding: 0 16px;
}

.right {
  flex: 1;
  overflow-y: scroll; /* it works! */
}

/* color del texto activo dentro del navbar */
.v-application .custom-active-color .primary--text {
  color:#d3d08d !important;
}

.v-list .v-list-item--active .v-icon { 
  color:#d3d08d !important;
}
</style>
