import axios from "./index.js"

//Funcion que muestra la lista de todas las reglas existentes
export const signUp = (userModel) => {
  let defaults

  if (userModel.tipo_usuario == "Alumno") {
    delete userModel.correo;
    defaults = {
      tipo_usuario: null,
      matricula: null,
      nombre: null,
      instituto: null,
      programa: null,
    }
  } else {
    delete userModel.matricula;
    delete userModel.instituto;
    delete userModel.programa;
    
    defaults = {
      tipo_usuario: null,
      nombre: null,
      correo: null,
    }
  }

  // merge default values to config obj sent on function invocation
  Object.assign(defaults, userModel)

  let route = "/api/signup"
  return new Promise((resolve, reject) => {
    axios
      .post(route, defaults)
      .then((response) => {
        console.log(response)
        // let rewards = [];
        // rewards= response.data.payload;
        // resolve({
        //   rewards: rewards,
        //   pagination: response.data.pagination,
        //   totalRewards:response.data.totalRewards,
        //   totalRedeemedRewards:response.data.totalRedeemedRewards

        // });
        resolve("test")
      })
      .catch((e) => {
        console.error(e)
        reject(e)
      })
  })
}

export default {
  signUp,
}
