<script lang="ts">
	import type { Post } from '$lib/server/post.type';

	export let post: Post;
</script>

<div>
	{post.title}
	<br />
	{post.date}
	<br />
	{post.path}
	<br />
	{post.tags}
	<br />
	{post.excerpt}
	<hr />
</div>
