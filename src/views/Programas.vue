<template>
  <main class="grid">
    <programs-table
      :loading="loading"
      :programs="programs"
      :pagination="pagination"
      @click:delete="modalBorrar($event)"
      @click:edit="modalEditar($event)"
      @pagination-change="cambiarPagina($event)"
    ></programs-table>
    <aside class="aside">
      <div class="sticky">
        <card-accion
          class="card-accion"
          titulo="Registro de nuevos programas"
          texto_boton="Crear programa"
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
      <v-form v-if="!borrarProg" ref="cu-form" v-model="valido" lazy-validation>
        <v-text-field
          v-model="programaSeleccionado.programa"
          :rules="reglaValidacion"
          label="Programa"
          outlined
          required
        ></v-text-field>
      </v-form>
    </modal>
  </main>
</template>

<script>
import {
  listPrograms,
  deleteProgram,
  createProgram,
  updateProgram,
} from "../api/programs-requests";
import programsTable from "../components/programs/programs-table";
import modal from "../components/global/modal";
import cardAccion from "../components/global/card-accion";

export default {
  components: {
    programsTable,
    modal,
    cardAccion,
  },
  data: () => ({
    borrarProg: false,
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
    programs: [],
    programaSeleccionado: {},
    programaSeleccionado: { id: null, programa: "" },
  }),
  created() {
    this.getPrograms();
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
    getPrograms() {
      this.loading = true;
      listPrograms({ pagina: this.pagination.pagina})
        .then(({ programas, paginacion }) => {
          this.programs = programas;
          this.pagination = paginacion;
        })
        .catch((err) => {
          this.$message({
            message: "Ocurrió un error al consultar el listado de programas",
            type: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    elegirAccion(accion) {
      switch (accion) {
        case "borrar":
          this.borrarPrograma();
          break;
        case "crear":
          this.crearPrograma();
          break;
        case "actualizar":
          this.actualizarPrograma();
          break;
      }
    },
    modalBorrar(programa) {
      this.borrarProg = true;
      this.programaSeleccionado = programa;
      this.modalTexto = "Estas a punto de borrar un programa";
      this.modalBtnAccionTexto = "Borrar";
      this.modalBtnAccionColor = "error";
      this.modalEventoAccion = "borrar";
      this.modalAlerta = "error";
      this.modal = true;
    },
    modalCrear() {
      this.programaSeleccionado = { id: null, programa: "" };
      this.modalTitulo = "Crear nuevo programa";
      this.modalBtnAccionTexto = "Crear";
      this.modalEventoAccion = "crear";
      this.modalBtnAccionColor = "success";
      this.modal = true;
    },
    modalEditar(programa) {
      const datos = JSON.parse(JSON.stringify(programa));
      this.programaSeleccionado = datos;
      this.modalTitulo = "Editar programa";
      this.modalBtnAccionTexto = "Guardar";
      this.modalEventoAccion = "actualizar";
      this.modalBtnAccionColor = "success";
      this.modal = true;
    },
    resetModal() {
      this.borrarProg = false;
      this.modalTexto = "";
      this.modalTitulo = "";
      this.modalAlerta = "";
      this.eventoAccion = "";
      this.modalBtnAccionTexto = "";
      this.modalBtnAccionColor = "";
      this.modalEstado = "default";
    },
    crearPrograma() {
      createProgram(this.programaSeleccionado.programa)
        .then((res) => {
          let mensaje = "Programa creado correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getPrograms();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al crear el programa";

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
    borrarPrograma() {
      this.modalEstado = "cargando";
      deleteProgram(this.programaSeleccionado.id)
        .then((res) => {
          let mensaje = "Programa eliminado correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getPrograms();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al eliminar el programa";

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
    actualizarPrograma() {
      this.modalEstado = "cargando";
      updateProgram(this.programaSeleccionado)
        .then((res) => {
          let mensaje = "Programa actualizado correctamente";
          if (res.mensaje) mensaje = res.mensaje;
          this.$message({
            message: mensaje,
            type: "success",
          });
          this.modal = false;
          this.getPrograms();
        })
        .catch((e) => {
          let mensaje = "Ocurrió un error al actualizar el programa";

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
      this.getPrograms();
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