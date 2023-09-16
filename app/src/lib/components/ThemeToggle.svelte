<script lang="ts">
	import { themeStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	// Store both the sun's and the moon's properties
	const props = {
		sun: {
			r: 9,
			transform: 40,
			cx: 12,
			cy: 4,
			opacity: 0
		},
		moon: {
			r: 5,
			transform: 90,
			cx: 30,
			cy: 0,
			opacity: 1
		}
	};
	const springConfig = {
		stiffness: 0.07,
		damping: 0.17
	};

	// Get the initial theme, and update it when necessary
	function getTheme() {
		if (import.meta.env.SSR) return false;
		const stored = localStorage.getItem('theme');
		if (stored) return stored === 'true';
		else return !window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	function setTheme(theme: boolean) {
		if (import.meta.env.SSR) return;
		// Save the theme for later
		localStorage.setItem('theme', String(theme));
		// Finally, set the class for tailwind
		const body = document.getElementsByTagName('html')[0];
		if (theme) {
			body.classList.remove('dark');
		} else {
			body.classList.add('dark');
		}
	}

	function toggleTheme() {
		// First, set our local variable
		theme = !theme;
	}

	// True means light, false means dark
	let theme = getTheme();
	onMount(() => {
		theme = getTheme();
		setTheme(theme);
	});

	// Create the springs
	const r = spring(props[theme ? 'sun' : 'moon'].r, springConfig);
	const cx = spring(props[theme ? 'sun' : 'moon'].cx, springConfig);
	const cy = spring(props[theme ? 'sun' : 'moon'].cy, springConfig);
	const transform = spring(props[theme ? 'sun' : 'moon'].transform, springConfig);
	const opacity = spring(props[theme ? 'sun' : 'moon'].opacity, springConfig);

	// Reactive declarations: update each of the props based on the mode
	$: {
		r.set(props[theme ? 'sun' : 'moon'].r);
		cx.set(props[theme ? 'sun' : 'moon'].cx);
		cy.set(props[theme ? 'sun' : 'moon'].cy);
		transform.set(props[theme ? 'sun' : 'moon'].transform);
		opacity.set(props[theme ? 'sun' : 'moon'].opacity);
	}
	$: setTheme(theme);
	$: {
		themeStore.set(theme);
	}
</script>

<button on:click={toggleTheme}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="black"
		stroke="#FFFFFF"
		class="cursor-pointer"
		style="transform: rotate({$transform}deg)"
	>
		<mask id="myMask2">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<circle cx={$cx} cy={$cy} r="9" fill="black" />
		</mask>

		<circle cx="12" cy="12" r={$r} fill="white" mask="url(#myMask2)" />
		<g stroke="white" opacity={$opacity}>
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
	</svg>
</button>
