<template>
  <v-card>
    <h2 class="titulo">{{ titulo }}</h2>
    <div class="accion">
      <v-btn
        class="ma-2"
        outlined
        color="primary"
        @click="$emit(evento)"
      >
        <v-icon v-if="icono_boton" left>{{ icono_boton }}</v-icon>
        {{ texto_boton }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    icono_boton: {
      type: String,
      required: false,
    },
    titulo: {
      type: String,
      required: true,
    },
    texto_boton: {
      type: String,
      required: true,
    },
    evento: {
      type: String,
      required: true
    }
  },
};
</script>

<style>
.titulo {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  margin-bottom: 8px;
  word-break: break-all;
  white-space: nowrap;
  align-content: center;
}

.accion {
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.accion .v-btn {
  width: calc(100% - 16px);
}
</style>