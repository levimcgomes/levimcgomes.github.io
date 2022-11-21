import Link from 'next/link'

export default function Post({ post }) {
    return (
        <div className='post-preview'>
            <img className='post-image' src={post.frontmatter.cover_image} alt="" />
            <div className="post-date">{post.frontmatter.date}</div>
            <h3>{post.frontmatter.title}</h3>
            <div className='post-tags'>{post.frontmatter.tags.map(
                (tag, index) => (<div key={index} className='post-tag'>{tag}</div>)
            )}</div>
            <div className='post-excerpt' >{post.frontmatter.excerpt}</div>
            <Link href={`/blog/${post.slug}`}>
                <a className='btn'><span>Read More</span></a>
            </Link>
        </div>
    )
}