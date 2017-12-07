# Hackages - VueJS 101 - day 1

by Evan You - @youyuxi

Wifi: S14-Hackages / H-102017

    npm install -g http-server
    http-server -p 8080 hackages/

## The way Vue works

Vue is essentially doing a: **whenDataChanges** => doStuff

You don't have a good way to divide the work until you have a framework that allows you to split the work in small component.

You need a clear interface between the components to split the work and share the work. As long as the public API (Interface) stay consistent.

### Vue use: Virtual dom

* It will use a virtual dom and a copy of the virtual dom then compare both (previous and actual) and determine what to do on the diff between the 2.
* Why using virtual dom? To reduce the way we touch the dom, because dom is slow. And going through a tree of items is really fast. It also guarantee that we only change the DOM that have change and not everything

### Vue intercept mutable methods

In arrays it intercept push, pull, splice, reverse, sort ...

In arrays it doesn't intercept immutable methods such as concat

**see**:
* [Mutation-Methods Doc] (https://vuejs.org/v2/guide/list.html#Mutation-Methods)

### Bindings

#### Mustache templating system

{% raw %}
```vue
    {{ }} // is the mustache template system
```
{% endraw %}

inside there is a javascript expression => expression are evaluated to get a value. It is not a statement.

**Those are expression**

{% raw %}
```vue
    {{ message }}

    {{ message.split('').reverse().join('') }}
```
{% endraw %}

**This is not an expression**

{% raw %}
```vue
    {{ if (foo) {} }}
```
{% endraw %}

So how to do conditional? Simply use ternary operator

{% raw %}
```vue
    {{ ok ? 'true':'false' }}
```
{% endraw %}

### v-*

Any attribute that start with **v-** is a javascript expression

#### v-html

**v-html** is dangerous, use it only on things you can trust

{% raw %}
```vue
    <div v-html="someHTML + 'foo'"></div>
```
{% endraw %}

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

Use the **:key** to ensure that the whole dom element will be moved and not just the text inside. This can be useful for input fields with focus for instance. The focus will be kept after the sort.

A good idea is to use an object with unique ids.

**key** are used to identify different element in the differentiation process (while going through the tree). **Key** is especially used for element identification.

#### Event handling v-on / @

Need to be linked with a method defined in **methods** section.

```vue
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
```

**@** is the shortcut for v-on

```vue
    <button v-on:click="rev">Reverse Message</button>
    <button @click="rev">Reverse Message</button>
```

### Exercise 1-1

#### TODO List

1. Use v-for
2. Each class should have a different visual status :class
3. If you click on it it should toggle

Basic app

```vue
    const vm = new Vue({
      el: '#app',
      data: {
        todos: [
            {text: 'Learn Javascript', done: true},
            {text: 'Learn Vue', done: false},
        ],
    ...
```

Once it's done

4. Use an input to add todos

```vue
    <input @input="add" />
```

**see**:
* [Exercise 1-1 online](https://scips.github.io/sandbox/hackages/vuejs101/day1/exercise1-1.html)
* [Exercise 1-1 complete code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/exercise1-1.html)


by default if no args are passed to the method the native event object is passed as argument

```vue
    <input :value='todo' @input="add" />
```

and in Vue that can be replaced by

```vue
    <input v-model="newTodo" />
```

v-model is just a sugar that do binding + data modification handling

You will get a warning because it's not declared.

If it's not declared that make things confusing, need a source of truth in one place and it should be in javascript not in the template.

So we need to declare it in the Vue app

```vue
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
```

#### Some note on v-model and inputs

##### Check boxes

```vue
        <input v-model="checked" type="checkbox" />

    const vm = new Vue({
      el: '#app',
      data: {
        checked: true,
```

Multiple check box can be binded to one model

##### Radio buttons

Must be have the same v-model and Vue will consider them as the same radio button

{% raw %}
```vue
        <input v-model="radio" value="one" type="radio" />
        <input v-model="radio" value="two" type="radio" />
        <input v-model="radio" value="three" type="radio" />
        {{ radio }}

    const vm = new Vue({
      el: '#app',
      data: {
        checked: true,
        radio: 'three'
        ...
```
{% endraw %}

##### Select

```vue
            <select v-model="formMultiselect" multiple="true">
                <option>one</option>
                <option>two</option>
                <option>three</option>
            </select>
```

see []()
* [Form online](https://scips.github.io/sandbox/hackages/vuejs101/day1/radio-check-select.html)
* [Form code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/radio-check-select.html)

## Exercise 1-2

### Add checkboxes

{% raw %}
```vue
    <input v-model="newTodo" @keyup.enter="addNewTodo" />
    <ul>
        <li v-for="todo in todos" :class="{done: todo.done}" @click="toggle(todo)">
            <input type="checkbox" v-model="todo.done"> - {{ todo.text }}
        </li>
    </ul>
```
{% endraw %}

```vue
      el: '#app',
      data: {
        todos: [
            {text: 'Learn Javascript', done: true},
            {text: 'Learn Vue', done: false},
        ],
        newTodo: ''
      },
      methods: {
        toggle(todo) {
            todo.done = !todo.done;
        },
        addNewTodo(){
            if (this.newTodo) {
                this.todos.push({text: this.newTodo, done: false});
                this.newTodo=''
            }
        }
      }
```

**see**:
* [Exercise 1-2 online](https://scips.github.io/sandbox/hackages/vuejs101/day1/exercise1-2.html)
* [Exercise 1-2 complete code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/exercise1-2.html)

see [TodoMVC](https://github.com/vuejs/vue/tree/dev/examples/todomvc)

### Modifiers

#### @keydown.prevent

prohibit keydown on the element

#### @click.stop

prohibit the click propagation

#### @click.self

prohibit click from sons elements to interfere with click in the father element

#### @keyup.enter, (tab, space, 13, 31, arrow-left)

Key modifier that only handle 'Enter', (tab, space, enter, 'a', <-)

#### @keyup.shift.ctrl.enter="CtrlShiftEnterPressed"

You can chain modifier with special modifier

#### @keyup.shift.exact="ShiftPressed"

You can use exact to handle specific key press on special modifier

##### Use the decorator pattern to enhance keypress

```vue
    function customCheck(fn){
        return function() {
            if(...) {
                return;
            }
            fn()
        }
    }
```

then

```vue
     const vm = new Vue({
        data: {
        },
        methods: {
            @customCheck () => {console.log('test')}
        }
        })
```

### Computed

Computed data are just functions that use data and are computed every time the data linked to it has changed.

What if someone use Date.now() inside computed properties.

For instance:

```vue
    computed: {
        myMessage () {
            return this.message + Date.now()
        }
    }
```

You need to make the time a dependency

```vue
    data: {
        now: Date.now()
    },
    computed: {
        myMessage () {
            return this.message + this.now
        }
    }
```

#### computed get, set

Watchout using get / set in computed stuff you must keep consistency because you will modify some data.

```vue
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
```

### Watch

Most of the time, you don't need watch

#### When to use watch?

When you need to compare old and new value specifically

In things that cannot be incorporated in the Vue component: API, Canvas paint, ... anything that has side effects

```vue
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
```

If you want to watch an array you need to change the array by overwriting it.

```vue
    vm.arr.push(4) // will simply mutate the object
    vm.arr = vm.arr.concat(5) // will work because the newValue and oldValue are referring to different references
```

## Components

To create a **Component** **Class** simply extend Vue

```vue
    var Component = Vue.extend(options)
```

You need to register your component globally

Don't declare a **data** section in Vue component because the data will be shared across all component of the same class.

```vue
    Vue.component('my-component', {
        template: `<div>{{ msg }}</div>`,
        data: {
            msg : 'foo'
        }
    })
```

You need to use the **data: () =>** or the shorter version **data () {}** to create a fresh copy of data for every new instance.

### Communication between parent and component

#### Using props

**props** are property of the component, it is a custom attribute

```vue
    <div id="el">
        <todo v-bind:todo="{ text: 'hello'}"></todo>
    </div>
```

```vue
    Vue.component('todo', {
        template: `<div>{{ todo.text }}</div>`,
        props: ['todo']
    })
```

Will handle the todo property from attribute

##### camelCase vs. kebab-case

HTML attributes are case-insensitive, so when using non-string templates, camelCased prop names need to use their kebab-case (hyphen-delimited) equivalents:

```vue
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>

Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```

Again, if you’re using string templates, then this limitation does not apply.

##### Specific type check

```vue
    Vue.component('todo', {
        template: `<div>{{ todo.text }}</div>`,
        props: {
            todo: Object
        }
    })
```

Now it will check for an object

##### Even more specific checking + default values

```vue
    <div id="el">
        <todo v-bind:todo="{ text: 'hello'}"></todo>
        <todo></todo>
        <todo></todo>
    </div>
```

{% raw %}
```vue
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
```
{% endraw %}

default must be a function otherwise all occurrence will share the same object reference

##### Validators

You can create complex validator by simply specifying the validator in the props

```vue
    <div id="el">
        <todo v-bind:todo="{ text: 'hello'}"></todo>
        <todo v-bind:todo="{ }"></todo>
        <todo></todo>
    </div>
```

{% raw %}
```vue
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
```
{% endraw %}

You will have an error for the second component because this is an object but not the right type (in this case must have text property with length > 0)

#### Real app with component

Logic that mutate the variable of an app must stay in the app logic

```vue
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
```

Here the application set the data and change the data state, the logic stays in the application (toggleTodo) it's a good practice to avoid deep component issue.

Instead we will use custom event name "toggle". The event is triggered in the component with `$emit(eventName)` and listened with `:eventName` in the template.

```vue
        <todo :class="todo.done?`done`:``" v-for="todo in todos" v-bind:todo="todo" @toggle="toggleTodo(todo)"></todo>
```
{% raw %}
```vue
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
```
{% endraw %}

#### Adding keys

It's important to add keys. If we manually reverse the todos order some property may not match anymore.

**see**:
* [Live example without key](https://scips.github.io/sandbox/hackages/vuejs101/day1/component-without-key.html)


There is a warning in the console that tells us that we need to use key.

For instance:

```vue
    <div id="el">
        <todo :class="todo.done?`done`:``" v-for="todo in todos" v-bind:todo="todo" @toggle="toggleTodo(todo)"></todo>
    </div>
```

{% raw %}
```vue
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
```
{% endraw %}

Click first item, you will see "true"
In console type:

```vue
        vm.todos.reverse()
```

The `isEditing` is linked to the item but the item change without **key** so the state is not maintained and linked.
So it's good practice to add an *id* for instance to items and link **key** attribute to that *id*

**see:**
* [Live example with key](https://scips.github.io/sandbox/hackages/vuejs101/day1/component-with-key.html)

### Hooks and vue components lifecycle

![VuesJS lifecycle](https://vuejs.org/images/lifecycle.png)

Most useful hooks are: **created**, **mounted**, **updated**, **destroyed**.

Other are for very advanced usage.

#### beforeCreate

#### created

Very useful for data and stage manipulation, or to start timers.

#### beforeMount

Not really useful, but included because there is a counterpart in other hooks

#### mounted

When you need to have low level DOM access and want to take some DOM actions

#### beforeUpdate

#### updated

Associated to DOM update

When you need to do some DOM manipulation (for instance re-mesure the size of the element)

#### beforeDestroy

A component will first destroy his child component before destroy himslef

#### destroyed

Cleaning what you component created outside his own scope.
Could be used to clean a timer (setInterval, ...).

### Sync modifier

[Two way example](two-way.html)

If you want to change some value you can write something like that

{% raw %}
```vue
    <div id="el">
        {{ msg }}
        <child :foo="foo"></child>
    </div>
```

```vue
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
```
{% endraw %}

This will break at first click, you cannot change the value `foo` like this

Instead use the **.sync** modifier and emit an update

[Two way example](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/two-way-sync.html)

Good practice is to use the **.sync** shortener and in general emit event

Here below the two version of the same thing

{% raw %}
```vue
    <div id="el">
        {{ msg }}
        <child :foo.sync="msg1"></child>
        <child :foo="msg2" @update:foo="val => msg2 = val"></comp>
    </div>
```

```vue
    Vue.component('child', {
        props: ['foo'],
        template: `<div @click="$emit('update:foo','bar')">{{ foo }}</div>`
    })
    var vm = new Vue({
        el: '#el',
        data: {
            msg: 'hello',
            msg1: 'some message',
            msg2: 'some other message'
        },
    })
```
{% endraw %}

### Exercise 2: TODO + component

[start with todo component html](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/todo-component.html)

**Challenge**:
* turn each todo into a component
* remember the props down, up events pattern
* Bonus: double click edit todo in pace
    - hint: use v-if to toggle plaintext -> input box
    - on enter, emit an event to let parent update todo with new value

**see**:
* [Exercise 2](https://scips.github.io/sandbox/hackages/vuejs101/day1/exercise2-1.html)
* [Exercise 2 code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/exercise2-1.html)
* [Solution Exercise 2](https://scips.github.io/sandbox/hackages/vuejs101/day1/exercise2-2.html)
* [Solution Exercise 2 code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/exercise2-2.html)
* [Solution Exercise 2 even better](https://scips.github.io/sandbox/hackages/vuejs101/day1/exercise2-3.html)
* [Solution Exercise 2 even better code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/exercise2-3.html)

#### The component contract

        <todo-item
            v-for="todo in filteredTodos"
            :class="{ done: todo.done }"
            :todo="todo"
            :key="todo.id"
            @toggle="toggleTodo"
            @edit="editTodo"></todo-item>

todo-item must have:

* a toggle method
* an edit method
* a todo item with a key

It's clear that designing a nice contract to a component allow the component to be:
* re-usable
* made by someone else
* documented
* automatically tested

### Input Components

Create a common set of component that can works with v-model.

V-model by default works only on native input element.

But you can create your own input element and make it works with v-model.

**See:**
* [Own form component code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/form-component.html)
* [Own form component in action](https://scips.github.io/sandbox/hackages/vuejs101/day1/form-component.html)

### Slots

Useful to combine and append element together then render them in specific section.

**see**:
* [Slots Placeholder](https://scips.github.io/sandbox/hackages/vuejs101/day1/slots-place-holder.html)
* [Slots Placeholder code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/slots-place-holder.html)

Also slots have access to parent and to their own scope.

**see**:
* [Slots Data Access](https://scips.github.io/sandbox/hackages/vuejs101/day1/slots-data-access.html)
* [Slots Data Access code](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/slots-data-access.html)

Usage: Calendar picker or list&lt;component&gt;. It allows to inject arbitrary DOM content in the component.

### Exercise 3: Bonus

Create a select component and expose it as a v-model interface

[bonus-vmodel-interface.html](https://github.com/scips/sandbox/blob/v1.0/hackages/vuejs101/day1/bonus-vmodel-interface.html)

## Security Remarks

Don't ever use component that you can't control/trust
