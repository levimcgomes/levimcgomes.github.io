import Link from 'next/link'

export default function Header() {
    return (
            <div className="header-container">
                <Link href='/' passHref><h2>How I Made A Game</h2></Link>
                <div>
                    <Link href='/#about' passHref>About</Link>
                    <Link href='/archive' passHref>All Posts</Link>
                    <Link href='/' passHref>Home</Link>
                </div>
            </div>
    )
}