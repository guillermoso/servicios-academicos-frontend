<template>
  <v-snackbar v-model="active" :color="properties.color" top :timeout="properties.timeout">
    <div class="snackbar-content">
      <v-icon class="icon type-icon" v-text="properties.icon"></v-icon>
      <span class="alert-text">{{ properties.message }}</span>
      <v-icon class="icon close-btn" @click="active = false">close</v-icon>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      properties: {
        timeout: 4000,
        message: "",
        color: "info",
        icon: "mdi-information"
      }
    };
  },
  methods: {
    /**
     * Este componente se utiliza programaticamente de la siguiente manera:
     *      this.$message({
     *        timeout: 1000 --- opcional. ms que durará el mensaje abierto
     *        message: "mensaje a mostrar" --- requerido. Si no se envia esta propiedad el componente no se mostrará
     *        type: string --- requerido. "success", "error", "warning", "info" son los tipos permitidos
     *      });
     * El componente puede ser declarado de cualquier lugar ya que está
     * montado en la aplicación de manera global
     */
    show(customProps) {
      Object.assign(this.properties, customProps);

      switch (this.properties.type) {
        case "success":
          this.properties.color = "#4caf50";
          this.properties.icon = "mdi-check-circle";
          break;
        case "error":
          this.properties.color = "#ff5252";
          this.properties.icon = "mdi-alert";
          break;
        case "warning":
          this.properties.color = "#fb8c00";
          this.properties.icon = "mdi-exclamation";
          break;
        case "info":
        default:
          this.properties.color = "#2196f3";
          this.properties.icon = "mdi-information";
          break;
      }

      // solo se mostrará el mensaje si se define la propiedad 'message'
      if (this.properties.message) {
        this.active = true;
      }
    }
  }
};
</script>

<style scoped>
.alert-text {
  font-size: 16px;
  font-family: Inter var, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  color: white;
  padding-bottom: 2px;
}
.close-btn {
  margin-left: 16px;
}

.icon {
  color: white;
  font-size: 1.5em;
}

.snackbar-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-icon {
  margin-right: 16px;
}
</style>
