<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>How I Made A Game</title>
</svelte:head>

<h1 class="no-underline text-center text-5xl my-6">How I Made A Game</h1>
<h2>Recent Posts</h2>
<PostList postList={data.posts} />
<div class="text-center my-2"><a href="/archive" class="btn text-2xl py-2 px-4">See All</a></div>
<h2 id="about">About</h2>
<p>
	So, what's this all <em>about</em>? It's about how I made a game. Sometimes. Really, it's about
	whatever I feel like writing. Most of the time, it will be about making games, but everything is
	fair game for me. I'll try to post every other week, but due to other responsiblities (aka.
	school), I might be unable to fullfil a schedule. If you'd like to contact me for some reason
	(preferably related to this blog), you can find me on
	<a href="https://discordapp.com/users/924653755763396639">Discord</a>. However, please don't send
	a friend request. I won't accept it.
</p>
<h2>Random Stuff</h2>
<div>
	<p>This paragraph is just what it's name says it is: random stuff. Firstly, some links.</p>
	<ul>
		<li><a href="https://github.com/levimcgomes/">My GitHub account</a></li>
		<li>
			<a href="https://github.com/levimcgomes/levimcgomes.github.io">This website's source code</a>
		</li>
	</ul>
	<!--<p>
		Next, some utilities I've made for myself and put in this site for ease of access. Enjoy!
		(please note that these were made for personal use, so they're very low quality tools; however,
		I do think they're useful)
	</p>-->
	<ul>
		<!--<li><a href="/hidden/color">Color Palette Helper</a></li>-->
	</ul>
</div>
<!--The text just ended right at the bottom of the page, and it looked odd, so this adds some empty space-->
<div class="py-12" />
