import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import katex from 'katex'
import tm from 'markdown-it-texmath'
const md = new MarkdownIt({
    langPrefix: 'hljs language-',
    highlight: function (str, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(str, { language }).value
    }
}).use(tm, {
    engine: katex,
    delimiters: ['dollars','beg-end'],
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.css'
import 'markdown-it-texmath/css/texmath.css'
import Link from 'next/link'
import Head from 'next/head'

export default function PostPage({
    frontmatter: { title, date, cover_image, tags },
    slug,
    content,
}) {
    return (
        <>
            <Head>
                <title>{title} | How I Made A Game</title>
            </Head>
            <Link href='/'>
                <div align='right' ><a className='btn-back'><span>Go Back</span></a></div>
            </Link>
            <div className='post-page'>
                <h1 className='post-title'>{title}</h1>
                <div className='post-date'>Posted on {date}</div>
                <div className='post-tags'>{tags.map(
                    (tag, index) => (<div key={index} className='post-tag'>{tag}</div>)
                )}</div>
                <img className='post-image' src={cover_image} alt='' />
                <div className='post-body'>
                    <div dangerouslySetInnerHTML={{
                        __html: md.render(content)
                    }}>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.md'),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}