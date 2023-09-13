export type Post = {
	path: string;
	title: string;
	date: Date;
	date_string: string;
	cover_image: string;
	cover_image_exists: boolean;
	tags: string[];
	excerpt: string;
	content: string | never;
};
