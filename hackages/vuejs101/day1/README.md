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

#### v-model

##### Check boxes

        <input v-model="checked" type="checkbox" />

    const vm = new Vue({
      el: '#app',
      data: {
        checked: true,

Mutliple check box can be binded to one model

##### Radio buttons

Must be have the same v-model and vue will consider them as the same radiobutton

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

## Excercie 1 (next)

### Add checkboxes

    <input v-model="newTodo" @keyup.enter="addNewTodo" />
    <ul>
        <li v-for="todo in todos" :class="{done: todo.done}" @click="toggle(todo)">
            <input type="checkbox" v-model="todo.done"> - {{ todo.text }}
        </li>
    </ul>



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

see https://github.com/vuejs/vue/tree/dev/examples/todomvc

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



### Security rules

Don't ever use component that you can't control/trust
