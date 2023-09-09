<script lang="ts">
	import type { Post } from '$lib/server/post.type';

	export let post: Post;
</script>

<div>
	{post.content}
</div>
