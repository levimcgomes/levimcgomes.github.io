export default function NewsletterSignup() {
    return (
        <div className="newsletter">
            <form action="https://levimcgomes.pythonanywhere.com/newsletter_signup" method="POST">
                Subscribe to my newsletter to get notified about new posts!
                <div className="newsletter-form">
                    <input type="email" name="email_address" placeholder="email address" />
                    <input type="hidden" name="signup_page" value="https://levimcgomes.github.io" />
                    <input type="submit" value="Sign up" className="btn" />
                </div>
            </form>
        </div>
    )
}