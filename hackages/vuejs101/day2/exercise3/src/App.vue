<template>
  <div id="app">
    <aside>
      <router-link :to="{ name: 'Home' }">List</router-link>
    </aside>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-leave, .fade-enter-to {
    opacity: 1;
}
.fade-leave-to,.fade-enter {
    opacity: 0;
}
.fade-leave-active, .fade-enter-active {
    transition: opacity 0.5s ease;
}
</style>
