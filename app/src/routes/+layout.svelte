<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main class="py-0 px-[10%] lg:px-[20%]">
	<slot />
</main>
