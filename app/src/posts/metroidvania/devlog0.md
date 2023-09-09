---
title: 'Metroidvania Devlog 0: Introduction'
date: '24/12/2022'
cover_image: 'images/posts/metroidvania/devlog0_cover.png'
tags: ['metroidvania', 'devlog', 'Unity', 'multiplayer']
excerpt: 'The first in a series of devlogs about a metroidvania game'
---

As the title suggests, this is the first (the zero-th?) in a series of devlogs about a metroidvania game. In other words, I'm making a [metroidvania](https://en.wikipedia.org/wiki/Metroidvania), and I'm going to write about it, trying my best to explain how I'm making things happen the right way, so that, hopefully, you'll get some understanding of how I made this game. This post will serve as an introduction, telling you many random things that are probably nice to know. So, without further ado, let's see what this is all about.

> **Disclaimer:** Although I claim this is a programming blog, you're not very likely to see code in my devlogs, at least for this game. The reason for that is that this game is closed-source. I'll describe how I did _things_, but implementing those _things_ is left as an exercise for the reader.

## What tools am I using?

When making a game, one seldom makes everything from scratch (and one who actually does would be much more skilled than myself). That said, what am I using to help me make this game then? The truth is that I don't know yet all I'm going to use. But I do know some things, so I'll talk about those.

### Unity

[Unity](https://unity.com/) is a versatile, simple to use and powerful game engine. It's what I've been using since the start (which isn't that much time - a measly one and a half years), and it's what I know and feel comfortable using. It's also better for 2D games than most other engines, which is a big plus. Don't be fooled for all that praising, however, for even though very good, it has still a lot of quirks and unattractive aspects. So, all things considered, it is a good choice, but can sometimes be a massive headache.

### Mirror

[Mirror](https://mirror-networking.com/) is a networking solution for Unity. Simple, but insanely good. It's what I'll be using for dealing with all things networking (well, almost all).

### Discord GameSDK

Yes, [that's a thing](https://discord.com/developers/docs/game-sdk/sdk-starter-guide). Because who wants to create yet another account just to play a game with their friends? And who wants to manage those accounts? Who wants to handle their own lobbies and peer to peer connections? No one. That's why Discord offers a GameSDK which (get ready):

- manages achievements
- integrates with Discord Rich Presence (Activities)
- integrates with Discord voice chat
- retrieves Discord avatars
- manages lobbies
- does networking
- retrieves friends
- manages file storage
- manages IAP
- retrieves user data
- and much more...

Very wholesome if you ask me.

### Visual Studio

Visual Studio is my IDE of choice. Not much to say here, probably this isn't even relevant, but it's here anyway.

###

And that's about it for now. However, I didn't decide for these tools, particularly the ones related to networking, at first try. So, keep your eyes peeled for the next post, where I'll talk about all the options I considered for the networking solution.

## What is this game?

A cooperative multiplayer metroidvania. That's a bit of a short description, but it's all I'll say. If you want to know more, you'll have to play the game. I'm not here to tell you the whole story of the game.

## What about art?

In case you didn't understand from the tools section, I'm a programmer. I'm not an artist. That's why I'm not alone. I'm working with two other guys to make this game: an artist, and a... gameplay/storytelling designer? That's the best description I can come up with. Basically he just listens to my ideas and contributes with some more ideas.

## Conclusion

This would probably be the part where I ask you to subscribe to my newsletter to stay up to date with this blog, but I don't have one. So, I hope you enjoyed reading this, hopefully enough to come back for more, and I guess I'll see you on the next post. Or maybe talk to you. I'm not really seeing you, am I? Until then, have a merry Christmas!
