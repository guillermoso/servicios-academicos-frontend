export const auth = {
  state: {
    token: null,
    name: null,
    email: null,
    groups: null,
    roles: null,
  },
  getters: {
    isTokenSet: (state) => {
      return state.token ? true : false;
    },
    getToken: (state) => {
      return state.token;
    },
    getName: (state) => {
      return state.name;
    },
    getEmail: (state) => {
      return state.email;
    },
    getRoles: (state) => {
      return state.roles;
    },
    /**
     * Función que recibe el nombre de un grupo y retorna si el usuario
     * está participando en el
     */
    validGroup: (state) => (groupToSearch) => {
      for (let i = 0; i < state.groups.length; i++) {
        if (state.groups[i] == groupToSearch) {
          return true;
        }
      }
      return false;
    },
  },
  mutations: {
    logout(state) {
      state.token = null;
      state.roles = null;
    },
    setUserInfo(state, { name, email, groups, roles, token }) {
      state.name = name;
      state.email = email;
      state.groups = groups;
      state.roles = roles;
      state.token = token;
    },
  },
  actions: {
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit("logout");
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    storeUserInfo({ commit }, { token, parsedToken }) {
      const userInfo = {
        name: parsedToken.nombre,
        email: parsedToken.usuario,
        groups: parsedToken.grupos,
        roles: parsedToken.permisos,
        token: token,
      };

      return new Promise((resolve, reject) => {
        try {
          commit("setUserInfo", userInfo);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
  },
};
