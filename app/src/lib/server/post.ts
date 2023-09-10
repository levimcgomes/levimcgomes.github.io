// Typing info
import type { Post } from './post.type';
// File reading
import fs from 'fs';
import glob from 'glob';
// Markdown parsing
import matter from 'gray-matter';

export function getPostList(): Post[] {
	// All posts should be in /src/posts/,
	// either in the top - level or inside
	// sub folders
	const postPaths = glob.sync('./src/posts/**/*.md');

	const posts = postPaths.map((path) => postFromPath(path));

	return sortPostsByDate(posts);
}

export function postFromPath(path: string, getContent = false) {
	const file = fs.readFileSync(path);

	const parsed = matter(file);
	// the Date constructor expects an American style string,
	// bout ours is European style, so we need to do some juggling
	const splitDate = (parsed.data['date'] as string).split('/');
	const date = new Date(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]);
	if (getContent) {
		return {
			path: path,
			title: parsed.data['title'] as string,
			date: date,
			cover_image: parsed.data['cover_image'] as string,
			tags: parsed.data['tags'] as string[],
			excerpt: parsed.data['excerpt'] as string,
			content: parsed.content
		} as Post;
	} else {
		return {
			path: path,
			title: parsed.data['title'] as string,
			date: date,
			cover_image: parsed.data['cover_image'] as string,
			tags: parsed.data['tags'] as string[],
			excerpt: parsed.data['excerpt'] as string
		} as Post;
	}
}

function sortPostsByDate(posts: Post[]): Post[] {
	const comparer = (a: Post, b: Post) => {
		if (a.date < b.date) {
			return 1;
		} else if (a.date > b.date) {
			return -1;
		} else return 0;
	};

	return posts.sort(comparer);
}
