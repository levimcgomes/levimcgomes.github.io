<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="no-underline my-4">
	<!--It's somewhat ridiculous that I have to do this just
		to get rid of the underline, but just adding 'no-underline'
		to the tag won't work for whatever reason-->
	<span class="underline decoration-accent-500">Posts tagged</span>
	<a href={'/tag/' + data.tag} class="tag">{data.tag}</a>
</h1>
<PostList postList={data.postList} />
