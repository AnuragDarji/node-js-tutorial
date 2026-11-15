'use client'

import { useState } from 'react'
import { highlightLine } from './highlight.jsx'

const LANG_NAMES = { js: 'JavaScript', json: 'JSON', bash: 'Terminal', yaml: 'YAML', dockerfile: 'Dockerfile' }

export default function CodeBlock({ code, lang = 'bash', title }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <figure className="code">
      <figcaption className="code-bar">
        <span className="code-title">{title || LANG_NAMES[lang] || lang}</span>
        <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre>
        <code>
          {code.split('\n').map((line, i) => (
            <span className="code-line" key={i}>
              {highlightLine(line, lang)}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
