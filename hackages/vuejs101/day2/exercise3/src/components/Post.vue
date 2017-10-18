<template>
  <div>
    <aside>
      <div v-if="previous"><router-link :to="{ name: 'Post', params: {id: previous.id} }">&lt; Previous</router-link></div>
      <div v-if="next"><router-link :to="{ name: 'Post', params: {id: next.id} }">Next &gt;</router-link></div>
    </aside>
    <div class="post">
      <h1>Post</h1>
      <h2>{{ post.title }}</h2>
      <div>{{ post.body }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Post',
  props: ['id'],
  beforeRouteEnter (to, from, next) {
    // fetch data
    console.log('fetching data')
    console.log(to)
    axios.get('http://jsonplaceholder.typicode.com/posts/' + to.params.id).then(
      response => {
        next(vm => {
          vm.post = response.data
          if (vm.post.id <= 1) {
            vm.previous = null
          } else {
            vm.previous = {id: vm.post.id - 1}
          }
          console.log(vm.post)
        })
      }).catch(e => {
        console.log(e)
        next()
      })
  },
  data () {
    return {
      post: {
        title: 'temp',
        body: 'tem'
      },
      next: null,
      previous: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
