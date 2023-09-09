---
title: 'Metroidvania Devlog 5: State Machine Refactoring and Editor Tool'
date: '3/3/2023'
cover_image: 'images/posts/metroidvania/devlog5_cover.png'
tags: ['metroidvania', 'devlog', 'editor-tools']
excerpt: 'The state machine system has been refactored and has a fancy new editor'
---

In [this post](https://levimcgomes.github.io/blog/metroidvania_devlog4), I mentioned I was completely satisfied with the way the state machine system was working. And when you don't like something, you change it, if you can. And in programmer-land, you can always change your code. So I got to work changing the state machine system to something I find better and cleaner. I haven't yet implemented everything, but here's an outline:

1. `StateMachineComponent` is attached to a game object and assigned a `StateMachine` to work with
1. The `StateMachine` is started
1. Every frame, the `StateMachine` is ticked
   1. The current `State` is ticked. This is where the `State` acts and does something.
   1. The current state has a list of `Transitions` associated with it, its exit transitions.
   1. The `StateMachine` loops over every one of those transitions and calls its `DoTransition` method. This method returns a `bool` and a `State` (through an `out` parameter), where `true` means the transition should be done. All successful `Transitions` are collected, and then a `Transition` is selected to be completed by means of a priority index. After a `Transition` is selected, the `StateMachine` changes to its returned `State`. If no `Transition` is made the `StateMachine` just remains in the same `State`.
1. Every fixed frame, the `StateMachine` if fixed-ticked. This only fixed-ticks the current state, and doesn't process transitions.

Furthermore, every `State` and `Transition` has to its availability a set of data from different sources:

- each `StateMachine` asset has a `ScriptableObject` which holds global data.
- there's also a lot of runtime data from different sources which can be read, such as the player's data, user input or game state.

In my opinion, these reworks make this system much better and cleaner.

## The Editor

Of course, a StateMachine system needs a good graphical editor. And that's exactly what I made. Using the new UI Toolkit and the UI Builder, as well as experimental `GraphView` component, I crafted an editor to create and connect states and set the conditions on a `Transition`.

That's all I have to say for today. This was a shorter post, but making refactorings and an editor isn't much to write home about. I hope next time I can make something a bit longer. 'Til then, goodbye!
