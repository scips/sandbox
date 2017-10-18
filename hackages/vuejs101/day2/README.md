# Hackages - VueJS 101 - day 2

by Evan You - @youyuxi

Wifi: S14-Hackages / H-102017

## Scalability

- Cli
- Transitions
- Webpack
- Scaffolding
    + Config
    + `vue-loader`
- Routing
    + Basic router
    + `vue-router`
- Data fetching
- Code spliting + async
- State mngmt
- Vuex


### Transitions

A very common use case, so it's incorporated in the framework.

Simple case with the **v-if**

{% raw %}
```vue
    <div id="el">
        <button @click="ok = !ok">toggle</button>
        <transition name="fade">
            <div v-if="ok">ok</div>
        </transition>
    </div>
```
{% endraw %}

    var vm = new Vue({
      el: '#el',
      data: {
        ok: true
      }
    })

All you need is to have the css style that fit the **transition name**:

    <style>
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

Transition is a special vue component

{% raw %}
```vue
    <transition name="">
```
{% endraw %}

Transition attribute:
- **name**: used to refer to the appropriate css property
- **enter-active-class**: class you want to apply
- **leave-active-class**: class you want to apply
- **mode**: change the way things appears and disapears (wait for the previous to finish for instance)

**see**:
* [transition.html](https://scips.github.io/sandbox/hackages/vuejs101/day2/transition.html)
* [transition.html code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day2/transition.html)

You can also have more specific access to code the manage the transition in js.

**see**:
* [transition2.html](https://scips.github.io/sandbox/hackages/vuejs101/day2/transition2.html)
* [transition2.html code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day2/transition2.html)



**see**:
* [transition3.html](https://scips.github.io/sandbox/hackages/vuejs101/day2/transition3.html)
* [transition3.html code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day2/transition3.html)

Internaly the transition is done after the value of the ok button as already changed.

For instance here the *ok* is directly set to **false**

Also:

    <div id="el">
        <button @click="ok = !ok">toggle</button>
        <transition name="fade">
            <div v-if="ok">ok</div>
            <div v-else="ok">not ok</div>
        </transition>
    </div>

Will not work because it's the same content and just replacement. You need a key.

So we will add **key** attribute and at the same time **mode** just to have somehting nicer

    <div id="el">
        <button @click="ok = !ok">toggle</button>
        <transition name="fade" mode="out-in">
            <div v-if="ok" key="aaa">ok</div>
            <div v-else="ok" key="bbb">not ok</div>
        </transition>
    </div>

**In short**

* Pure CSS transition with **name**
* Using **enter-active-class** **leave-active-class** you can manage transition class name
* Using **@enter**, **@leave** we can programatically handle transition

### CLI

The vue cli! It is 90% a scaffolding tool.

Most of the time it takes stuff from the web and put them locally asking question to know which stuff to take.

```bash
    vue init webpack-simple hello-world

    ? Project name hellow-world
    ? Project description A Vue.js project
    ? Author Sébastien Barbieri <sebastien.barbieri@gmail.com>
    ? Use sass? No

       vue-cli · Generated "hello-world".

       To get started:

         cd hello-world
         npm install
         npm run dev.
```

#### List of templates

    vue list

provide a list of existing official template


**Future**: provide one single template (based on webpack)

 What is the difference between webpack simple and webpack: mainly linter and tools.

#### What's inside

**src/**:
* **main.js**: Single file importing everything
    * im
* **App.vue**:
    - contains the app template
        + image are using relative path and will be rewrited back webpack based on the configuration (exemple CDNs, image server ...)
* **package.json**:
    - cross-env is a lib that takes care of environment variables
    - webpack-dev-server --hot: **hot reloading** you don't need to refresh the page, and preserve the application state
* **webpack.config.js**

#### Architecture

* Organize feature by directory with all the asset files inside the same directory

*Feature Oriented Collocation*

#### Building for production

```bash
    hello-world$ yarn run build
    yarn run v1.2.1
    $ cross-env NODE_ENV=production webpack --progress --hide-modules
    Hash: 3cd6f9e2b58db9e7ff20                                                           
    Version: webpack 3.7.1
    Time: 3488ms
                                        Asset     Size  Chunks             Chunk Names
    logo.png?82b9c7a5a3f405032b1db71a25f67021  6.85 kB          [emitted]  
                                     build.js  95.8 kB       0  [emitted]  main
                                 build.js.map   803 kB       0  [emitted]  main
    Done in 3.99s.
```

Files will be manged by webpack

#### Webpack

Has the ability to pipe the source file to do source file transformation.

**output**:
* **publicPath**: Where the ressource will be once it's deployed to the server
* **filename**: bundle filename
**module**: which transformation to use for different files
* **rules**:
    + **loader**: `vue-loader` // vue file handling
    + **loader**: `bable-loader` // es6 -> js
    + **loader**: `file-loader` // look at the public path and relative path and calculate the final url to generate then give it back to js to use + move the file to the correct location
**performance**: give you advice if you package is too big, you'll need code splitting
**resolve**: customize how webpack should look for files. In particular resolve import.
**definePlugin**

```js
import Vue from 'vue'
```

Will search within the node_module for a vue folder and parse the package.json search for the **module** and load the resource. In this case the esm module of vue.
Without this line the webpack will not be able to provide the adequate js package to load on the fly vue element. But pre-compiled vue element will still work (template within **app.vue** file will work but template created on runtime will not)

Webpack will shim the js **process**, that's fine for development but not good for production. so to get rid of that, we need to use the **definePlugin**.
That will lead to 'string1' !== 'production' but because webpack will replace string1 with *production* the section will be *'production' !== 'production'* which will be completely remove by **uglify.js**.

#### Overlay

The overlay is used in dev mode to show errors while hot reload is running.

### Routing

What routing is in vuejs

**basic router**
    - listen to state route change and call a callback

In the vue context routing is essentially mapping url to component

**/**: point to the main app
**/profile**: point to the profile component
**/profile/1234**: point to the profile component in a specific state

#### A basic router

```js
window.addEventListener('hashchange', () => {
  // read hash and update app
})
```

##### Exercise routing from scratch

1. hash-router.html
1. hash-router-solution.html
1. hash-router-solution-component-definition.html
1. hash-router-solution-dynamic-component.html

##### The vue router

[hash-router-solution-vue-router.html](hash-router-solution-vue-router.html)

See codesandbox.io -> which povide a sandbox

Call the global vue api:

```js
// 1. Install it and handle router props in Vue
Vue.use(VueRouter)

// 2. create a router instance
const router = new VueRouter({
  routes: [
    // define our routes
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

```

Import the router, tell view to handle router, create a router instance and link the router to the app.

Routes order are important it's the way route are matched, don't put the catch all  (**'*'**) on top.

##### Vue.use(VueRouter)

Handle 2 new components:

* RouterLink
* RouterView

**mode**: History use browser history but you need history mode fallback it will handle on server side the application. For instance if your app is in /app/, some urls will be: /app/my-sub-part but if the user directly goes to this url the web server will need to handle this properly and send the app which is in /app/ then point it to the component. See apache/nginx rewrite example: https://router.vuejs.org/en/essentials/history-mode.html#apache

There is an option in dev mode to do that: 

```js
devServer: {
    historyApiFallback: true,
}
```

##### Handling states

```js
const Post = {template: `<div>Post {{ $route.params.id }}</div>`}

// ...

{ path: '/post/:id', component: Post }, // a route with a specific state
```

But a better way is to make a nicer component that will handle this properly

```js
const Post = {
  props: ['id'],
  template: `<div>Post {{ id }}</div>`
}

{ path: '/post/:id', component: Post, props: true }, // a route with a specific state + props
```

##### Named path

Named path are usefull to refer to path further on.

```vue
<router-link :to="{ name: 'posts', params: { id: 789}}">Name routing to Post 789</router-link>
```

```js
    {
      name: 'posts',
      path: '/post/:id',
      component: Post,
      props: true
    }, // a route with a specific state + props + name
```

##### Navigating

**With router link**

```vue
<router-link :to="{ name: 'posts', params: { id: 789}}">Name routing to Post 789</router-link>
```


**With code**


```js

router.push('/bar')
router.push({name: 'posts', params: {id: 123}}) // no need to stringify path, just use object

this.$router.push('/bar')
this.$router.push({name: 'posts', params: {id: 123}})
```

The great thing about passing object is that you need to stringify or think avout the url, just put all the param handled by the componant

##### Component that stay on a page while navigating

Think about gmail and the side, top and footer bar the main content change but the others.

Some route:
* /inbox/mails -> app
* /inbox/mail/12345 -> a detail of a mail


**In the main vue**

{% raw %}
```vue
<template>
  <div id="app">
    <router-link to="/inbox">Inbox</router-link>
    <router-link to="/settings">Settings</router-link>
    <router-view></router-view>
  </div>
</template>
```
{% endraw %}

**In the app**

```js
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
```

##### Handling common stuff to do on each page change

*Analytics*, *View count*...

To handle this, simply use **beforeEach**

* **meta**: to allow us to pass information from the router such as authentication settings enabled or not

```js
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.auth) {
    if (isUserLoggedIn) {
      next()
    } else {
      next('/login?from='+next.fullPath)
    }
  } else {
    next()
  }
  next()  // must be called in order to perform the navigation
})
```

This is a global router hook but we can also handle in component hook

##### Handling in component hooks

**beforeRouterEnter hook**: Can handle all the wait and data handling before the navigation occurs
**beforeRouterUpdate hook**: will take care of updating the component once the component is already there

#### Scoping components

```js
const Inbox = {
    template: ``,
    components: {
        InboxMails
    }
}
```

The Inbox component will have access to InboMails component

**!!! Dom sensitive stuff, the html element are case insensitive ```<FooBar>``` will be transfromed to ```<foobar>``` before vue can even see it.**

### Exercise

**Use:** https://jsonplaceholder.typicode.com/

1. One page to display a list of page
2. One page for post detail

#### Hint

For ajax call, use **axios** if possible or jqury ajax

**axios** is iso morphic (idem server/client)

Not ideal but exists: ```Vue.prototype.$http = axios```

#### Use promise

```js
const p1 = axios.get ...
const p2 = axios.get ...

Promise.all([p1,p2]).then(console.log('all promise done'))
```

#### Components

Don't use components until you need them ... as soon as it is too big split it.

don't over split in advance

### Code Splitting + Async

#### Async component

is defined as a function that return a promise

```js
    const Foo = () => {
        return new Promise((resolve, reject) => {
        resolve({
            template: `...`
        })
        })
    }
```

**WHY?**

Because the ```import('./Post.vue')``` will return a Promise in future browser. It's called: **dynamic import**

**Webpack** is transparently doing this for you

So it's identical to

```js
    const Foo = () => import('./Foo.vue')
```

Difference between synchronous and asynchronous

```js
    // synchrone
    import Foo from './Foo.vue'

    // asynchrone
    const Foo = () => import('./Foo.vue')
```

*You need an extra plugin to do it* because babel doesn't know how to do it: **syntax-dynamic-import**

**.babelrc**
```js
{
    plugins:[
        'syntax-dynamic-import'
    ]
}
```

**common chunk plugins** is used when there is a dependency issue between chunk, its to avoid duplication, but duplication is not a real problem because everything is cached.

#### Multiple component async

Use webpack webpackChunkName common to make multiple component inot the same chunck

```js
    // asynchrone
    const Foo = () => import(/* webpackChunkName: post */ './Post.vue')
    const Foo = () => import(/* webpackChunkName: post */ './Comment.vue')
```

### State

To cache the data and keep data across several page.

The idea is to store the information at application level in a centralized state management.

The state will be shared accross components.

All component should then refer to the same state.

All library such as flex, vuex ... are designed to handle state but also have a lot of constraint.

see [state.html](state.html)



#### State managment

State management is done via a **store**

```js
    const obj = {
        foo: 123
    }

    let fooValue

    Object.defineProperty(obj, 'foo', {
        get () {
            // obj.foo
            // track dependency
            return fooValue
        },
        set (newValue) {
            // obj.foo = 1234
            // trigger update
            fooValue = newValue
        }
    })
```

To handle dependency the getter must be invoked. To be invoked it needs to be accessed via the **.**

```js
let bar = obj.foo // tracking dep.
// using
bar
// will not track dependency anymore
```

So you always need to use the **.** notation of the state object to ensure that the getter is triggered

so in component you need to avoid

```js
    Vue.component('counter', {
        template: `<div>{{ count }}</div>`,
        data () {
            return { count: store.state.count }
        }
    })
```

but instead

```js
    Vue.component('counter', {
        template: `<div>{{ count }}</div>`,
        data () {
            return { store.state }
        }
    })
```

In Vuex store are created as follow

```js
const store = new Vuex.store({
    state: {
        count: 0
    },
    mutations: {
        inc (state) {
            state.count++
        }
    }
})
```


For synchronous operation we use **mutations**

For asynchronous operation we use **actions**

#### Actions

Use **dispatch**

#### Mutations

Use **commit**

Similar to COMMIT in DB

#### Getters

Getters provide caching and provide a way to retrieve data.

Equivalent to SELECT in DB

### mapState

To avoid declaring every computed access within the component, there is an helper.

```js
Vuex.mapState(['foo', 'bar']) => {
    foo() {return this.$store.state.foo},
    bar() {return this.$store.state.bar},
}
```

### Basic store application

```js
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

const API_BASE = ''

let fetchingPost = false

export default new Store({
  state: {
    posts: [],
    error: null
  },
  actions: {
    fetchAllPosts ({ commit }) {
      if (!fetchingPost) {
        axios.get(API_BASE + '/posts').then(({ data }) => {
          commit('saveAllPosts', {
            posts: data // use object it helps with debugging
          })
        })
        .catch(err => {
          commit('error', { err: err })
        })
      }
    }
  },
  mutations: {
    saveAllPosts (state, payload) {
      state.posts = payload.posts
    },
    error (state, error) {
      state.error = error.err
    }
  }
})
```

to use it now you can drastically reduce the component

```js

// Posts list
exports default {
    computed: {
        posts () {
            return this.$store.state.posts
        }
    }
}

// Post detail
exports default {
    props: ['id']
    computed: {
        posts () {
            return this.$store.state.posts.find( post => {
                return post.id === this.id
            })
        };
        comments () {
            return this.$store.state.comments.filter( comment => {
                return comment.postId === this.id
            })
        }
    },
    created () {
        this.$store.dispatch('fetchCommentsForPost', {id: this.id})
    }
}

```

### Modules

What if 2 persons are working on the store.

You can split the store n several Module and in the store add them.

```js
export default {
    namespaced: true,
    state: {
        // ...
    }
}
```

To use it

```js
export default new Store({
    modules: {
        posts: postsModule
    }
})
```
