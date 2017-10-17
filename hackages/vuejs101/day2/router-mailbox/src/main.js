import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// 1. Install it and handle router props in Vue : handle 2 compoent: router-view and router-link
Vue.use(VueRouter)

const Inbox = {
  template: `<div>
    <aside>This is the sidebar</aside>
    <router-view></router-view>
  </div>`
}

const InboxMails = {
  template: `<div>
    <ul>
      <li>
        <router-link to="/inbox/mail/456">Mail 456</router-link>
      </li>
      <li>
        <router-link to="/inbox/mail/789">Mail 789</router-link>
      </li>
    </ul>
  </div>`
}

const InboxMail = {
  props: ['id'],
  template: `<div>
    Just one mail {{ id }}
  </div>`
}

// 2. create a router instance
const router = new VueRouter({
  mode: 'history',
  routes: [
    // define our routes
    {
      path: '/inbox',
      component: Inbox,
      // nested routes
      children: [
        {path: '', component: InboxMails }, // empty means default
        {path: 'mail/:id', component: InboxMail, props: true },
      ]
    },
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
