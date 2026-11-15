import CodeBlock from './CodeBlock.jsx'
import Inline from './Inline.jsx'

export default function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p><Inline text={block.text} /></p>
    case 'h':
      return <h3>{block.text}</h3>
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} title={block.title} />
    case 'list':
      return (
        <ul className="list">
          {block.items.map((item, i) => <li key={i}><Inline text={item} /></li>)}
        </ul>
      )
    case 'tip':
    case 'warn':
      return (
        <aside className={`callout callout-${block.type}`}>
          <span className="callout-label">{block.type === 'tip' ? 'Tip' : 'Careful'}</span>
          <p><Inline text={block.text} /></p>
        </aside>
      )
    case 'table':
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{block.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => <td key={c}><Inline text={cell} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}
