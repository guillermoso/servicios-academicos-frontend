<template>
  <v-autocomplete
    v-model="seleccion"
    :items="programas"
    label="Programa"
    :rules="rules"
    :required="required"
    outlined
    :dense="dense"
    return-object
    @change="emitirValor($event)"
  ></v-autocomplete>
</template>

<script>
// TODO: hacer este componente un autocompletec
import { listPrograms } from "../../api/programs-requests"

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
    programas: [],
  }),
  created() {
    this.fill_select()
  },
  methods: {
    fill_select() {
      this.programas = []
      listPrograms()
        .then(({ programas }) => {
          programas.forEach((e) => {
            this.programas.push({ text: e.programa, value: e.id })
          })
        })
        .catch((e) => {
          this.$message({
            message: "Ocurrió un error al listar los programas",
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
