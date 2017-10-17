<template>
  <div class="hello">
    <h1>Home</h1>
    <ol>
      <li v-for="post in posts">
        <router-link :to="{ name: 'Post', params: {id: post.id} }">{{ post.title }}</router-link>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  beforeRouteEnter (to, from, next) {
    // fetch data
    console.log('fetching data')
    axios.get('http://jsonplaceholder.typicode.com/posts').then(
      response => {
        next(brol => { brol.posts = response.data.slice(0, 10) })
      }).catch(e => {
        console.log(e)
        next()
      })
  },
  data () {
    return {
      posts: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ol {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
