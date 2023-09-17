import { getPostList } from '$lib/server/post';
import type { Post } from '$lib/server/post.type';
import { error, redirect } from '@sveltejs/kit';
import fs from 'fs';
import type { PageServerLoad } from './$types';
// File interfacing
import markdown from '$lib/server/markdown';

export const load = (({ params }) => {
	const path = './src/posts/' + params.slug + '.md';
	let post: Post;
	let html: string;
	let previousPostPath: string | undefined;
	let nextPostPath: string | undefined;
	try {
		const postList = getPostList();
		const i = postList.findIndex((post) => post.path === path);
		// Use indexing because we want an invalid index to throw
		post = postList[i];
		html = markdown(post.content);
		// Use at because an invalid index is fine
		// (this might be the first or last post)
		previousPostPath = postList.at(i + 1)?.path;
		nextPostPath = postList.at(i - 1)?.path;
	} catch (e) {
		// For backwards compatibility
		// The previous blog separated paths in the blog route
		// by _ (cause next doesn't support variadic dynamic routes, w Svelte)
		// so we do a simple redirect to ensure legacy links still work
		if (path.includes('_') && fs.existsSync(path.replaceAll('_', '/'))) {
			throw redirect(301, '/blog/' + params.slug.replaceAll('_', '/'));
		}
		throw error(404, {
			message: 'Post not found: ' + params.slug,
			pwd: process.cwd()
		});
	}

	return {
		post: post,
		innerHTML: html,
		previousPostPath: '/blog/' + previousPostPath?.slice(12).slice(0, -3),
		nextPostPath: '/blog/' + nextPostPath?.slice(12).slice(0, -3)
	};
}) satisfies PageServerLoad;
