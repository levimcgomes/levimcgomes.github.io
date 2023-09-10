import { postFromPath } from '$lib/server/post';
import type { Post } from '$lib/server/post.type';
import { error } from '@sveltejs/kit';
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
