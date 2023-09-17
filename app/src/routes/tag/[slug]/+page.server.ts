import { getPostList } from '$lib/server/post';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// HACK: URLs make this awkward...
	// Routing just thinks C# means C followed by an empty fragment
	// (see https://en.wikipedia.org/wiki/URI_fragment) and thus
	// doesn't send t to the server. I don't know of any workaround
	// for this, so this will have to do for know. Of course,
	// if I ever decide to do a post about C, this will break...
	if (params.slug === 'C') params.slug = 'C#';
	const postList = getPostList();
	const taggedPostList = postList.filter((post) => post.tags.includes(params.slug));
	if (taggedPostList.length === 0)
		throw error(404, {
			message: 'There are no posts matching selected tag: ' + params.slug,
			pwd: process.cwd()
		});
	return {
		tag: params.slug,
		postList: taggedPostList
	};
}) satisfies PageServerLoad;
