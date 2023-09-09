import type { Post } from '$lib/server/post.type';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { postFromPath } from '$lib/server/post';
// File interfacing
import fs from 'fs';

export const load = (({ params }) => {
	let post: Post;
	try {
		post = postFromPath('./src/posts/' + params.slug + '.md');
	} catch (e) {
		throw error(404, {
			message: 'Post not found!',
			path: fs.realpathSync('./src/posts/' + params.slug + '.md'),
			pwd: process.cwd()
		});
	}

	return {
		post: post,
		innerHTML: params.slug
	};
}) satisfies PageServerLoad;
