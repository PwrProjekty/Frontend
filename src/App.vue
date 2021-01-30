<template>
  <div id="nav">
    <router-link to="/">Strona startowa</router-link>
    |
    <router-link to="/admin/leaders">Zarządzaj bazą przodowników</router-link>
    |
    <router-link to="/admin/trails">Zarządzaj bazą odcinków</router-link>
    |
    <router-link to="/admin/waypoints">Zarządzaj bazą punktów na trasie</router-link>
    |
    <router-link to="/leader/trips">Przeglądaj zgłoszone wycieczki</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
