import {useRouter} from 'next/router'

export default function NewsletterSignup() {
    const router = useRouter()
    const site_url = process.env.NODE_ENV !== "production" ? 'localhost:3000' : 'https://levimcgomes.github.io';

    return (
        <div className="newsletter-post">
            <form action="https://levimcgomes.pythonanywhere.com/newsletter_signup" method="POST">
                Subscribe to my newsletter to get notified about new posts!
                <div className="newsletter-form">
                    <input type="email" name="email_address" placeholder="email address" />
                    <input type="hidden" name="signup_page" value={site_url + router.asPath} />
                    <input type="submit" value="Sign up" className="btn" />
                </div>
            </form>
        </div>
    )
}