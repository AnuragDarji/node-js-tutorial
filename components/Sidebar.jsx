'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { topics } from '@/data/topics'
import { useProgress } from './ProgressProvider'
import Brand from './Brand'

export default function Sidebar() {
  const pathname = usePathname()
  const { done } = useProgress()
  const activeRef = useRef(null)
  const totalMinutes = topics.reduce((s, t) => s + t.minutes, 0)
  const progress = Math.round((done.size / topics.length) * 100)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [pathname])

  return (
    <aside className="rail">
      <Brand meta={`${topics.length} lessons, about ${totalMinutes} minutes`} />

      <div className="progress" aria-label={`${progress}% complete`}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{done.size} of {topics.length} done</span>
      </div>

      <nav className="tabs" aria-label="Lessons">
        {topics.map((t, i) => {
          const href = `/lessons/${t.id}`
          const active = pathname === href
          return (
            <Link
              key={t.id}
              href={href}
              ref={active ? activeRef : null}
              aria-current={active ? 'page' : undefined}
              className={`tab ${active ? 'is-active' : ''} ${done.has(t.id) ? 'is-done' : ''}`}
            >
              <span className="tab-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="tab-title">{t.title}</span>
              {done.has(t.id) && <span className="tab-check" aria-label="completed">✓</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
