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
        <v-alert class="signup-alert" icon="shield" text type="info">
          Nota: Su contraseña será enviada a su correo de la UACJ. Si es
          incorporado esta será enviada al correo que utilice para registrarse.
        </v-alert>
        <v-select
          v-model="userModel.tipo_usuario"
          :items="userTypes"
          label="Tipo de usuario"
          :rules="requiredRule"
          required
          outlined
        ></v-select>
        <v-text-field
          label="Matrícula"
          v-if="userModel.tipo_usuario == 'Alumno'"
          v-model="userModel.matricula"
          :rules="requiredRule"
          @keyup.enter="signup"
          outlined
          required
        ></v-text-field>
        <v-text-field
          label="Nombre"
          v-model="userModel.nombre"
          :rules="requiredRule"
          @keyup.enter="signup"
          outlined
          required
        ></v-text-field>
        <v-text-field
          label="Correo"
          v-model="userModel.correo"
          v-if="userModel.tipo_usuario == 'Incorporado'"
          :rules="emailRules"
          @keyup.enter="signup"
          outlined
          required
        ></v-text-field>
        <autocomplete
          label="Escuela"
          ref="schools-select"
          request_field_name="escuela"
          :request_method="schoolsRequest"
          :rules="requiredRule"
          v-if="userModel.tipo_usuario == 'Incorporado'"
          required
          @nuevo-valor="userModel.escuela = $event.value"
        />
        <autocomplete
          label="Instituto"
          ref="institutes-select"
          request_field_name="instituto"
          :request_method="institutesRequest"
          :rules="requiredRule"
          v-if="userModel.tipo_usuario == 'Alumno'"
          required
          @nuevo-valor="userModel.instituto = $event.value"
        />
        <autocomplete
          label="Programa"
          ref="programs-select"
          request_field_name="programa"
          :request_method="programsRequest"
          :rules="requiredRule"
          v-if="userModel.tipo_usuario == 'Alumno'"
          required
          @nuevo-valor="userModel.programa = $event.value"
        />
        <v-btn block :loading="cargando" @click="signup">Crear cuenta</v-btn>
      </v-form>
    </div>
  </section>
</template>

<script>
import { signUp } from "../api/user-requests";
import { listPrograms } from "../api/programs-requests";
import { listInstitutes } from "../api/institutes-requests"
import { listSchools } from "../api/schools-requests"
import autocomplete from "../components/global/autocomplete";

export default {
  components: { autocomplete },
  data: () => ({
    cargando: false,
    valid: true,
    emailRules: [
      (v) => !!v || "Este campo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo no es válido",
    ],
    requiredRule: [(v) => !!v || "Este campo es requerido"],
    userModel: {
      tipo_usuario: "Alumno",
      matricula: "",
      nombre: "",
      instituto: "",
      escuela: "",
      programa: "",
      correo: "",
    },
    userTypes: [
      {
        text: "Alumno UACJ",
        value: "Alumno",
      },
      {
        text: "Incorporado",
        value: "Incorporado",
      },
    ],
    institutes: ["IADA", "ICSA", "IIT", "CU"],
    programsRequest: listPrograms,
    institutesRequest: listInstitutes,
    schoolsRequest: listSchools
  }),
  methods: {
    signup() {
      if (this.$refs["signup-form"].validate()) {
        this.cargando = true;
        signUp(this.userModel)
          .then(() => {
            this.$message({
              message: "Cuenta creada correctamente.",
              type: "success",
            });
            this.$router.push("/login");
          })
          .catch((error) => {
            console.error(error.response);

            this.$message({
              message: "Ocurrió un error al crear su cuenta",
              type: "error",
            });
          })
          .finally(() => {
            this.cargando = false;
          });
      }
    },
    resetForm() {
      this.valid = true;
      this.userModel = {
        tipo_usuario: "Alumno",
        matricula: "",
        nombre: "",
        instituto: "",
        escuela: "",
        programa: "",
        correo: "",
      };
      this.$refs["programs-select"].reset_select();
      this.$refs["institutes-select"].reset_select();
      this.$refs["schools-select"].reset_select();
    },
  },
};
</script>

<style scoped>
.signup-alert {
  margin: 0 0 22px 0;
}

.signup-container {
  margin-top: 12.5%;
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
