<template>
  <v-dialog v-model="active" :max-width="width">
    <v-card>
      <v-card-title v-if="titulo" class="headline">{{ titulo }}</v-card-title>
      <v-alert
        v-if="texto"
        class="mb-0 pb-0 pt-6"
        border="top"
        colored-border
        :type="tipoAlerta"
      >
        {{ texto }}
      </v-alert>
      <v-card-text v-else>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="actions">
        <v-btn
          @click="closeModal"
          v-if="cancelBtnTexto"
          text
          :color="cancelBtnColor"
        >
          {{ cancelBtnTexto }}
        </v-btn>
        <v-btn
          @click="$emit('click:accion', eventoAccion)"
          text
          :color="accionBtnColor"
          :loading="cargando"
        >
          {{ accionBtnTexto }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    activo: {
      type: Boolean,
      required: true,
    },
    titulo: {
      type: String,
      default: "",
    },
    texto: {
      type: String,
      required: false,
      default: "",
    },
    tipoAlerta: {
      type: String,
      required: false,
      default: "warning",
    },
    estado: {
      type: String,
      required: false,
      default: "default",
    },
    cancelBtnTexto: {
      type: String,
      default: "cancelar",
    },
    cancelBtnColor: {
      type: String,
      default: "grey darken-3",
    },
    eventoAccion: {
      type: String,
      default: "click:accion",
    },
    accionBtnTexto: {
      type: String,
      default: "aceptar",
    },
    accionBtnColor: {
      type: String,
      default: "primary",
    },
    width: {
      type: Number,
      required: false,
      default: 500,
    },
  },
  data: () => ({
    active: false, // se tiene que tener una variable local para usarla en el v-model del v-dialog
    cargando: false,
  }),
  watch: {
    activo(newVal) {
      this.active = newVal;
    },
    active(newVal) {
      if (!newVal) {
        this.closeModal();
      }
    },
    estado(newVal) {
      if (newVal == "cargando") {
        this.cargando = true;
      } else {
        this.cargando = false;
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:activo", false);
    },
  },
};
</script>

<style>
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>