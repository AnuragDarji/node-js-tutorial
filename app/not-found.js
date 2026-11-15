import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="home">
      <section className="hero">
        <p className="kicker">404</p>
        <h1>That lesson doesn’t exist.</h1>
        <p className="lede">Check the address, or pick a lesson from the course overview.</p>
        <div className="hero-actions">
          <Link href="/" className="cta">Go to the course overview</Link>
        </div>
      </section>
    </main>
  )
}
