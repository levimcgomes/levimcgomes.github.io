<script lang="ts">
	import type { Post } from '$lib/server/post.type';
	import PostComponent from './PostComponent.svelte';
	export let postList: Post[];
</script>

<div class="grid grid-cols-1 gap-x-4 gap-y-4 py-4 md:grid-cols-2 md:gap-x-[2%]">
	{#each postList as post}
		<PostComponent {post} />
	{/each}
</div>
