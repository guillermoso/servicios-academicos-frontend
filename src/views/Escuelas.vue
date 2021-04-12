<template>
  <main class="grid">
    <schools-table
      :loading="loading"
      :schools="schools"
      :pagination="pagination"
      @click:delete="modalBorrar($event)"
      @click:edit="modalEditar($event)"
      @pagination-change="cambiarPagina($event)"
    ></schools-table>
    <aside class="aside">
      <div class="sticky">
        <card-accion
          class="card-accion"
          titulo="Registro de nuevas escuelas"
          texto_boton="Crear escuela"
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
      <v-form v-if="!borrarEsc" ref="cu-form" v-model="valido" lazy-validation>
        <v-text-field
          v-model="escuelaSeleccionado.escuela"
          :rules="reglaValidacion"
          label="Escuela"
          outlined
          required
        ></v-text-field>
      </v-form>
    </modal>
  </main>
</template>

<script>
import {
  listSchools,
  deleteSchool,
  createSchool,
  updateSchool,
} from "../api/schools-requests";
import schoolsTable from "../components/schools/schools-table";
import modal from "../components/global/modal";
import cardAccion from "../components/global/card-accion";

export default {
  components: {
    schoolsTable,
    modal,
    cardAccion,
  },
  data: () => ({
    borrarEsc: false,
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
    schools: [],
    escuelaSeleccionado: { id: null, escuela: "" },
  }),
  created() {
    this.getSchools();
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
    getSchools() {
      this.loading = true;
      listSchools({ pagina: this.pagination.pagina})
        .then(({ escuelas, paginacion }) => {
          this.schools = escuelas;
          this.pagination = paginacion;
        })
        .catch((err) => {
          this.$message({
            message: "Ocurrió un error al consultar el listado de escuelas",
            type: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    elegirAccion(accion) {
      switch (accion) {
        case "borrar":
          this.borrarEscuela();
          break;
        case "crear":
          this.crearEscuela();
          break;
        case "actualizar":
          this.actualizarEscuela();
          break;
      }
    },
    modalBorrar(escuela) {
      this.borrarEsc = true;
      this.escuelaSeleccionado = escuela;
      this.modalTexto = "Estas a punto de borrar un escuela";
      this.modalBtnAccionTexto = "Borrar";
      this.modalBtnAccionColor = "error";
      this.modalEventoAccion = "borrar";
      this.modalAlerta = "error";
      this.modal = true;
    },
    modalCrear() {
      this.escuelaSeleccionado = { id: null, escuela: "" };
      this.modalTitulo = "Crear nueva escuela";
      this.modalBtnAccionTexto = "Crear";
      this.modalEventoAccion = "crear";
      this.modalBtnAccionColor = "success";
      this.modal = true;
    },
    modalEditar(escuela) {
      const datos = JSON.parse(JSON.stringify(escuela));
      this.escuelaSeleccionado = datos;
      this.modalTitulo = "Editar escuela";
      this.modalBtnAccionTexto = "Guardar";
      this.modalEventoAccion = "actualizar";
      this.modalBtnAccionColor = "success";
      this.modal = true;
    },
    resetModal() {
      this.borrarEsc = false;
      this.modalTexto = "";
      this.modalTitulo = "";
      this.modalAlerta = "";
      this.eventoAccion = "";
      this.modalBtnAccionTexto = "";
      this.modalBtnAccionColor = "";
      this.modalEstado = "default";
    },
    crearEscuela() {
      createSchool(this.escuelaSeleccionado.escuela)
        .then((res) => {
          let mensaje = "Escuela creada correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getSchools();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al crear la escuela";

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
    borrarEscuela() {
      this.modalEstado = "cargando";
      deleteSchool(this.escuelaSeleccionado.id)
        .then((res) => {
          let mensaje = "Escuela eliminada correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getSchools();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al eliminar la escuela";

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
    actualizarEscuela() {
      this.modalEstado = "cargando";
      updateSchool(this.escuelaSeleccionado)
        .then((res) => {
          let mensaje = "Escuela actualizada correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getSchools();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al actualizar la escuela";

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
      this.getSchools();
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