<template>
  <div class="fi-container">
    <h1>404</h1>
    <h2>Página no encontrada.</h2>
    <p>Revisa el URL y asegurate que esté bien escrito.</p>
    <router-link to="/">
      <v-btn type="primary">
        Regresar al inicio
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "page-not-found",
}
</script>

<style scoped>
.fi-container {
  background-color: #f9f9f9;
  height: 96vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin: 0;
  padding-top: 1em;
  font-family: "Text Me One", sans-serif;
  font-size: 10em;
  color: #7b7b7b;
}

@media only screen and (max-width: 800px) {
  h1 {
    padding-top: 20px;
  }
}

h1,
h2,
p {
  text-align: center;
}

h2,
p {
  font-family: "Merriweather" sans-serif;
  color: #4a4a4a;
}

button {
  margin-top: 12px;
  font-size: 16px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
}

button:hover {
  cursor: pointer;
}
</style>
