'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useProgress } from './ProgressProvider'

export default function LessonFooter({ id, prev, next }) {
  const router = useRouter()
  const { done, toggle, markDone } = useProgress()
  const isDone = done.has(id)

  // ← / → switch lessons (ignored while typing)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, [contenteditable]')) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowRight' && next) router.push(`/lessons/${next.id}`)
      if (e.key === 'ArrowLeft' && prev) router.push(`/lessons/${prev.id}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router, prev, next])

  return (
    <footer className="lesson-foot">
      <button type="button" className={`mark ${isDone ? 'is-done' : ''}`} onClick={() => toggle(id)}>
        {isDone ? '✓ Marked as done' : 'Mark as done'}
      </button>

      <div className="pager">
        {prev ? (
          <Link href={`/lessons/${prev.id}`} className="pager-btn">
            <small>Previous</small>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <Link href="/" className="pager-btn">
            <small>Previous</small>
            <span>Course overview</span>
          </Link>
        )}

        {next ? (
          <Link href={`/lessons/${next.id}`} className="pager-btn pager-next" onClick={() => markDone(id)}>
            <small>Done, next lesson</small>
            <span>{next.title}</span>
          </Link>
        ) : (
          <Link href="/" className="pager-btn pager-next" onClick={() => markDone(id)}>
            <small>Finish</small>
            <span>Complete the course</span>
          </Link>
        )}
      </div>
      <p className="kbd-hint">Tip: use ← and → keys to switch lessons.</p>
    </footer>
  )
}
