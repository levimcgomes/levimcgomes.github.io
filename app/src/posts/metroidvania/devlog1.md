---
title: 'Metroidvania Devlog 1: Networking Solutions'
date: '6/1/2023'
cover_image: 'images/posts/metroidvania/devlog1_cover.png'
tags: ['metroidvania', 'devlog', 'Unity', 'multiplayer']
excerpt: "As I mentioned in the last post, choosing the networking solution was quite a arduous task. So let's take a look at all the options I considered."
---

As I mentioned in the last post, choosing the networking solution was quite an arduous task. So let's take a look at all the options I considered.

### Steam

Steam seems like the obvious one. I mean, who doesn't play Steam games, am I right? They provide the Steamworks SDK, which smoothly deals with networking so you don't have to. However, there's a massive catch. It only works if you publish your game on Steam, and Steam only. "Alright, not that big of a deal, just publish on Steam" is what one might na&#239;vely say. Why na&#239;vely? Did you know that they charge 100$ to publish a game? Yes, you read that right. Yes, it's way too much. Yes, people do publish games on Steam anyway. And no, I don't have 100$ to spend, Steam. So that one's off the table.

### Netcode for GameObjects

The next idea that crossed my mind was to try whatever Unity offered for multiplayer. Turns out, they have Netcode for GameObjects (NGO), a high level multiplayer solution made just for GameObjects. It seemed pretty good, so I watched some [tutorials](https://www.youtube.com/playlist?list=PLQMQNmwN3FvyyeI1-bDcBPmZiSaDMbFTi) (this playlist by Dilmer Valecillos is really good), but soon I realized something: NATs and routers are a thing. And, from a game programmer's perspective, they serve the single purpose of making things hard (but only from a game programmer's perspective - those things are very important). Don't worry, I thought, I'm sure Unity can do NAT punchthrough. It can't. Don't worry, I'm sure someone has made something to do NAT punchthrough in NGO. No one did. This means I�d need relays, but those things are paid (mostly). So, I started digging around.

### Epic Online Services

In my seemingly endless search I stumbled upon Epic Online Services (EOS). A free-to-use engine and shop agnostic networking layer with all the modern commodities such as:

- authentication (Epic Account Services)
- lobbies
- free relays

All this based on the infrastructure they used for Fortnite. It sounds almost too good to be true. Well, it was, in its own way. I couldn't even get their samples to work (which was probably my bad, but if I'm not skilled enough to make a sample work I'm not skilled enough to use it), and integrating it with Unity looked like it was going to be a lot of work. Another one bites the dust.

### Mirror

Finally, I found [Mirror](https://mirror-networking.gitbook.io/docs/). I could start to see the light at the end of the tunnel. Mirror provides a high-level API integrating directly with Unity, based off Unity's UNet. And let me tell you, Mirror is straight up amazing. It uses a lower-level system, Transports, to actually handle network connections and messaging. And Transports are fully modular, so I just needed to find the right transport for my needs, and I'd be all set. So, how hard could be finding a transport be? Mirror's [documentation page](https://mirror-networking.gitbook.io/docs/transports) about transports says the following:

- **Built-in Transports - These transports are included with Mirror.**
  - **KCP** - UDP transport based on kcp.c, line-by-line translation to C#
  - **Telepathy** - Simple, message based, MMO Scale TCP networking in C#. And no magic.
  - **Simple Web Sockets** - WebGL transport layer for Mirror that target browser clients.
  - **Multiplexer** - Bridging transport to allow a server to handle clients on different transports concurrently, for example desktop clients using Telepathy together with WebGL clients using Websockets.
  - **Latency Simulation** - Middleman transport to test non-ideal network conditions
- **Additional Transports - These transports are maintained by third parties outside of Mirror.**
  - **Monke** - plug and play encrypted middleman transport layer for mirror.
  - **Ignorance** - reliable and unreliable sequenced UDP transport based on ENet.
  - **LiteNetLibTransport** - UDP transport based on LiteNetLib.
- **Relay Transports** - These transports are maintained by third parties and use relay infrastructure to connect clients to servers behind firewalls / NAT.
  - **Steam - FizzySteamworks** - Transport utilizing Steam P2P network, building on Steamworks.NET.
  - **Steam - FizzyFacepunch** - Transport utilizing Steam P2P network, building on Facepunch.Steamworks.
  - **Epic** - Epic Online Services - Relay transport utilizing Epic's free relay service.
  - **LRM** - Light Reflective Mirror - Relay transport for WebGL clients.
  - **OculusP2P** - Oculus Platform - Relay Transport for Oculus Quest 1 & 2.

The 'Relay Transports' section should have plenty to pick from. However, it has two Steam transports, one Epic transport, one transport for WebGL and one for Oculus Quest. Nothing good for me.

### Discord GameSDK

I honestly thought this was it. Discord GameSDK is (as of now) a very good tool. It manages accounts for me, creates lobbies and connects players to them. And integrating it with Mirror was certainly possible. It had been done. Although [DiscordMirror](https://github.com/Derek-R-S/Discord-Mirror) was outdated and didn't work in the best of ways, it was a proof of concept. So I got working, trying to make a transport for Mirror using Discord GameSDK. That was when I read this message on Discord GameSDK's official Discord server:
&&&img[images/posts/metroidvania/DiscordGameSDK_feature_remmoval.png]
The message.
&&&
They are removing more than half of the SDK's features in five months. I truly don't know how they think this is a good idea, but it means I can't use it.

### Back to the future... I mean, to EOS

After getting very mad at Discord, for what they did, I figured I'd better find something else. So I gave EOS another chance. There's a transport made for it already, so it won't be nearly as hard. It has a whole new cast of problems, but I can (hopefully) figure it out. For instance, authentication is quite the headache. That's to say, I'm not over with networking yet, which means you'll be seeing more posts about it, but after all this I needed a break.

###

The next post was going to be about how I made a transport using Discord GameSDK, but that'd be useless now. The next post will instead be about **the actual game**! You never thought you'd see this day coming, did you? Next time we'll delve deep into the workings of the character controller, so I hope you'll be here to read it. Until then, stay well and goodbye!
