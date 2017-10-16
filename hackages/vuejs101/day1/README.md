# Hackages 101

Wifi: S14-Hackages / H-102017

    npm install -g http-server
    http-server -p 8080 hackages/

## The way vue works

Vue is essentially doing a: **whenDataChanges** => doStuff

You don't have a good way to divide the work until you have a framework that allows you to split the work in small component.

You need a clear interface between the components to split the work and share the work. As long as the public API (Interface) stay consistant.

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


#### v-if

Completely remove the element.
If it's used once, it's better to use v-if (especially when it's not supposed to be there).

#### v-show

Hide the component (css). Use it if the content is toggle very often. It only works with real DOM element (not template...)

#### v-for

you can use either **in** or **of** and it does a for around them and reproduce the current item

### Security rules

Don't ever use component that you can't control/trust
