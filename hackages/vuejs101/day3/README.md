# Hackages - VueJS 101 - day 2

by Evan You - @youyuxi

Wifi: S14-Hackages / H-102017


## Program

* Testing
    - Unit test with vue-test-utils
        + https://github.com/vuejs/vue-test-utils-mocha-webpack-example
        + Env setup
        + What to test?
    - E2E test wiht nightwatch
* Custom Directives
    - what for?
    - Custom directive on server
* Plugins
    - Plugin API
    - Type of plugins
    - Leveraging custom options
* Render Functions
    - Templates & Virtual DOM revisited
    - createElement API
* Exercises

## Testing

With **JSDOM** you don't need a real browser anymore, so it's easier.
You don't need selenium or headless browser.

### Jest

Nice Test framework but drawback: not a good integration with webpack.

Don't work with single file component, so we need a pre-processor that have some limitation: It doesn't replicate all the feature available in webpack.

### Mocha Webpack

https://github.com/vuejs/vue-test-utils-mocha-webpack-example

It is a wrapper of the following command

    webpack input output && mocha output

But saved in memory instead of writing to disk => Much more optimized

```bash
    mkdir mocha-webpack
    cd mocha-webpack/
    yarn add mocha-webpack -D
    yarn add expect
```

Mocha doesn't have an assertion lib.

Just use sinon, expect or chai.

#### Directory

Putting test file next to the script file is easier but you can put them in a test folder.

#### Testing vue file

    import Post from '../src/Post.vue'
    describe('demo', () -> {
        it('should load the component', () => {
            expect(Post).toBeTruthy()
            })
        })

Will not work unless we tell mocha to handle properly vue file by passing ```--webpaxck-config```

##### Add the ability to mount the component

    import { mount } from 'vue-test-utils'

+ add jsdom

```bash

    npm install js-dom
    npm install js-dom-global

```

##### Add the ability to have the DOM

Let's create a **setup.js** file that will be executed before all the test

```
// expose window, ... browser env
require('jsdom-global')()

// convenient way to have expect everywhere
global.expect = require('expect')
```

Add in the test script ```--require setup.js```


    import Post from '../src/Post.vue'
    import { mount } from 'vue-test-utils'

    describe('demo', () -> {
        it('should load the component', () => {
            const wrapper = mount(Post)
            })
        })


#### What to test?

Think about the component as a function that receive input and return output.

The unit test should only test the contract (the parameter of the function).

Don't test internal mechanism of the component.

Unit testing is to provide confidence when you are changing your code, it will allow you to refactor and continuously provide new feature in the long run.

To do that you need to reduce the friction of writing and changing test.

You test must test the component with the pulbic contract.

For the **Counter** component: the only

    <template>
        <div @click="$emit('increment')">{{ count }}</div>
    </template>
    <script>
        export default {
            props: ['count']
        }
    </script>



    import { Counter } from './Counter.vue'
    import { mount } from 'vue-test-utils'
    describe('demo', () => {
      it('should load the componet', () => {
        const counter = mount(Counter, {
          propsData: {
            count: 1
          }
        })
        expect(counter.count.toBe(1))
      })
    })

To pass args to the command use the **--**

    npm test -- --watch

To continuously test

Not all the component should be tested. Ideally test component that will be used in different places and in different situations.

##### Emitted

Emitted() return an object containing properties (emitted event + arrays of all the data emitted each time) a kind of history of everything taht has been emitted

    import { Counter } from './Counter.vue'
    import { mount } from 'vue-test-utils'
    describe('demo', () => {
      it('should load the componet', () => {
        const counter = mount(Counter, {
          propsData: {
            count: 1
          }
        })
        expect(counter.text().toBe(1))
        counter.setProps({
          count: 2
        })
        expect(counter.text().toBe(2))
        counter.trigger('click')
        // counter.emitted() is an information that is emitted by the component
        expect(counter.emitted().increment).toBeTruthy()
      })
    })

##### mount & shallow

**Mount** mount the component and the children component if you don't want the child component, use **shallow** instead.

    import { shallow } from 'vue-test-utils'
    // ...
    const counter = shallow(Counter, {
              propsData: {
                count: 1
              }
            })

It's better (best practice) and faster

##### Mocks

In last resource if the component is bound with some library
For instance when you use **axios** use **inject-loader**
It uses webpack magic:
- **!!** ignore conf of webpack
- **vue-loader?inject!

Otherwise simply use **best practice**

    mocks: {
        $store: {} /...
    }

