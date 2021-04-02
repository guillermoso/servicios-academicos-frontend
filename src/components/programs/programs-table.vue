<template>
  <v-card>
    <v-card-title>
      Listado de programas
      <v-spacer></v-spacer>
    </v-card-title>
    <div class="filters">
      <!-- <span class="filter">
        <products-autocomplete
          @new-value="filters.product = $event"
        />
      </span>
      <span class="filter">
        <date-picker
          label="Fecha de creación"
          @change="filters.creationDate = $event"
          clearable
        />
      </span>
      <v-btn
        outlined color="indigo"
        class="search-btn"
        @click="$emit('search-products', filters)"
        depressed
        >
        Buscar
        </v-btn>
      <v-btn
        class="search-btn"
        outlined color="indigo"
        @click="$emit('search-products', filters)"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
            Limpiar filtro
      </v-btn> -->
    </div>
    <v-skeleton-loader
      v-if="loading"
      transition="fade-transition"
      type="table-thead"
    />
    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      type="table-tbody"
    >
      <v-data-table
        :headers="headers"
        :items="programs"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="ml-2" @click="editProgram(item)">
            edit
          </v-icon>
          <v-icon small class="ml-2" @click="deleteProgram(item)">
            delete
          </v-icon>
        </template>
      </v-data-table>
    </v-skeleton-loader>
    <div class="text-center pt-2">
      <v-divider></v-divider>
      <v-pagination
        v-model="page"
        class="pagination"
        :length="pagination.total_paginas"
        :total-visible="10"
        @input="$emit('pagination-change', $event)"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    programs: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    filters: {
      product: null,
      creationDate: null
    },
    headers: [
      {
        text: "Programa",
        sortable: true,
        value: "programa",
        align: "left"
      },
      { text: "Fecha de creación", value: "created_at", sortable: true },
      { text: "Última modificación", value: "updated_at", sortable: true },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    page: 1
  }),
  methods: {
    editProgram(program) {
      const selectedProgram = program;
      this.$emit("click:edit", selectedProgram);
    },
    deleteProgram(program) {
      this.$emit("click:delete", program);
    }
  }
};
</script>

<style scoped>
.filter {
  width: 42%;
}

.filters {
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
}
.search-btn {
  margin-top: 1px;
  height: 39px !important;
}
.pagination {
  margin: 12px 0;
}
</style>
