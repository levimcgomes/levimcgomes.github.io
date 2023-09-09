<script lang="ts">
	export const prerender = true;
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>
