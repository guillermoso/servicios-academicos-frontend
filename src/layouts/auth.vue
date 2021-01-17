<template>
  <v-app>
    <v-main>
      <main class="auth-grid">
        <section class="title-container">
          <header class="title-header">
            <h1 class="title-text">UACJ</h1>
          </header>
          <main class="title-main">
            <div>
              <h1 class="title-text">Servicios</h1>
              <h1 class="title-text">Acádemicos</h1>
            </div>
          </main>
        </section>
        <router-view />
      </main>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "auth",
}
</script>

<style scoped>
.auth-grid {
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100%;
}
.title-container {
  background-color: #224c91;
  border-right: 10px solid #d3d08d;
  padding: 36px;
}

.title-text {
  font-size: 36px;
  color: #d3d08d;
}

.title-main {
  margin-top: 25%;
  display: flex;
  height: 75%;
  justify-content: center;
}

.title-main .title-text {
  text-align: center;
}
</style>
