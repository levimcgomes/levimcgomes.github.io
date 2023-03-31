import Header from '../components/Header'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/giscus.css'
//import '../styles/github-markdown.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
                <meta name="msapplication-TileColor" content="#2b5797"/>
                <meta name="theme-color" content="#ffffff" />
                <meta name="google-site-verification" content="oliS-hJhDV0wCNFfVhfAC0igKcuVEDSj6XCaqtuSwQA" />
                <script src="/js/mode.js"></script>
            </Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-4XQ38SS8N1"></script>
            <script src="/js/gtag.js"></script>
            <Header />
            <main className='page'>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp