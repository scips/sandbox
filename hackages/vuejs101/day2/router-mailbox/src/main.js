import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Settings from './Settings.vue'

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
  data () {
    return {
      isLoading: true
    }
  },
  // to handle loading
  created () {
    setTimeout(()=>{
      this.isLoading = false
    }, 1000)
  },
  // called only once
  beforeRouteEnter (to, form, next) {
    console.log("enter hook called")
    next()
  },
  // called on every update
  beforeRouteUpdate (to, form, next) {
    console.log("update hook called")
    next()
  },
  template: `<div>
    <div v-if="isLoading">
    Loading ...
    </div>
    <div v-else>
    Just one mail {{ id }}
    </div>
    <pre>
      In console do router.push('/inbox/mail/123') to see that enter hook is not called
    </pre>

  </div>
  `
}

// 2. create a router instance
const router = window.router = new VueRouter({
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
      ],
    },
    {
      path: '/settings',
      component: Settings,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.auth) {
    if (true) {
      next()
    } else {
      next('/login?from='+next.fullPath)
    }
  } else {
    next()
  }
  next()  // must be called in order to perform the navigation
})

var app = new Vue({
  el: '#app',
  // 3. connect the router to the app
  router: router,
  // or shorter:  (es6)
  // router,
  render: h => h(App)
})
