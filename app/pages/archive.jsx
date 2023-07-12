import fs from 'fs'
import glob from 'glob'
import path from 'path'
import matter from 'gray-matter'
import Post from '../components/Post'
import { sortByDate } from '../utils'

export default function Archive({ posts }) {
    return (
        <div>
            <h2>Post Archive</h2>
            <div className="recent-posts">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
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