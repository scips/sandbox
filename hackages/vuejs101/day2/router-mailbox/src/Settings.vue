<template>
  <div>
    <h1>Settings !!!!</h1>
    <p>{{ isSave ? 'saved' : 'notsaved' }}</p>
    <button @click="isSave = true">save</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSave: false
    }
  },
  beforeRouteEnter (to, from, next) {
    // no access to this !!!
    // no need to give a call back so once next is called the component will exists
    /*
    fetchData().then( data => {
        next(vm => {
            vm.data = data
        })
    }).catch(next) // propagate error to the router and cancel navigation properly
    */
  },
  beforeRouteLeave (to, from, next) {
    if (this.isSave || confirm("sure?")) {
        next()
    } else {
        next(false) // cancel navigatio
    }
  }
}
</script>
