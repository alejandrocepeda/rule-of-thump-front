<template>
  <div id="app">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      
  </div>
</template>

<style>

.fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter{
  opacity: 0;
}

/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*/
</style>
