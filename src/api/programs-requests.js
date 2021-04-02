import axios from "./index.js";

const prefix = "/api/programas";

// TODO: hacer esta llamada para un autocompletec
export const listPrograms = (paginationData) => {
  let defaults = {
    resultados_por_pagina: 20,
    pagina: 1,
  };

  Object.assign(defaults, paginationData);

  let route = `${prefix}/listar`;
  return new Promise((resolve, reject) => {
    axios
      .get(route, { params: defaults })
      .then((response) => {
        let programas = response.data.datos;
        let paginacion = false;
        if (response.data.paginacion) paginacion = response.data.paginacion;

        resolve({
          programas: programas,
          paginacion: paginacion ? paginacion : undefined
        });
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
};

export const deleteProgram = (program_id) => {

  if (!program_id) {
    throw Error("Id de programa no válido");
  }
  const data = {
    programa_id: program_id,
  };

  let route = `${prefix}/eliminar`;
  return new Promise((resolve, reject) => {
    axios
      .delete(route, { data: data })
      .then((response) => {
        let programas = response.data.datos;

        resolve({
          programas: programas,
        });
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
};

export const createProgram = (program_name) => {
  if (!program_name) {
    throw Error("Nombre de programa no válido");
  }

  const data = {
    "programa": program_name
  }

  const route = `${prefix}/crear`;
  return new Promise((resolve, reject) => {
    axios
      .post(route, data)
      .then((r) => {
        resolve(r.data);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  })
}

export const updateProgram = ({id, programa}) => {
  if (!id) {
    throw Error("ID de programa no válido");
  }
  if (!programa) {
    throw Error("Nombre de programa no válido");
  }

  const data = {
    "programa_id": id,
    "programa": programa
  }

  const route = `${prefix}/actualizar`;
  return new Promise((resolve, reject) => {
    axios
      .patch(route, data)
      .then((r) => {
        resolve(r.data);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  })
}

export default {
  listPrograms,
  deleteProgram,
  createProgram,
  updateProgram
};
