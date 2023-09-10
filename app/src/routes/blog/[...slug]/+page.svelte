<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>{data.post.title}</h2>
<div>{@html data.innerHTML}</div>

<style lang="scss">
	@import '/node_modules/highlight.js/styles/github.css';
	@import '/node_modules/katex/dist/katex.css';
	@import '/node_modules/markdown-it-texmath/css/texmath.css';
</style>
