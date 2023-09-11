---
title: 'Metroidvania Devlog 2: State Machine Player Controller'
date: '20/1/2023'
cover_image: 'images/posts/metroidvania/devlog2_cover.gif'
tags: ['metroidvania', 'devlog', 'Unity', 'Player Controller']
excerpt: 'In this post, we delve deep into the implementation of a Player Controller'
---

Being quite tired of dealing with networking and multiplayer, I decided to start implementing the actual game. So I set out in search of something to serve as a starting point, and I found this **amazing** tutorial by Bardent: [see the full playlist](https://youtube.com/playlist?list=PLy78FINcVmjA0zDBhLuLNL1Jo6xNMMq-W) (note that the relevant videos start at part 20). So, while the videos do an excellent job at explaining everything, I might as well explain it myself.

> **Disclaimer:** I'm not in any way trying to steal Bardent's content. Instead, I'm trying to explain how I started making the player controller.

## The state machine

All the geniality of this player controller comes from its core idea: a state machine. For those of you that don't know, I'll try my best to explain what a state machine is.

Think of a collection of data, and a way to perform an action acknowledging that data (quite similar to what a class is in OOP). That is a state. If you have a collection of different states, which transition between them, you have a state machine.

This particular system has five main components:

- the `Player` script, which has various functionalities
- the `PlayerStateMachine` script, which updates states, and deals with transitions
- the `PlayerState` abstract class, which serves as a base for other states
- the `InputHandler` script, which takes care of responding and managing input
- the `PlayerData` scriptable object, which holds various parameters used by the states.

### The `PlayerState` class

```cs showLineNumbers
public class PlayerState {
   protected Player player;
   protected PlayerStateMachine stateMachine;
   protected PlayerData playerData;

   protected bool isAnimationFinished;
   protected bool isExitingState;
   protected float startTime;
   protected string animBoolName;

   public PlayerState(Player player, PlayerStateMachine stateMachine, PlayerData playerData, string animBoolName) { }

   public virtual void Enter() { }
   public virtual void Exit() { }
   public virtual void LogicUpdate() { }
   public virtual void PhysicsUpdate() { };
   public virtual void DoChecks() { }
   public virtual void AnimationTrigger() { }
   public virtual void AnimationFinishTrigger() { }
}
```

For the sake of brevity, I omitted most of the implementations. However, looking at the script it's easy to see what it does. Lines 2-4 hold references to useful components; lines 6-9 hold state inner data; line 11 is a default constructor; lines 13-19 have various functions. `Enter()`, `LogicUpdate()`, `PhysicsUpdate()` and `Exit()` are 'lifecycle' functions, and their names are pretty self-explanatory. `DoChecks()` contains various checks that a state needs to do at some points in the code. `AnimationTrigger()` and `AnimationFinishTrigger()` are used to hook into animation events, which is needed for some states.

### The `PlayerStateMachine` component

This one is pretty simple: first, it's initialized with a default state. Then, it has only another function: `ChangeState()`, which calls `Exit()` on the current state, changes it to the new state, and then calls `Enter()` on it.

### The `Player` component

At the start of this post, I stated that Bardent's player controller was amazing (and it is), but if I had to choose something I don't like about it, it'd be the `Player` script. It's a mishmash of random functionality:

- it holds an exhaustive list of all the `PlayerState`'s, so that states can change to other states,
- it has functions to do common tasks like set the player's velocity,
- it has function to check certain conditions, like being grounded,
- and it has some more random functions.

However, it does work. Just not cleanly.

### The structure of the State Machine

&&&img[images/posts/metroidvania/SMD.png]
**Diagram of the state machine** Image by Bardent
&&&

The image is pretty obvious, but basically there is a set of states all hard-wired to transition to some other states (which I intend to change).

## Conclusion

All things considered, this player controller is very good, but there is some room for improvement. I intend to make this system more generalist, modular and overall cleaner. However, for the next post we'll take a detour from coding. Because, in the meanwhile, I've been writing some **lore**. So the next post will be about my creative process: how I come up with ideas, and how I perfect them. I hope I'll have you with me again! Goodbye 'til then.
