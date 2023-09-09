<script lang="ts">
	import type { Post } from '$lib/server/post.type';
	import PostComponent from './PostComponent.svelte';
	export let postList: Post[];
</script>

{#each postList as post}
	<PostComponent {post} />
{/each}
