import fs from 'fs';
import glob from 'glob'
import path from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed';

export default function generateRssFeed() {
    const allPosts = getPosts();
    const site_url = process.env.NODE_ENV !== "production" ? 'localhost:3000' : 'https://levimcgomes.github.io';

    const feedOptions = {
        title: 'Blog posts | RSS Feed',
        description: 'A blog about game development and much more!',
        id: site_url,
        link: site_url,
        image: `${site_url}/android-chrome-256x256.png`,
        favicon: `${site_url}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}, levimcgomes`,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${site_url}/rss.xml`,
        },
    };

    const feed = new Feed(feedOptions);

    allPosts.forEach((post) => {
        var separatedDate = post.frontmatter.date.split("/")
        feed.addItem({
            title: post.title,
            id: `${site_url}/blog/${post.slug}`,
            link: `${site_url}/blog/${post.slug}`,
            description: post.frontmatter.excerpt,
            date: new Date(parseInt(separatedDate[2]), parseInt(separatedDate[1]) - 1, parseInt(separatedDate[0])),
            content: post.content
        });
    });

    fs.writeFileSync('./public/rss.xml', feed.rss2());
}

function getPosts() {
    const files = glob.sync('/**/*.md', { root: path.join(process.cwd(), 'posts') })

    //Get slug and frontmatter from posts
    return files.map(filename => {
        const slug = process.platform === 'win32' ?
            filename.replace('.md', '').replace(process.cwd(), '').replace('\\posts', '').replace('\\', '').replaceAll('\\', '_') :
            filename.replace('.md', '').replace(process.cwd(), '').replace('/posts', '').replace('/', '').replaceAll('/', '_')

        //Get frontmatter
        const markdownWithMeta = fs.readFileSync(path.join(filename), 'utf8')

        const { data: frontmatter, content } = matter(markdownWithMeta)

        return {
            slug,
            frontmatter,
            content
        }
    })
}