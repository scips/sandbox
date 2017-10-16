# Hackages 101

Wifi: S14-Hackages / H-102017

    npm install -g http-server
    http-server -p 8080 hackages/

## The way vue works

Vue is essentially doing a: **whenDataChanges** => doStuff

You don't have a good way to divide the work until you have a framework that allows you to split the work in small component.

You need a clear interface between the components to split the work and share the work. As long as the public API (Interface) stay consistant.

### Vue use: Virtual dom

* It will use a virtual dom and a copy of the virtual dom then compare both (previous and actual) and determine what to do on the diff between the 2.
* Why using virtual dom? To reduce the way we touch the dom, because dom is slow. And going through a tree of items is really fast. It also garantee that we only change the DOM that have change and not everything

### Vue intercept mutable methods

In arrays it intercept push, pull, splice, reverse, sort ...

In arrays it doesn't intercept immutable methods such as concat

### Bindings

#### Mustache templating system

    {{ }} // is the mustache template system

inside there is a javascript expression => expression are evaluated to get a value. It is not a statement.

**Those are expression**

    {{ message }}

    {{ message.split('').reverse().join('') }}

**This is not an expression**

    {{ if (foo) {} }}

So how to do conditional?

    {{ ok ? 'true':'false' }}

### v-*

Any attrivute that start with **v-** is a javscript expression

#### v-html

**v-html** is dangerous, use it only on things you can trust

    <div v-html="someHTML + 'foo'"></div>

#### v-pre

Is not rendered on purpose

#### v-bind (or simply ':')

**v-bind:id** or **:id**: bind dynamically html attribute to data. In this case this is the id attribute of the html dom element.

You can bind a lot of things: **class**, **style**

**:** is the shortcut of v-bind

#### template

The template block is an abstract component treated as a block
They only exist in the virtual dom. v-show has no effect on virtual dom element.


#### v-if / v-else

