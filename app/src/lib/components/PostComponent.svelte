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
	<br />
	<a href={'/blog' + post.path.slice(11).slice(0, -3)}>read</a>
	<hr />
</div>
