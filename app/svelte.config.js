import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
			scss: { includePaths: ['src', 'node_modules'] }
		}),
		vitePreprocess()
	],

	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
