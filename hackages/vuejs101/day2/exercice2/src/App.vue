<template>
  <div id="app">
    <p> exercice 2, consommer api avec axios </p>
    <h2>La vue</h2>
    <router-view></router-view>
<hr>
    <h2>La liste</h2>
    <div v-for="post in postList">
    <h3>

     <router-link :to="{ name: 'ReadPost' , params: {postId : post.id }}">
       {{post.title}}
      </router-link>

    </h3>
    <pre>
     id : {{post.id}}
     user : {{post.userId}}
    </pre>
   </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {

  name: 'app',
  data () {
    return {
      postList : [
         {
          id : "5",
          userId : "12",
          title : "ici on verra le titre"
         }
      ] 
    }
  },
  methods : {
  },
  created () {
    const $elf = this
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
          console.log(response);
          $elf.postList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
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
