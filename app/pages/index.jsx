import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import Post from '../components/Post'
import {sortByDate} from '../utils'

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>How I Made A Game</title>
            </Head>
            <h1>How I Made A Game</h1>
            <h2>Recent Posts</h2>
            <div className="recent-posts">
                {posts.map((post, index) => index < 6 ? (
                    <Post key={index} post={post} />
                ) : (''))}
            </div>
            <Link href='/archive' passHref><div align='center' ><a className='btn'>&nbsp;See All&nbsp;</a></div></Link>
            <h2 id='about'>About</h2>
            <p className='text'>
Lorem ipsum dolor sit amet diam dignissim eos accusam et est dolore justo elitr nibh nibh et tempor dolor accusam dolore tation nonumy gubergren rebum gubergren diam adipiscing ea nonummy ipsum commodo ipsum aliquyam in dolore diam facer sed et diam quod velit esse consequat sit invidunt et ex elit rebum sed ut diam labore magna no qui ea sed invidunt diam hendrerit no et molestie nisl eirmod clita justo est lorem rebum dolore lorem vero accusam duo nonummy lorem eos justo sed duo dolore hendrerit amet tempor nulla consetetur eos accusam sed ex labore dolor est sed justo
            </p>
        </div>
    )
}

export async function getStaticProps() {
    //Get files from posts dir
    const files = fs.readdirSync(path.join('posts'))

    //Get slug and frontmatter from posts
    const posts = files.map(filename => {
        const slug = filename.replace('.md', '')

        //Get frontmatter
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf8')

        const { data: frontmatter } = matter(markdownWithMeta)

        return {
            slug,
            frontmatter
        }
    })

    return {
        props: {
            posts: posts.sort(sortByDate)
        }
    }
}