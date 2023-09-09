import type { PageServerLoad } from './$types';
import { getPostList } from '$lib/server/post';

export const load = (() => {
	return { posts: getPostList() };
}) satisfies PageServerLoad;
