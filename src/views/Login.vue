<template>
  <section class="login-container">
    <div>
      <h1 class="login-title">Inicio de sesión</h1>
      <v-form class="login-form" ref="login-form" v-model="valid" lazy-validation>
        <v-text-field
          @keyup.enter="login"
          v-model="email"
          :rules="emailRules"
          label="Correo"
          outlined
          required
        ></v-text-field>
        <v-text-field
          :append-icon="showPass ? 'visibility' : 'visibility_off'"
          v-model="password"
          :rules="passwordRules"
          label="Contraseña"
          outlined
          required
          :type="showPass ? 'text' : 'password'"
          @keyup.enter="login"
          @click:append="showPass = !showPass"
        ></v-text-field>
        <v-btn block @click="login">Iniciar sesión</v-btn>
      </v-form>
      <footer class="login-footer">
        <v-btn text>¿No tienes cuenta?</v-btn>
        <v-btn text>¿Olvidaste tu contraseña?</v-btn>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [(v) => !!v || "El campo correo es requerido", (v) => /.+@.+\..+/.test(v) || "Correo no válido"],
    showPass: false,
    password: "",
    passwordRules: [(v) => !!v || "El campo contraseña es requerido"],
  }),
  methods: {
    login() {
      console.log(this.$refs["login-form"].validate())
    },
  },
}
</script>

<style scoped>
.login-container {
  margin-top: 17.5%;
  display: flex;
  justify-content: center;
}

.login-form {
  margin-top: 22px;
  width: 400px;
}

.login-footer {
    display: flex;
    flex-direction: column;
    margin-top: 22px;
}

.login-title {
    text-align: center;
}
</style>
