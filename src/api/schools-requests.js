import axios from "./index.js";

const prefix = "/api/escuelas";

export const listSchools = (paginationData, searchValue) => {
  let defaults = {
    resultados_por_pagina: 20,
    pagina: 1,
  };

  Object.assign(defaults, paginationData);

  if (searchValue) {
    defaults['escuela'] = searchValue;
  }

  let route = `${prefix}/listar`;
  return new Promise((resolve, reject) => {
    axios
      .get(route, { params: defaults })
      .then((response) => {
        let escuelas = response.data.datos;
        let paginacion = false;
        if (response.data.paginacion) paginacion = response.data.paginacion;

        resolve({
          escuelas: escuelas,
          paginacion: paginacion ? paginacion : undefined
        });
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
};

export const deleteSchool = (school_id) => {

  if (!school_id) {
    throw Error("Id de escuela no válido");
  }
  const data = {
    id: school_id,
  };

  let route = `${prefix}/eliminar`;
  return new Promise((resolve, reject) => {
    axios
      .delete(route, { data: data })
      .then((response) => {
        let escuelas = response.data.datos;

        resolve({
          escuelas: escuelas,
        });
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
};

export const createSchool = (school_name) => {
  if (!school_name) {
    throw Error("Nombre de escuela no válido");
  }

  const data = {
    "escuela": school_name
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

export const updateSchool = ({id, escuela}) => {
  if (!id) {
    throw Error("ID de escuela no válido");
  }
  if (!escuela) {
    throw Error("Nombre de escuela no válido");
  }

  const data = {
    "id": id,
    "escuela": escuela
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
  listSchools,
  deleteSchool,
  createSchool,
  updateSchool
};