You can also provide a real vuex store

    import { shallow, createLocalVue } from 'vue-test-utils'
    import Vue from 'vue'
    import Vuex from 'vue'
    Vue.use(Vuex) // this will affect all unit test as it is global !!!
    // ..
    describe('demo', () => {
      it('should load the componet', () => {
        const mockStore = new Vuex.store()
        const counter = shallow(Counter, {
            store:mockStore,
            //..

If you want a fresh copy of vue for each unit test its better to do it like this

    import { shallow, createLocalVue } from 'vue-test-utils'
    import Vue from 'vue'
    import Vuex from 'vue'
    // ..
    describe('demo', () => {
      it('should load the componet', () => {
        const mockStore = new Vuex.store()
        const LocalVue = createLocaLVue()
        LocalVue.use(Vuex)
        const counter = shallow(Counter, {
            localVue: LocalVue
            store:mockStore,
        //..


#### End 2 end test

Don't use testing with mocha-webpack-expect for end 2 end testing.

Don't test app transition from page to page.

You can use **Nightwatch**.

End2End testing need to use a real browser. Typically we will use **Selenium** but it needs java + selenium + driver for each browser adapted to the OS. It's not easy.

With the full **webpack** template it provide nightwatch.

```bash
    day3$ vue init webpack e2e
    day3$  cd e2e
    day3/e2e$ yarn install
    ? Project name e2e
    ? Project description A Vue.js project
    ? Author Sébastien Barbieri <sebastien.barbieri@gmail.com>
    ? Vue build standalone
    ? Install vue-router? No
    ? Use ESLint to lint your code? No
    ? Setup unit tests with Karma + Mocha? Yes
    ? Setup e2e tests with Nightwatch? Yes
```


**Selenium** by itself doen't have the test level. **Nightwatch** does provide the layer you need in between.

**Nightwatch** is easy to run on browserstack, saucelab.

See ./test/e2e/ for details

The package provide an additional elementCount assertion. You can write additional repetitive assertion and add them in the custom-assertions folder.

### Custom Directive

Is a way to get low level access to the DOM node.

In a component you don't touch the DOM, you don't have to do it.

A custom directive is added to the **v-** stuff.

For instance having a red text

    <p style="color: red">test</p>

If you want to have access to the color

    <p :style="{ color: someColor }">test</p>

Or you can create a custm directive

    <p v-red>text</p>

To register it

```vue
    <p v-red>test</p>

    Vue.directive('red',{
        bind (domElement, binding, vnode) {
            console.log(binding)
        },
        inserted () {

        },
        update () {

        },
        componentUpdated () {

        }
    })
```

**see** [custom-directive.html](custom-directive.html)

**domElement**: the DOM element

**binding**: give access to the changed value and the oldValue

**vnode**: give access to vnode context

Only use it if you have no other choice and you need to touch the DOM

### Plugins

#### Mixin

Merge component, avoid using global ```Vue.mixin(mixin)``` mixin especially if they are expensive.

#### $options

Options are available in

    const Foo = Vue.extend({componentOptions: []})
    const foo = new Foo({instanceOptions: []})
    foo.$options // {componentOptions: [], instanceOptions: []}

Mixin could be a good place to initialize stuff.

By using the

    Vue.mixin({created(){
    }})

#### Exercise

* add a validate prop
* add a plugin that will use the validate prop
* use watch and an input to handle change

**see**:
* [my solution](exercise.html)
* [evan solution](exercise-solution.html)
* [evan solution enhanced](exercise-solution-enhanced.html)

#### When to use mixin

Mixin is an easy way to add some functionnality to highly used component without wrapping a lot of components.

It's much more efficient to use a component and use mixin to enhance it.

With Mixin you still remain with one component.

in the vue context components are expensive so it's faster to use mixin.

### Render functions

* **returns** a new virtual DOM

Actual DOM is an HTMLDivElement

Virtual DOM is an Object {tag: 'div', data: { attrs: {}, ...}, children: []}

* **tag** type of node it is
* **data** attribute the node have binding kids
* **children** to continue the tree

#### Missconceptions

* Direct access to DOM is slower? False!

But jump to the wrapper of the browser that represent the DOM is expensive

Virtual DOM was invented because:
- we wanted to reduce the number of jump between JS and the browser wrapper

```vue
    <!-- Templates are limited -->
    <template>
        <div> {{ foo }}
    </template>

    <script>
        render (createElement) {
            // will return {tag: 'div', data: {}, children: [this.foo]}
            // it's pure JS so you can do things you cannot do with a template
            const children = []
            /*
            // iterate over things
            for () {

            }
            */
            return createElement('div', {}, [
                this.foo
            ])
        }
    </script>
```

Simply using 'h' is a convention

```js
    export default {
        render (h) { // hyper script <= hyper text <= HTML
            return h('div', {}, [
                this.foo
            ])
        }
    }
```

#### render function arguments

##### The object

```js
    export default {
        render (h) { // hyper script <= hyper text <= HTML
            return h('div', {
                    key: 123,
                    attrs: {id: 'foo'},
                    class: {foo: true, bar: this.isBar},
                    style: {color: 'red'}
                }, [
                this.foo
            ])
        }
    }
```

##### The children

```js
    import Component from './Component.vue'
    export default {
        render (h) { // hyper script <= hyper text <= HTML
            return h('div', {
                    key: 123,
                    attrs: {id: 'foo'},
                    class: {foo: true, bar: this.isBar},
                    style: {color: 'red'},
                    props: {}
                }, [
                '123',
                123,
                h('span', 'foo'),
                h('span', 'bar'),
                h(Component)
            ])
        }
    }
```

#### Exercise

Create a component that will return

    <div id="app">
        <div>
            <div>0</div>
            <span>1</span>
            <p>2</p>
        </div>
    </div>


**see**:
* (exercise-component.html)[exercise-component.html]
* (exercise-component-solution.html)[exercise-component-solution.html]

Use If and Elsif in component.

You can avoid using other component such as v-if, v-else, v-for.

Simply code it in your component.

#### v-model in render function

It's not usable directly but there is a way to do something equivalent.

**input**:

```js
    export default {
        render (h) { // hyper script <= hyper text <= HTML
            return h('input', {
                    domProps: {
                        value: this.foo
                    },
                    input(e) {
                        this.foo = e.taget.value
                    }
                }, [])
        }
    }
```

**!! input type attribute and property are 2 different things** so you need domProps to handle this properly

#### JSX

JSX is an extra layer on to p of Javascript.

They are Babel plugins on top of JSX, its like a language feature which is not part of the language.

In JSX you can use direct tags.

```vue
    export default {
        render (h) { // hyper script <= hyper text <= HTML
            return <div id={ this.someId } style="color: red">
                {this.tags.map((Tag, i) => <Tag>{i}</Tag>)}
            </div>
        }
    }
```

You can go from JSX to JS with a simple **{**
