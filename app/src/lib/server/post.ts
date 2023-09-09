import type { Post } from './post.type';

export function getPostList(): Post[] {
	// Return a dummy post
	return [
		{
			content: 'Hello World!'
		}
	];
}
