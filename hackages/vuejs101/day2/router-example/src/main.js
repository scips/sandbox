import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// 1. Install it and handle router props in Vue : handle 2 compoent: router-view and router-link
Vue.use(VueRouter)

const Foo = {template: `<div>Foo</div>`}
const Bar = {template: `<div>Bar</div>`}
const NotFound = {template: `<div>NotFound</div>`}

// 2. create a router instance
const router = new VueRouter({
  mode: 'history',
  routes: [
    // define our routes
    { path: '/', redirect: '/foo' }, // base route
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '*', component: NotFound },
  ]
})

new Vue({
  el: '#app',
  // 3. connect the router to the app
  router: router,
  // or shorter:  (es6)
  // router,
  render: h => h(App)
})
