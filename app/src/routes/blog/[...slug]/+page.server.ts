import { postFromPath } from '$lib/server/post';
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
	try {
		post = postFromPath(path, true);
		html = markdown(post.content);
	} catch (e) {
		// For backwards compatibility
		// The previous blog separated paths in the blog route
		// by _ (cause next doesn't support variadic dynamic routes, w Svelte)
		// so we do a simple redirect to ensure legacy links still work
		if (fs.existsSync(path.replaceAll('_', '/'))) {
			throw redirect(301, '/blog/' + params.slug.replaceAll('_', '/'));
		}
		throw error(404, {
			message: 'Post not found!',
			path: path,
			pwd: process.cwd()
		});
	}

	return {
		post: post,
		innerHTML: html
	};
}) satisfies PageServerLoad;