Completely remove the element.
If it's used once, it's better to use v-if (especially when it's not supposed to be there).

#### v-show

Hide the component (css). Use it if the content is toggle very often. It only works with real DOM element (not template...)

#### v-for

you can use either **in** or **of** and it does a for around them and reproduce the current item.

#### change in the data -> update the dom

When data change by default only values are modified

Use the **:key** to ensure that the whole dom element will be moved and not just the text inside. This can be usefull for input fields with focus for instance. The focus will be kept after the sort.

A good idea is to use an object with unique ids.

**key** are used to identify different element in the differenciation process (while going through the tree). **Key** is especially used for element identification.

#### Event handling v-on / @

Need to be linked with a method defined in **methods** section.

    const vm = new Vue({
      el: '#app',
      data: {
        message: 'Hello'
      },
      methods: {
        rev() {
            this.message = this.message.split('').reverse().join('')
        }
      }
    }).$mount("#app")

**@** is the shortcut for v-on

    <button v-on:click="rev">Reverse Message</button>
    <button @click="rev">Reverse Message</button>

## Execrice 1

### TODO List

1. use v-for
2. Each class should have a different visual status :class
3. If you click on it it should toggle

Basic app

    const vm = new Vue({
      el: '#app',
      data: {
        todos: [
            {text: 'Learn Javascript', done: true},
            {text: 'Learn Vue', done: false},
        ],
    ...


Once it's done

4. Use an input to add todos

    <input @input="add" />

by default if no args are passed to the method the native event object is passed as argument

    <input :value='todo' @input="add" />

and in vue



Than can be replaced by

    <input v-model="newTodo" />

v-model is just a sugar that do binding + data modification handling

You will get a warning because it's not declared.

If it's not declared that make things confusing, need a source of truth in one place and it should be in javascript not in the template.

So we need to delcare it in the vue app

    const vm = new Vue({
      el: '#app',
      data: {
        todos: [
            {text: 'Learn Javascript', done: true},
            {text: 'Learn Vue', done: false},
        ],
        newTodo: ''
      },
      methods: {



### Modifiers

#### @keydown.prevent

prohibit keydown on the element

#### @click.stop

prohibit the click propagation

#### @click.self

prohibit click from sons element to interfer with click in the father element

#### @keyup.enter, (tab, space, 13, 31, arrow-left)

Key modifier that only hanlde 'Enter', (tab, space, enter, 'a', <-)

#### @keyup.shift.ctrl.enter="CtrlShiftEnterPressed"

You can chain modifier with special modifier

#### @keyup.shift.exact="ShiftPressed"

You can use excat to handle specifict key press on special modifier

### Use the decorator pattern to enhance keypress

    function customCheck(fn){
        return function() {
            if(...) {
                return;
            }
            fn()
        }
    }

then

     const vm = new Vue({
        data: {

        },
        methods: {
            @customCheck () => {console.log('test')}
        }
        })

### Computed

Computed data are just function that use data and are computed everytime the data linked to it has changed.

What if someone use Date.now() inside computed properties.

For instance:

    computed: {
        myMessage () {
            return this.message + Date.now()
        }
    }

You need to make the time a dependency

    data: {
        now: Date.now()
    },
    computed: {
        myMessage () {
            return this.message + this.now
        }
    }

#### computed get, set

Watchout using get / set in computed stuff you must keep consistency because you will modify some data.

    computed: {
        myMessage: {
            get () {
                return this.message + 1
            },
            set (val) {
                this.msg = val - 1
            }
        }
    }

### Watch

Most of the time, you don't need watch

#### When to use watch?

When you need to compare old and new value specifically

In things that cannot be incorporated in the vue component: API, Canvas paint, ... anything that has side effects

    data: {
        msg: '',
        arr: [1, 2, 3]
    },
    watch: {
        msg (newValue, oldValue) {
            // side effects
            // sending api request to the server
            // drawing to canvas
        },
        arr (newValue, oldValue) {
            // is using reference so it's pointing to the same value
        }
    }

If you want to watch an array you need to change the array by overwriting it.

    vm.arr.push(4) // will simply mutate the object
    vm.arr = vm.arr.concat(5) // will work because the newValue and oldValue are refering to different references

## Components

To create a **Component** **Class** simply extend Vue

    var Component = Vue.extend(options)

You need to register your component globally

Don't declare a **data** section in vue component because the data will be shared accross all component of the same class.

    Vue.component('my-component', {
        template: `<div>{{ msg }}</div>`,
        data: {
            msg : 'foo'
        }
    })

You need to use the **data: () =>** or the shorter version **data () {}** to reate a fresh copy of data for every new instance.

### Communication between parent and component

#### Using props

**props** are property of the component, it is a custom attribute

    <div id="el">
        <todo v-bind:todo="{ text: 'hello'}"></todo>
    </div>

    Vue.component('todo', {
        template: `<div>{{ todo.text }}</div>`,
        props: ['todo']
    })

Will handle the todo property from attribute

##### Specific type check

    Vue.component('todo', {
        template: `<div>{{ todo.text }}</div>`,
        props: {
            todo: Object
        }
    })

Now it will check for an object

##### Even more specific checking + default values

    <div id="el">
        <todo v-bind:todo="{ text: 'hello'}"></todo>
        <todo></todo>
        <todo></todo>
    </div>

    Vue.component('todo', {
        template: `<div>{{ todo.text }}</div>`,
        props: {
            todo: {
                type: Object,
                required: true,
                default: () => ({ text: 'foo '+Math.random()})
            }
        }
    })

default must be a function otherwise all occurence will share the same object reference

##### Validators

You can create complex validator by simply specifying the validator in the props

    <div id="el">
        <todo v-bind:todo="{ text: 'hello'}"></todo>
        <todo v-bind:todo="{ }"></todo>
        <todo></todo>
    </div>

    Vue.component('todo', {
        template: `<div>{{ todo.text }}</div>`,
        props: {
            todo: {
                validator (value) {
                    const result = typeof value === 'object'
                        && typeof value.text === 'string'
                        && value.text.length > 0
                    if (!result) {
                        console.error("Bad props value for todo")
                    }
                },
                type: Object,
                required: true,
                default: () => ({ text: 'foo '+Math.random()})
            }
        }
    })

You will have an error for the second component because this is an object but not the right type (in this case must have text property with length > 0)

#### Real app with component

Logic that mutate the variable of an app must stay in the app logic

    new Vue({
        el: '#el',
        data: {
            todos: [
                {text: 'hello', done: true},
                {text: 'bye', done: false},
            ]
        },
        methods: {
            toggleTodo (todo) {
                todo.done = !todo.done
            }
        }
    })

here the application set the data and change the data state, the logic stays in the application (toggleTodo) it's a good pratcice to avoid deep component issue.

Instead we will use custome event "toggle".

        <todo :class="todo.done?`done`:``" v-for="todo in todos" v-bind:todo="todo" @toggle="toggleTodo(todo)"></todo>

        Vue.component('todo', {
        template: `
        <div @click="$emit('toggle')">
            {{ todo.text }}
        </div>`,
        props: {
            todo: {
                type: Object,
                required: true,
                default: () => ({ text: 'foo '+Math.random(), done: false})
            }
        }
    })

    new Vue({
        el: '#el',
        data: {
            todos: [
                {text: 'hello', done: true},
                {text: 'bye', done: false},
            ]
        },
        methods: {
            toggleTodo (todo) {
                todo.done = !todo.done
            }
        }
    })

#### Adding keys

Important to add keys. If we manually reverse the todos order some property may not match anymore.

There is a warning in the console that tells us that we need to use key.

For instance:

    <div id="el">
        <todo :class="todo.done?`done`:``" v-for="todo in todos" v-bind:todo="todo" @toggle="toggleTodo(todo)"></todo>
    </div>

    Vue.component('todo', {
        template: `
        <div @click="isEditing = !isEditing">
            {{ todo.text }} / {{ isEditing }}
        </div>`,
        props: {
            todo: {
                type: Object,
                required: true,
                default: () => ({ text: 'foo '+Math.random(), done: false})
            }i
        },
        data () {
            return {
                isEditing: false
            }
        }
    })


Click first item, you will see "true"
In console type:

        vm.todos.reverse()

The isEditing is linked to the item but the item change without **key** so the state is not maintained and linked.
So it's good practice to add it to items and link **key** attribute to that *id*

#### Hooks and vue components lifecycle

![VuesJS lifecycle](https://vuejs.org/images/lifecycle.png)

Most usefull hooks are: **created**, **mounted**, **updated**, **destroyed**.

Other are for very advanced usage.

##### beforeCreate

##### created

Very usefull for data and stage manipulation, or to start timers.

##### beforeMount

Not really usefull, but included because there is a counterpart in other hooks

##### mounted

When you need to have low level DOM access and want to take some DOM actions

##### beforeUpdate

##### updated

Associated to DOM update

When you need to do some DOM manipulation (for instance re-mesure the size of the element)

##### beforeDestroy

A component will first destroy his child component before destroy himslef

##### destroyed

Cleaning what you component created outside his own scope.
could be used to clean a timer (setInterval, ...).

#### Sync modifier

If you want to change some value you can write something like that

    <div id="el">
        {{ msg }}
        <child :foo="foo"></child>
    </div>

    // Register the component globaly
    Vue.component('child', {
        props: ['foo'],
        template: '<div @click="foo = 123">{{ foo }}</div>'
    })
    var vm = new Vue({
        el: '#el',
        data: {
            msg: 'hello',
            foo: 'some message'
        }
    })

This will break at first click, you cannot change the value foo like this



### Security rules

Don't ever use component that you can't control/trust
