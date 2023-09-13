// Markdown parsing
import MarkdownIt from 'markdown-it';
// MarkdownIt plugins
import hljs from 'highlight.js';
import katex from 'katex';
import MD_TexMath from 'markdown-it-texmath';
import MD_Container from 'markdown-it-container';

// Add line numbers to code - because hljs won't
function applyLineNumbers(code: string): string {
	const lines = code.trim().split('\n');

	const rows = lines.map((line, idx) => {
		return (
			'<tr>' +
			`<th class="line-number">${idx + 1}</td>` +
			`<td class="code-line">${line}</td>` +
			'</tr>'
		);
	});
	return `<table><tbody>${rows.join('')}</tbody></table>`;
}
// markdown-it highlighting function using hljs
function highlight(code: string, lang: string, attrRaw = ''): string {
	const attrs = attrRaw.split(/\s+/g);
	const showLineNumbers = attrs.includes('showLineNumbers');

	let highlightedCode =
		lang && hljs.getLanguage(lang)
			? hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
			: md.utils.escapeHtml(code);

	if (showLineNumbers) {
		highlightedCode = applyLineNumbers(highlightedCode);
	}
	return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
}

// Custom containers
const mediaContainer: MD_Container.ContainerOpts = {
	// Syntax:
	// &&&<img|video>[path/to/file]
	// <caption>
	// &&&
	marker: '&',
	validate: (params: string) => {
		return params.trim().match(/(.*)\[(.*)\]/) !== null;
	},
	render: function (tokens, idx) {
		const m = tokens[idx].info.trim().match(/(.*)\[(.*)\]/);

		if (m !== null && tokens[idx].nesting === 1) {
			const mediaType = m[1];
			/* For some unknown reason, Svelte thinks
		 	   /path/to/image.png
		 	   means
		 	   /blog/posts/path/to/image.png
		 	   and even goes as far as trying to use that as a route
		 	   for /routes/blog/[...slug]
		 	   causing a lot of errors
		 	   So we just give it a little hint :)
			*/
			const mediaSrc = '../../' + m[2];
			// opening tag
			if (mediaType === 'img' || mediaType === 'image') {
				return (
					'<figure>\n' + '<img src="../' + mediaSrc + '" style="width: 100%" />\n' + '<figcaption>'
				);
			} else if (mediaType === 'vid' || mediaType === 'video') {
				return (
					'<figure>\n' +
					'<video src="../' +
					mediaSrc +
					'" style="width: 100%" controls />\n' +
					'<figcaption>'
				);
			} else {
				return (
					'<figure>\n' +
					'<' +
					mediaType +
					' src="../' +
					mediaSrc +
					'" style="width: 100%" />\n' +
					'<figcaption>'
				);
			}
		} else {
			return '</figcaption></figure>';
		}
	}
};

const quoteContainer: MD_Container.ContainerOpts = {
	marker: '@',
	validate: () => true,
	render: function (tokens, idx) {
		if (tokens[idx].nesting === 1) return '<div class="quote-surrond">';
		else return '</div>';
	}
};

// Configure KaTeX
const katexOptions: katex.KatexOptions = {
	macros: {
		'\\R': '\\mathbb{R}'
	}
};

// Create the parser
let md = new MarkdownIt({
	html: true,
	langPrefix: 'hljs language-',
	highlight: highlight
});
md = md.use(MD_TexMath, {
	engine: katex,
	delimiters: ['dollars', 'beg-end'],
	katexOptions: katexOptions
});
md = md.use(MD_Container, 'media', mediaContainer);
md = md.use(MD_Container, 'quote', quoteContainer);

export default function parseMarkdownFromFile(markdown: string): string {
	return md.render(markdown);
}
