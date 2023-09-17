<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import Giscus from '@giscus/svelte';
	import { themeStore } from '$lib/stores';
	// Update Giscus whenever the theme changes
	themeStore.subscribe((value) => {
		try {
			const iframe = document
				.querySelector('giscus-widget')!
				.shadowRoot!.querySelector<HTMLIFrameElement>('iframe');
			if (!iframe || !iframe.contentWindow) return;
			iframe.contentWindow.postMessage(
				{
					giscus: {
						setConfig: {
							theme: value ? 'light' : 'dark'
						}
					}
				},
				'https://giscus.app'
			);
		} catch (e) {
			// Build doesn't like empty blocks...
			console.log('Failed to communicate with Giscus, this is likely fine');
		}
	});
</script>

<h2 class="no-underline text-center text-5xl my-6">{data.post.title}</h2>
{#if data.post.cover_image_exists}
	<img src={'/' + data.post.cover_image} alt="" />
{/if}
<p
	class="text-right before:content-['-Posted_on_'] text-sm italic text-grey-400 dark:text-grey-600"
>
	{data.post.date_string}
</p>
<ul class="flex flex-wrap items-center mb-8 list-none">
	{#each data.post.tags as tag}
		<li>
			<a href={'/tag/' + tag} class="tag">{tag}</a>
		</li>
	{/each}
</ul>
<div
	class="text-lg [&_h2]:mt-4 [&_h3]:mt-4 [&_h4]:mt-4 [&_ul]:list-disc [&_ul]:list-inside [&_p]:indent-5 [&_img]:mt-6 [&_code]:text-[length:inherit] [&_pre]:bg-grey-800 [&_pre]:dark:bg-grey-200 [&_pre]:text-grey-100 [&_pre]:dark:text-grey-900 [&_pre]:rounded [&_pre]:overflow-x-scroll [&_pre]:border-2 [&_.line-number]:bg-grey-700 [&_.line-number]:dark:bg-grey-300 [&_.line-number]:text-accent-100 [&_.line-number]:dark:text-accent-900 [&_.line-number]:sticky [&_.line-number]:left-0 [&_.line-number]:px-1 [&_.line-number]:text-right [&_td]:pl-1 [&_blockquote]:border-l-4 [&_blockquote]:border-accent-500 [&_blockquote]:bg-accent-900 [&_blockquote]:dark:bg-accent-200 [&_blockquote_p]:indent-0 [&_blockquote]:p-3 [&_blockquote]:pl-2 [&_blockquote]:mx-5 [&_blockquote]:my-3 [&_eq]:contents"
>
	{@html data.innerHTML}
</div>

<d class="flex mt-8">
	{#if data.previousPostPath !== '/blog/undefined'}
		<a
			class="group btn inline-block px-5 py-0 text-center w-1/2 rounded-r-none"
			href={data.previousPostPath}
		>
			<span
				class="relative transition-all before:content-['«'] before:absolute before:opacity-0 before:-left-5 before:transition-all group-hover:before:opacity-100 group-hover:before:left-0 group-hover:pl-6"
				>Previous Post</span
			>
		</a>
	{:else}
		<!--just so the next one stays on the right,
		there are probably better solutions to this, but it's
		only going to happen on one post so...-->
		<div class="w-1/2" />
	{/if}
	{#if data.nextPostPath !== '/blog/metroidvania/devlog0'}
		<a
			class="group btn inline-block px-5 py-0 text-center w-1/2 rounded-l-none"
			href={data.nextPostPath}
		>
			<span
				class="relative transition-all after:content-['»'] after:absolute after:opacity-0 after:-right-5 after:transition-all group-hover:after:opacity-100 group-hover:after:right-0 group-hover:pr-6"
				>Next Post</span
			>
		</a>
	{/if}
</d>

<Giscus
	repo="levimcgomes/levimcgomes.github.io"
	repoId="R_kgDOH_rqaA"
	category="Blog Comments"
	categoryId="DIC_kwDOH_rqaM4CVNZX"
	mapping="pathname"
	strict="0"
	reactionsEnabled="1"
	emitMetadata="0"
	inputPosition="top"
	lang="en"
	theme={$themeStore ? 'light' : 'dark'}
	loading="lazy"
/>
