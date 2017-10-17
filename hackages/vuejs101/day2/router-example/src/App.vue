<template>
  <div id="app">
    <router-view/>
    <router-link to="/foo">Foo</router-link>
    <router-link to="/bar">Bar</router-link>
    <router-link to="/post/123">Post 123</router-link>
    <router-link to="/post/456">Post 456</router-link>
    <router-link :to="{ name: 'posts', params: { id: 789}}">Name routing to Post 789</router-link>
    <div><a href="#/foo">Also foo but hardcoded it won't work with mode history activated</a></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
