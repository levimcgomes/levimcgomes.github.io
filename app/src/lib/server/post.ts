// Typing info
import type { Post } from './post.type';
// File reading
import fs from 'fs';
import glob from 'glob';
// Markdown parsing
import matter from 'gray-matter';

// Use caching (or memoization if you're fancy),
// this way we can call this multiple times without
// a big performance cost
let cachedPostList: Post[] | undefined = undefined;

export function getPostList(limit = -1): Post[] {
	if (!cachedPostList) {
		// Just a sanity check to make sure caching is working properly
		console.log('COMPUTE POST LIST');
		// All posts should be in /src/posts/,
		// either in the top - level or inside
		// sub folders
		const postPaths = glob.sync('./src/posts/**/*.md');

		const posts = postPaths.map((path) => postFromPath(path));

		cachedPostList = sortPostsByDate(posts);
	}

	if (limit === -1) return cachedPostList;
	else return cachedPostList.slice(0, limit);
}

export function postFromPath(path: string) {
	const file = fs.readFileSync(path);

	const parsed = matter(file);
	// the Date constructor expects an American style string,
	// bout ours is European style, so we need to do some juggling
	const splitDate = (parsed.data['date'] as string).split('/');
	const date = new Date(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]);
	return {
		path: path,
		title: parsed.data['title'] as string,
		date: date,
		date_string: parsed.data['date'] as string,
		cover_image: parsed.data['cover_image'] as string,
		cover_image_exists: fs.existsSync(process.cwd() + '/static/' + parsed.data['cover_image']),
		tags: parsed.data['tags'] as string[],
		excerpt: parsed.data['excerpt'] as string,
		content: parsed.content
	} as Post;
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
