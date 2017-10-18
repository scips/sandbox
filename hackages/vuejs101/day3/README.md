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

Add in the test script ```--before setup.js```


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

