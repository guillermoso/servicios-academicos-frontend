<template>
  <section class="signup-container">
    <div>
      <h1 class="signup-title">Crea una cuenta</h1>
      <v-form
        class="signup-form"
        ref="signup-form"
        v-model="valid"
        lazy-validation
      >
      <!-- TODO: consultar el api para los tipos de usuarios -->
        <v-select
          v-model="userModel.type"
          :items="userTypes"
          label="Tipo de usuario"
          outlined
        ></v-select>
        <v-text-field
          @keyup.enter="signup"
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
          @keyup.enter="signup"
          @click:append="showPass = !showPass"
        ></v-text-field>
        <v-btn block @click="signup">Crear cuenta</v-btn>
      </v-form>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "El campo correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "Correo no válido",
    ],
    showPass: false,
    password: "",
    passwordRules: [(v) => !!v || "El campo contraseña es requerido"],
    userModel: {
      type: "alumno",
    },
    userTypes: [
      {
        text: "Alumno UACJ",
        value: "alumno",
      },
      {
        text: "Incorporado",
        value: "incorporado",
      },
    ],
  }),
  methods: {
    signup() {
      console.log(this.$refs["signup-form"].validate());
    },
    redirect(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.signup-container {
  margin-top: 17.5%;
  display: flex;
  justify-content: center;
}

.signup-form {
  margin-top: 22px;
  width: 400px;
}

.signup-footer {
  display: flex;
  flex-direction: column;
  margin-top: 22px;
}

.signup-title {
  text-align: center;
}
</style>
