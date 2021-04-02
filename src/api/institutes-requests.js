import axios from "./index.js"

const prefix = "/api/institutos";

export const listInstitutes = (paginationData) => {
  let defaults = {
    resultados_por_pagina: 20,
    pagina: 1,
  }

  // merge default values to config obj sent on function invocation
  Object.assign(defaults, paginationData)

  let route = `${prefix}/listar`;
  return new Promise((resolve, reject) => {
    axios
      .get(route, { params: defaults })
      .then((response) => {
        let institutos = response.data.datos;
        let paginacion = false;
        if (response.data.paginacion) paginacion = response.data.paginacion;

        resolve({
          institutos: institutos,
          paginacion: paginacion ? paginacion : undefined
        });
      })
      .catch((e) => {
        console.error(e)
        reject(e)
      })
  })
}

export const deleteInstitute = (instituto_id) => {
  
  if (!instituto_id) {
    throw Error("Id de instituto no válido");
  }
  const data = {
    instituto_id: instituto_id,
  };

  let route = `${prefix}/eliminar`;
  return new Promise((resolve, reject) => {
    axios
      .delete(route, { data: data })
      .then((response) => {
        let institutos = response.data.datos;

        resolve({
          institutos: institutos,
        });
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
};

export const createInstitute = (instituto_name) => {
  if (!instituto_name) {
    throw Error("Nombre de instituto no válido");
  }

  const data = {
    "instituto": instituto_name
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

export const updateInstitute = ({id, instituto}) => {
  
  if (!id) {
    throw Error("ID de instituto no válido");
  }
  if (!instituto) {
    throw Error("Nombre de instituto no válido");
  }

  const data = {
    "instituto_id": id,
    "instituto": instituto
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
  listInstitutes,
  deleteInstitute,
  createInstitute,
  updateInstitute
};

