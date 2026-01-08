// filepath: src/App.vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// Verwijder de import en component-registratie voor LoginPage, want router-view handelt dit af
export default {
  name: 'App'
  // components: {} // Niet nodig
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>