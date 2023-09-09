<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>{data.post.title}</h2>
<div>{@html data.innerHTML}</div>
