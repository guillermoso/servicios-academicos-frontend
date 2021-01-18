import axios from "./index.js"

//Funcion que muestra la lista de todas las reglas existentes
export const listInstitutes = (paginationData) => {
  let defaults = {
    resultados_por_pagina: 50,
    pagina: 1,
  }

  // merge default values to config obj sent on function invocation
  Object.assign(defaults, paginationData)

  let route = "/api/institutos/listar"
  return new Promise((resolve, reject) => {
    axios
      .get(route, { params: defaults })
      .then((response) => {
        let institutos = response.data.datos;
        resolve({
          institutos: institutos,
        })
      })
      .catch((e) => {
        console.error(e)
        reject(e)
      })
  })
}

export default {
  listInstitutes,
}
