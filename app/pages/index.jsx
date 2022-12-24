import fs from 'fs'
import glob from 'glob'
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
                So, what&#39;s this all <em>about</em>? It's about how I made a game. Sometimes. Really, it's about whatever I feel like writing. Most of the time, it will be about making games, but everything is fair game for me. I'll try to post every other week, but due to other responsiblities (aka. school), I might be unable to fullfil a schedule. If you'd like to contact me for some reason (preferably related to this blog), you can find me on <Link href='https://discordapp.com/users/924653755763396639' passHref>Discord</Link>. However, please don't send a friend request. I won't accept it.
            </p>
        </div>
    )
}

export async function getStaticProps() {
    //Get files from posts dir
    const files = glob.sync('/**/*.md', { root: path.join(process.cwd(), 'posts') })
    console.log(files)

    //Get slug and frontmatter from posts
    const posts = files.map(filename => {
        const slug = filename.replace('.md', '').replace(process.cwd(), '').replace('\\posts', '').replace('\\', '').replaceAll('\\', '_')

        //Get frontmatter
        const markdownWithMeta = fs.readFileSync(path.join(filename), 'utf8')

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