'use client'

import { useEffect, useState } from 'react'
import { videos, LANGUAGES } from '@/data/videos'

const LANG_KEY = 'node-tutorial-video-lang'

export default function VideoSection({ topicId, topicTitle }) {
  const [lang, setLang] = useState('en')
  const [playing, setPlaying] = useState(false)

  // Restore the viewer's language choice after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY)
      if (saved === 'en' || saved === 'hi') setLang(saved)
    } catch {
      /* storage unavailable: default to English */
    }
  }, [])

  // A new topic or language starts from the thumbnail again
  useEffect(() => setPlaying(false), [topicId, lang])

  const entry = videos[topicId]
  if (!entry) return null

  const chooseLang = (code) => {
    setLang(code)
    try {
      localStorage.setItem(LANG_KEY, code)
    } catch {
      /* choice lasts for this page only */
    }
  }

  const video = entry[lang] ?? entry.en
  const language = LANGUAGES.find((l) => l.code === lang)
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${topicTitle} ${language.searchSuffix}`
  )}`
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`

  return (
    <section className="video" aria-labelledby={`video-h-${topicId}`}>
      <div className="video-head">
        <h2 id={`video-h-${topicId}`} className="video-h">Watch a video on this topic</h2>
        <div className="lang-switch" role="radiogroup" aria-label="Video language">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="radio"
              aria-checked={lang === l.code}
              lang={l.code}
              className={`lang-btn ${lang === l.code ? 'is-on' : ''}`}
              onClick={() => chooseLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-poster" onClick={() => setPlaying(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <span className="play" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="sr-only">Play video: {video.title}</span>
          </button>
        )}
      </div>

      <div className="video-meta">
        <p className="video-title">{video.title}</p>
        {video.channel && <p className="video-channel">{video.channel}</p>}
        {video.note && (
          <p className={`video-note ${video.fallback ? 'is-fallback' : ''}`}>{video.note}</p>
        )}
        <p className="video-links">
          <a href={watchUrl} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer">
            Search YouTube for more in {language.code === 'hi' ? 'Hindi' : 'English'}
          </a>
        </p>
      </div>
    </section>
  )
}
