import axios from "./index.js"

// TODO: hacer esta llamada para un autocompletec
export const listPrograms = (paginationData) => {
  let defaults = {
    resultados_por_pagina: 50,
    pagina: 1,
  }

  Object.assign(defaults, paginationData)

  let route = "/api/programas/listar"
  return new Promise((resolve, reject) => {
    axios
      .get(route, { params: defaults })
      .then((response) => {
        let programas = response.data.datos
        resolve({
          programas: programas,
        })
      })
      .catch((e) => {
        console.error(e)
        reject(e)
      })
  })
}

export default {
  listPrograms,
}
