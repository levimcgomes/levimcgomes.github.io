import fs from 'fs'
import glob from 'glob'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import katex from 'katex'
import tm from 'markdown-it-texmath'
import cont from 'markdown-it-container'
const md = new MarkdownIt({
    langPrefix: 'hljs language-',
    highlight: function (str, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(str, { language }).value
    }
}).use(tm, {
    engine: katex,
    delimiters: ['dollars', 'beg-end'],
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
}).use(cont, 'media', {
    marker: '&',
    validate: function (params) {
        return params.trim().match(/(.*)\[(.*)\]\((.*)\)(.*)/);
    },

    render: function (tokens, idx) {
        if (tokens[idx].info.trim() === '') return ''
        var regex = /(.*)\[(.*)\]\((.*)\)(.*)/
        var content = tokens[idx].info.trim()
        var mediaType = content.match(regex)[1]
        var path = content.match(regex)[2]
        var label = content.match(regex)[3]
        var caption = content.match(regex)[4]
        return `<figure>
                <${mediaType === 'img' ? 'img' : 'video'} src = "../${path}" alt = "${caption}" style = "width:100%" />
                <figcaption><strong>${label}</strong>${caption}</figcaption>
            </figure > `;
        //return `<div>${path}:::${label}:::${caption}:::${tokens[idx].info.trim()}:::${/\[(.*)\]\((.*)\)(.*)/}</div>`
    }
})
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
                <img className='post-full-image' src={'../' + cover_image} alt='' />
                <div className='post-date'>Posted on {date}</div>
                <div className='post-tags'>{tags.map(
                    (tag, index) => (<div key={index} className='post-tag'>{tag}</div>)
                )}</div>
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
    //Get files from posts dir
    const files = glob.sync('/**/*.md', { root: path.join(process.cwd(), 'posts') })

    const paths = files.map((filename) => ({
        params: {
            slug: process.platform === 'win32' ?
                filename.replace('.md', '').replace(process.cwd(), '').replace('\\posts', '').replace('\\', '').replaceAll('\\', '_') :
                filename.replace('.md', '').replace(process.cwd(), '').replace('/posts', '').replace('/', '').replaceAll('/', '_')
            }           
    }))

    //console.log('paths: ', paths, path.join('posts', paths[0].params.slug + '.md'))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const slugPath = process.platform === 'win32' ? slug.replaceAll('_', '\\') : slug.replaceAll('_', '/')
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slugPath + '.md'),
        'utf-8'
    )
    console.log('slug: ', slug)

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}