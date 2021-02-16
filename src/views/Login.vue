<template>
  <section class="login-container">
    <div>
      <h1 class="login-title">Inicio de sesión</h1>
      <v-form
        class="login-form"
        ref="login-form"
        v-model="valid"
        lazy-validation
      >
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
        <v-btn block :loading="loading" @click="login">Iniciar sesión</v-btn>
      </v-form>
      <footer class="login-footer">
        <v-btn text @click="redirect('/signup')">¿No tienes cuenta?</v-btn>
        <v-btn text @click="redirect('/reestablecer-contrasena')"
          >¿Olvidaste tu contraseña?</v-btn
        >
      </footer>
    </div>
  </section>
</template>

<script>
import { logIn } from "../api/user-requests";

export default {
  data: () => ({
    loading: false,
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "Este campo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo no es válido",
    ],
    showPass: false,
    password: "",
    passwordRules: [(v) => !!v || "Este campo es requerido"],
  }),
  methods: {
    login() {
      this.loading = true;
      if (this.$refs["login-form"].validate()) {
        logIn({
          correo: this.email,
          contrasena: this.password,
        })
          .then(({ token, parsedToken }) => {
            console.log(token, parsedToken);
            this.$store.dispatch("storeUserInfo", { token, parsedToken })
              .then(() => {
                this.redirect('/')
              })
          })
          .catch((e) => {
            let mensaje = "Ocurrió un error al iniciar sesión";

            if (e.mensaje) mensaje = e.mensaje;
            this.$message({
              message: mensaje,
              type: "error",
            });
            console.error(e);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    redirect(path) {
      this.$router.push(path);
    },
  },
};
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
