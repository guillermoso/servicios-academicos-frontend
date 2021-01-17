import axios from "axios";

//set de la url base para axios
axios.defaults.baseURL = process.env.VUE_APP_API;

export default axios;
