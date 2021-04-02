<template>
  <main class="grid">
    <institutes-table
      :loading="loading"
      :institutes="institutes"
      :pagination="pagination"
      @click:delete="modalBorrar($event)"
      @click:edit="modalEditar($event)"
      @pagination-change="cambiarPagina($event)"
    ></institutes-table>
    <aside class="aside">
      <div class="sticky">
        <card-accion
          class="card-accion"
          titulo="Registro de nuevos institutos"
          texto_boton="Crear instituto"
          icono_boton="add"
          evento="click:crear"
          @click:crear="modalCrear()"
        />
      </div>
    </aside>
    <modal
      :activo.sync="modal"
      :accionBtnTexto="modalBtnAccionTexto"
      :accionBtnColor="modalBtnAccionColor"
      :eventoAccion="modalEventoAccion"
      @click:accion="elegirAccion($event)"
      :texto="modalTexto"
      :tipoAlerta="modalAlerta"
      :titulo="modalTitulo"
      :estado="modalEstado"
    >
      <v-form v-if="!borrarInst" ref="cu-form" v-model="valido" lazy-validation>
        <v-text-field
          v-model="institutoSeleccionado.instituto"
          :rules="reglaValidacion"
          label="Instituto"
          outlined
          required
        ></v-text-field>
      </v-form>
    </modal>
  </main>
</template>

<script>
import{
  listInstitutes,
  deleteInstitute,
  createInstitute,
  updateInstitute
} from "../api/institutes-requests";
import institutesTable from "../components/institutes/institutes-table";
import modal from "../components/global/modal";
import cardAccion from "../components/global/card-accion";

export default {
  components: {
    institutesTable,
    modal,
    cardAccion,
  },
  data: () => ({
    borrarInst: false,
    loading: false,
    modal: false,
    modalTexto: "",
    modalTitulo: "",
    modalAlerta: "",
    modalBtnAccionTexto: "",
    modalBtnAccionColor: "",
    modalEventoAccion: "",
    modalEstado: "default",
    pagination: {
      pagina: 1,
      total_paginas: 1,
      total_resultados: 0
    },
    totalRecords: 0,
    valido: true,
    reglaValidacion: [(v) => !!v || "Este campo es requerido"],
    institutes: [],
    institutoSeleccionado: { id: null, instituto: "" },
  }),
  created() {
    this.getInstitutes();
  },
  watch: {
    modal(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.resetModal();
          if (this.$refs["cu-form"]) this.$refs["cu-form"].resetValidation();
        }, 100);
      } else {
        if (this.$refs["cu-form"]) this.$refs["cu-form"].resetValidation();
      }
    },
  },
  methods: {
    getInstitutes() {
      this.loading = true;
      listInstitutes({ pagina: this.pagination.pagina})
        .then(({ institutos, paginacion }) => {
          this.institutes = institutos;
          this.pagination = paginacion;
        })
        .catch((err) => {
          this.$message({
            message: "Ocurrió un error al consultar el listado de institutos",
            type: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    elegirAccion(accion) {
      switch (accion) {
        case "borrar":
          this.borrarInstituto();
          break;
        case "crear":
          this.crearInstituto();
          break;
        case "actualizar":
          this.actualizarInstituto();
          break;
      }
    },
    modalBorrar(instituto) {
      this.borrarInst = true;
      this.institutoSeleccionado = instituto;
      this.modalTexto = "Estás a punto de borrar un instituto.";
      this.modalBtnAccionTexto = "Borrar";
      this.modalBtnAccionColor = "error";
      this.modalEventoAccion = "borrar";
      this.modalAlerta = "error";
      this.modal = true;
    },
    modalCrear() {
      this.institutoSeleccionado = { id: null, instituto: "" };
      this.modalTitulo = "Crear nuevo instituto";
      this.modalBtnAccionTexto = "Crear";
      this.modalEventoAccion = "crear";
      this.modalBtnAccionColor = "success";
      this.modal = true;
    },
    modalEditar(instituto) {
      const datos = JSON.parse(JSON.stringify(instituto));
      this.institutoSeleccionado = datos;
      this.modalTitulo = "Editar instituto";
      this.modalBtnAccionTexto = "Guardar";
      this.modalEventoAccion = "actualizar";
      this.modalBtnAccionColor = "success";
      this.modal = true;
    },
    resetModal() {
      this.borrarInst = false;
      this.modalTexto = "";
      this.modalTitulo = "";
      this.modalAlerta = "";
      this.eventoAccion = "";
      this.modalBtnAccionTexto = "";
      this.modalBtnAccionColor = "";
      this.modalEstado = "default";
    },
    crearInstituto() {
      createInstitute(this.institutoSeleccionado.instituto)
        .then((res) => {
          let mensaje = "Instituto creado correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getInstitutes();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al crear el instituto";

          if (e.response.data.mensaje) mensaje = e.response.data.mensaje;
          this.$message({
            message: mensaje,
            type: "error",
          });
        })
        .finally(() => {
          this.modalEstado = "default";
        });
    },
    borrarInstituto() {
      this.modalEstado = "cargando";
      deleteInstitute(this.institutoSeleccionado.id)
        .then((res) => {
          let mensaje = "Instituto eliminado correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getInstitutes();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al eliminar el instituto";

          if (e.response.data.mensaje) mensaje = e.response.data.mensaje;
          this.$message({
            message: mensaje,
            type: "error",
          });
        })
        .finally(() => {
          this.modalEstado = "default";
        });
    },
    actualizarInstituto() {
      this.modalEstado = "cargando";
      updateInstitute(this.institutoSeleccionado)
        .then((res) => {
          let mensaje = "Instituto actualizado correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getInstitutes();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al actualizar el instituto";

          if (e.response.data.mensaje) mensaje = e.response.data.mensaje;
          this.$message({
            message: mensaje,
            type: "error",
          });
        })
        .finally(() => {
          this.modalEstado = "default";
        });
    },
    cambiarPagina(nuevaPagina) {
      this.pagination.pagina = nuevaPagina;
      this.getInstitutes();
    },
  },
};
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: 1fr 0.33fr;
  column-gap: 12px;
}

.aside {
  position: relative;
}

.sticky {
  position: sticky;
  top: 12px;
}

.card-accion {
  height: 180px;
  width: 100%;
  margin-bottom: 12px;
  padding: 16px;
}

@media screen and (min-width: 1800px) {
  .grid {
    padding: 20px;
  }

  .card-accion {
    height: auto;
  }
}

@media screen and (max-width: 1600px) {
  .card-accion {
    height: auto;
  }
}
</style>