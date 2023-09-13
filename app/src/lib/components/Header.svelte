<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav
	class="bg-grey-100 text-grey-900 flex flex-col items-center justify-between md:flex-row md:justify-between md:content-center py-6 px-4 md:sticky top-0 z-10 [&>*]:h-min"
>
	<a class="no-underline hover:no-underline transition-none" href="/"
		><h2 class="no-underline text-grey-900 not-italic">How I Made A Game</h2></a
	>
	<div class="flex gap-6 content-center [&>*]:h-min">
		<a class="text-grey-900" href="/#about">About</a>
		<a class="text-grey-900" href="/archive">All Posts</a>
		<a class="text-grey-900" href="/">Home</a>
		<ThemeToggle />
	</div>
</nav>
