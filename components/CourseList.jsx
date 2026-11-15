'use client'

import Link from 'next/link'
import { topics } from '@/data/topics'
import { useProgress } from './ProgressProvider'

export default function CourseList() {
  const { done, reset } = useProgress()
  const firstOpen = topics.find((t) => !done.has(t.id)) ?? topics[0]
  const started = done.size > 0

  return (
    <>
      <div className="hero-actions">
        <Link href={`/lessons/${firstOpen.id}`} className="cta">
          {started ? `Continue: ${firstOpen.title}` : 'Start the first lesson'}
        </Link>
        {started && (
          <button type="button" className="ghost" onClick={reset}>
            Reset progress
          </button>
        )}
      </div>

      <section className="manifest" aria-label="All lessons">
        <h2 className="manifest-h">All lessons</h2>
        {topics.map((t, i) => (
          <Link key={t.id} href={`/lessons/${t.id}`} className={`crate ${done.has(t.id) ? 'is-done' : ''}`}>
            <span className="tab-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="crate-body">
              <span className="crate-title">{t.title}</span>
              <span className="crate-sum">{t.summary}</span>
            </span>
            <span className="crate-meta">{done.has(t.id) ? '✓' : `${t.minutes} min`}</span>
          </Link>
        ))}
      </section>
    </>
  )
}
