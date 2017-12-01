# Marketplace



## flux

by stefan van den oord

State has to be modified and is used by the views

    State (a dictionnary) --> Views

The view code becomes extremly simple, you can have binding to couple the view with State change

At some point an action in the view that will somehow change the state but not directly, only through a Reducer (comes form functional programming)


    Views --> Reducer --> New State
    State -->

The reducer take the old version of the state, change it and return a new version of the state

Reducer is extremly simple

```
reducer (action, state) -> state
    switch(action):
        case create-user:
            newstate = state.clone()
            return newstate.users.push(action.newuser)
```

It's easy for unit test

The application has only one reducer but you can split the logic if the state is complex to sub-reducer

### Benefits

* Local reasoning
* Simple
* Natural structure with sub-reducer grouped by funtionnality (seems better than MVC)

### See

* redux.js

## Bowling Kata

by Olivier

Time window: 60' - 90'

Pair with someone

Description

Goal

Basic test case

GO!

From Robert C. Martin bowling-game-kata-c

https://ronjeffries.com/xprog/articles/acsbowling/

https://github.com/hontas/bowling-game-kata



