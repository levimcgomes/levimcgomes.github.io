<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Post Archive</h2>
<PostList postList={data.posts} />
