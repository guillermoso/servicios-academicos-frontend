<template>
  <v-autocomplete
    v-model="seleccion"
    :items="institutos"
    label="Instituto"
    :rules="rules"
    :required="required"
    outlined
    :dense="dense"
    return-object
    @change="emitirValor($event)"
  ></v-autocomplete>
</template>

<script>
import { listInstitutes } from "../../api/institutes-requests"

export default {
  props: {
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    seleccion: null,
    institutos: [],
  }),
  created() {
    this.fill_select()
  },
  methods: {
    fill_select() {
      this.institutos = []
      listInstitutes()
        .then(({ institutos }) => {
          institutos.forEach((e) => {
            this.institutos.push({ text: e.instituto, value: e.id })
          })
        })
        .catch((e) => {
          this.$message({
            message: "Ocurrió un error al listar los institutos",
            type: "error",
          })
        })
    },
    emitirValor(val) {
      if (val) {
        this.$emit("nuevo-valor", val)
      } else {
        this.$emit("nuevo-valor", null)
      }
    },
    reset_select() {
      this.seleccion = null
      this.emitirValor(null)
    },
  },
}
</script>

<style scoped></style>
