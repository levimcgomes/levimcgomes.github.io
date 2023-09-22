<script lang="ts">
	import type { Post } from '$lib/server/post.type';

	export let post: Post;
</script>

<div
	class="w-auto rounded-lg shadow-[0_4px_8px_0_rgb(0_0_0_/_20%),_0_6px_20px_0_rgb(0_0_0_/_19%)] relative overflow-hidden min-h-[35vh]"
>
	{#if post.cover_image_exists}
		<img src={'/' + post.cover_image} alt="" class="pt-5 w-10/12 mx-auto" />
		<p
			class="text-right mr-4 before:content-['-_Posted_on_'] text-sm italic text-grey-400 dark:text-grey-600"
		>
			{post.date_string}
		</p>
		<h2 class="text-center mt-2 mb-1">{post.title}</h2>
	{:else}
		<h2 class="text-center mt-2 mb-1">{post.title}</h2>
		<p
			class="text-right mr-4 before:content-['-_Posted_on_'] text-sm italic text-grey-400 dark:text-grey-600"
		>
			{post.date_string}
		</p>
	{/if}
	<ul class="flex flex-wrap items-center ml-4 list-none">
		{#each post.tags as tag}
			<li>
				<a href={'/tag/' + tag} class="tag">{tag}</a>
			</li>
		{/each}
	</ul>
	<p class="text-lg py-1 mb-10 mx-4">{post.excerpt}</p>
	<a
		class="group btn absolute bottom-0 w-full rounded-none"
		href={'/blog' + post.path.slice(11).slice(0, -3)}
		><span
			class="transition-all duration-500 relative inline-block after:transition-all after:duration-500 after:content-['»'] after:opacity-0 after:absolute after:top-0 after:right-[-20px] group-hover:pr-6 group-hover:after:opacity-100 group-hover:after:right-0"
			>Read More</span
		></a
	>
</div>
