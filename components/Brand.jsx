import Link from 'next/link'

export default function Brand({ meta }) {
  return (
    <Link href="/" className="brand">
      <svg className="brand-mark" viewBox="0 0 40 46" aria-hidden="true">
        <path d="M20 2 L38 12.5 V33.5 L20 44 L2 33.5 V12.5 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 13 L29 18.2 V28.8 L20 34 L11 28.8 V18.2 Z" fill="currentColor" opacity="0.85" />
      </svg>
      <div>
        <span className="brand-name">Node.js, topic by topic</span>
        {meta && <span className="brand-meta">{meta}</span>}
      </div>
    </Link>
  )
}
