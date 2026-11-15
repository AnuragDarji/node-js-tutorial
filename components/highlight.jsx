// Tiny line-based highlighter for js, json, bash, yaml and dockerfile.

const JS_TOKENS = new RegExp(
  [
    String.raw`(\/\/.*$)`, // 1 comment
    String.raw`('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|` + '`(?:[^`\\\\]|\\\\.)*`)', // 2 string
    String.raw`\b(import|from|export|default|const|let|var|await|async|function|return|if|else|for|of|in|new|try|catch|finally|throw|class|extends|while|typeof|this|super)\b`, // 3 keyword
    String.raw`\b(true|false|null|undefined)\b`, // 4 literal
    String.raw`\b(\d[\d_.]*)\b`, // 5 number
  ].join('|'),
  'g'
)

function tokenize(line, re, classFor) {
  const out = []
  let last = 0
  let m
  re.lastIndex = 0
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const group = m.slice(1).findIndex((g) => g !== undefined)
    out.push(<span key={m.index} className={classFor[group]}>{m[0]}</span>)
    last = m.index + m[0].length
    if (m[0].length === 0) re.lastIndex++
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

const DF_KW = /^(\s*)(FROM|WORKDIR|COPY|ADD|RUN|ENV|ARG|EXPOSE|USER|CMD|ENTRYPOINT|HEALTHCHECK|LABEL|VOLUME)\b/
const BASH_CMD = /^(\s*)(node|npm|npx|nvm|fnm|pm2|docker|curl|winget|mkdir|cd|sudo)\b(\s+(?:[a-z][\w-]*|-[\w-]+))?/

export function highlightLine(line, lang) {
  if (lang === 'js') {
    return tokenize(line, JS_TOKENS, ['tok-comment', 'tok-string', 'tok-keyword', 'tok-lit', 'tok-num'])
  }
  if (lang === 'json') {
    return tokenize(line, /("(?:[^"\\]|\\.)*")(?=\s*:)|("(?:[^"\\]|\\.)*")|\b(true|false|null)\b|\b(\d[\d.]*)\b/g,
      ['tok-key', 'tok-string', 'tok-lit', 'tok-num'])
  }

  if (line.trimStart().startsWith('#')) return <span className="tok-comment">{line}</span>

  let body = line
  let comment = null
  const hashIdx = line.search(/\s#\s/)
  if (hashIdx > -1 && lang !== 'dockerfile') {
    body = line.slice(0, hashIdx)
    comment = line.slice(hashIdx)
  }

  let content = body
  if (lang === 'dockerfile') {
    const m = body.match(DF_KW)
    if (m) content = <>{m[1]}<span className="tok-keyword">{m[2]}</span>{body.slice(m[0].length)}</>
  } else if (lang === 'yaml') {
    const m = body.match(/^(\s*-?\s*)([\w.-]+)(:)(.*)$/)
    if (m) content = <>{m[1]}<span className="tok-key">{m[2]}</span>:<span className="tok-string">{m[4]}</span></>
  } else if (lang === 'bash') {
    const env = body.match(/^([A-Z_]+=\S+\s+)+/)
    const prefix = env ? env[0] : ''
    const rest = body.slice(prefix.length)
    const m = rest.match(BASH_CMD)
    if (m) {
      content = (
        <>
          {prefix && <span className="tok-lit">{prefix}</span>}
          {m[1]}<span className="tok-cmd">{m[2]}</span>
          {m[3] && <span className="tok-sub">{m[3]}</span>}
          {rest.slice(m[0].length)}
        </>
      )
    }
  }

  return <>{content}{comment && <span className="tok-comment">{comment}</span>}</>
}
