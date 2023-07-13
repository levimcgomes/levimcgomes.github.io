import fs from 'fs'
import glob from 'glob'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import Post from '../components/Post'
import ClientOnly from '../components/ClientOnly'
import NewsletterSignup from '../components/NewsletterSignup'
import { sortByDate } from '../utils'
import generateRssFeed from '../utils/rss.jsx'

export default function Home({ posts }) {
    return (
        <div>
            <NewsletterSignup></NewsletterSignup>
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
                So, what&#39;s this all <em>about</em>? It&#39;s about how I made a game. Sometimes. Really, it&#39;s about whatever I feel like writing. Most of the time, it will be about making games, but everything is fair game for me. I&#39;ll try to post every other week, but due to other responsiblities (aka. school), I might be unable to fullfil a schedule. If you&#39;d like to contact me for some reason (preferably related to this blog), you can find me on <Link href='https://discordapp.com/users/924653755763396639' passHref>Discord</Link>. However, please don&#39;t send a friend request. I won&#39;t accept it.
            </p>
            <ClientOnly>
                <h2>Random stuff</h2>
                <p className='text'>
                    This paragraph is just what it&#39;s name says it is: random stuff. Firstly, some links.
                    <ul>
                        <li><Link href='https://github.com/levimcgomes/' passHref>My GitHub account</Link></li>
                        <li><Link href='https://github.com/levimcgomes/levimcgomes.github.io' passHref>This website&#39;s source code</Link></li>
                    </ul>
                    Next, some utilities I&#39;ve made for myself and put in this site for ease of access. Enjoy! (please note that these were made for personal use, so they&#39;re very low quality tools; however, I do think they&#39;re useful)
                    <ul>
                        <li><Link href='/hidden/color' passHref>Color Palette Helper</Link></li>
                    </ul>
                </p>
            </ClientOnly>
        </div>
    )
}

export async function getStaticProps() {
    generateRssFeed()

    //Get files from posts dir
    const files = glob.sync('/**/*.md', { root: path.join(process.cwd(), 'posts') })

    //Get slug and frontmatter from posts
    const posts = files.map(filename => {
        const slug = process.platform === 'win32' ?
            filename.replace('.md', '').replace(process.cwd(), '').replace('\\posts', '').replace('\\', '').replaceAll('\\', '_') :
            filename.replace('.md', '').replace(process.cwd(), '').replace('/posts', '').replace('/', '').replaceAll('/', '_')

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