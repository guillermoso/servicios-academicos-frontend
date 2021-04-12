<template>
  <v-autocomplete
    v-model="seleccion"
    auto-select-first
    :dense="dense"
    :items="items"
    :label="label"
    :loading="loading"
    :no-data-text="noDataText"
    outlined
    :rules="rules"
    :required="required"
    return-object
    :search-input.sync="searchValue"
    @change="emitirValor($event)"
  ></v-autocomplete>
</template>

<script>
export default {
  props: {
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    request_field_name: {
      type: String,
      required: true,
    },
    request_method: {
      type: Function,
      required: true,
    },
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({
    items: [],
    loading: false,
    noDataText: "No hay coincidencias",
    seleccion: null,
    searchValue: null,
    timeout: null
  }),
  created() {
    this.fill_select();
  },
  watch: {
    searchValue(newVal) {
      this.noDataText = "Cargando...";
      this.loading = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.fill_select(newVal);
      }, 700);
    }
  },

  methods: {
    fill_select(search = null) {
      this.items = [];
      this.request_method({}, search)
        .then((res) => {
          res[`${this.request_field_name}s`].forEach((i) => {
            this.items.push({ text: i[this.request_field_name], value: i.id });
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            message: `Ocurrió un error al consultar los ${this.request_field_name}s`,
            type: "error",
          });
        })
        .finally(() => {
            this.noDataText = "No hay coincidencias.";
            this.loading = false;
        });
    },
    emitirValor(val) {
      if (val) {
        this.$emit("nuevo-valor", val);
      } else {
        this.$emit("nuevo-valor", null);
      }
    },
    reset_select() {
      this.seleccion = null;
      this.emitirValor(null);
    },
  },
};
</script>

<style scoped></style>
