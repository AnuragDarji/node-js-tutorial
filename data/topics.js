// Each topic: { id, title, summary, minutes, blocks: [...] }
// Block types: p, h, code {lang, title?, code}, list {items}, tip, warn, table {head, rows}
// Wrap text in `backticks` for inline code and **double asterisks** for bold.

export const topics = [
  {
    id: 'what-is-node',
    title: 'What is Node.js?',
    summary: 'JavaScript outside the browser, and why it handles I/O so well.',
    minutes: 6,
    blocks: [
      { type: 'p', text: 'Node.js is a runtime that lets you run JavaScript outside the browser — on servers, in command-line tools and in build scripts. It combines Google’s V8 JavaScript engine with libuv, a C library that gives JavaScript access to files, networks, timers and processes.' },
      { type: 'h', text: 'The big idea: non-blocking I/O' },
      { type: 'p', text: 'A traditional server often dedicates a thread to each request. While that thread waits for a database or a file, it sits idle. Node runs your JavaScript on a single main thread and hands slow operations to the system. When the result is ready, a callback is queued and Node picks it up. One process can juggle thousands of connections this way.' },
      { type: 'code', lang: 'js', title: 'blocking-vs-non-blocking.js', code: `import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

// Blocking: nothing else runs until the file is read
const a = readFileSync('big.txt', 'utf8')

// Non-blocking: Node keeps working while the file loads
const b = await readFile('big.txt', 'utf8')` },
      { type: 'h', text: 'What Node is good at' },
      { type: 'table', head: ['Great fit', 'Less ideal'], rows: [
        ['REST and GraphQL APIs', 'Heavy number crunching on the main thread'],
        ['Real-time apps (chat, live dashboards)', 'Video encoding or ML training'],
        ['CLI tools and build tooling', 'Tasks better served by a compiled language'],
        ['Backends for React / Next.js apps', ''],
      ]},
      { type: 'h', text: 'Node vs. the browser' },
      { type: 'list', items: [
        '**Same language, different globals.** No `window` or `document` in Node; instead you get `process`, `Buffer` and built-in modules like `node:fs`.',
        '**Modern web APIs exist too.** `fetch`, `URL`, `AbortController`, `structuredClone` and Web Streams are built into Node.',
        '**You control the version.** No worrying about which browser your user has.',
      ]},
      { type: 'tip', text: 'CPU-heavy work blocks the event loop and freezes every request. Move it to `worker_threads` or a separate service.' },
    ],
  },
  {
    id: 'installation',
    title: 'Installing Node.js',
    summary: 'Install with a version manager, use the REPL and run your first file.',
    minutes: 5,
    blocks: [
      { type: 'p', text: 'Node releases a new major version every six months. Even-numbered versions become **LTS** (long-term support) and are the right choice for real projects.' },
      { type: 'h', text: 'Use a version manager' },
      { type: 'p', text: 'A version manager lets you switch Node versions per project. Use nvm on macOS and Linux, or fnm, which also works on Windows.' },
      { type: 'code', lang: 'bash', code: `# macOS / Linux: install nvm (check github.com/nvm-sh/nvm for the latest script)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

nvm install --lts      # install the current LTS
nvm use --lts
nvm ls                 # list installed versions

# Windows: fnm via winget
winget install Schniz.fnm
fnm install --lts` },
      { type: 'tip', text: 'Add a `.nvmrc` file containing a version number (for example `22`) to your project. Then `nvm use` picks the right version automatically.' },
      { type: 'h', text: 'Check the install' },
      { type: 'code', lang: 'bash', code: `node --version
npm --version` },
      { type: 'h', text: 'The REPL' },
      { type: 'p', text: 'Run `node` with no arguments to open an interactive prompt. It is handy for testing small snippets.' },
      { type: 'code', lang: 'bash', code: `node
> 2 + 2
4
> [1, 2, 3].map(n => n * 2)
[ 2, 4, 6 ]
> .exit` },
      { type: 'h', text: 'Run a file' },
      { type: 'code', lang: 'js', title: 'hello.js', code: `const name = process.argv[2] ?? 'world'
console.log(\`Hello, \${name}!\`)` },
      { type: 'code', lang: 'bash', code: `node hello.js            # Hello, world!
node hello.js Ada        # Hello, Ada!
node --watch hello.js    # rerun automatically when the file changes` },
    ],
  },
  {
    id: 'modules',
    title: 'Modules: import and export',
    summary: 'ES modules, CommonJS and how Node decides which one you are using.',
    minutes: 8,
    blocks: [
      { type: 'p', text: 'Node supports two module systems. **ES modules** (`import` / `export`) are the modern standard shared with browsers. **CommonJS** (`require` / `module.exports`) is the older Node format you will still see in many packages.' },
      { type: 'h', text: 'ES modules (recommended)' },
      { type: 'code', lang: 'js', title: 'math.js', code: `export function add(a, b) {
  return a + b
}

export const PI = 3.14159

export default function multiply(a, b) {
  return a * b
}` },
      { type: 'code', lang: 'js', title: 'app.js', code: `import multiply, { add, PI } from './math.js'

console.log(add(2, 3))      // 5
console.log(multiply(2, 3)) // 6` },
      { type: 'warn', text: 'In ES modules, relative imports need the file extension: `./math.js`, not `./math`.' },
      { type: 'h', text: 'Turn on ES modules' },
      { type: 'p', text: 'Node treats `.mjs` files as ES modules and `.cjs` files as CommonJS. For `.js` files, it checks the nearest `package.json`:' },
      { type: 'code', lang: 'json', title: 'package.json', code: `{
  "name": "my-app",
  "type": "module"
}` },
      { type: 'h', text: 'CommonJS' },
      { type: 'code', lang: 'js', code: `// math.cjs
function add(a, b) { return a + b }
module.exports = { add }

// app.cjs
const { add } = require('./math.cjs')
console.log(add(2, 3))` },
      { type: 'h', text: 'Comparison' },
      { type: 'table', head: ['', 'ES modules', 'CommonJS'], rows: [
        ['Syntax', '`import` / `export`', '`require` / `module.exports`'],
        ['Loading', 'Static, analyzed before running', 'Dynamic, at runtime'],
        ['Top-level `await`', 'Yes', 'No'],
        ['`__dirname`', 'Use `import.meta.dirname`', 'Available'],
        ['Browser compatible', 'Yes', 'No'],
      ]},
      { type: 'h', text: 'Built-in modules' },
      { type: 'p', text: 'Import Node’s own modules with the `node:` prefix. It makes clear the module is built in and cannot be confused with an npm package.' },
      { type: 'code', lang: 'js', code: `import path from 'node:path'
import os from 'node:os'

console.log(path.join(import.meta.dirname, 'data', 'users.json'))
console.log(os.cpus().length, 'CPU cores')` },
    ],
  },
  {
    id: 'npm',
    title: 'npm and package.json',
    summary: 'Install packages, write scripts and understand version ranges.',
    minutes: 9,
    blocks: [
      { type: 'p', text: 'npm (the Node Package Manager) ships with Node. It installs third-party packages from the npm registry and runs project scripts. Your project’s settings live in `package.json`.' },
      { type: 'h', text: 'Start a project' },
      { type: 'code', lang: 'bash', code: `mkdir my-app && cd my-app
npm init -y           # create package.json with defaults` },
      { type: 'h', text: 'Install packages' },
      { type: 'code', lang: 'bash', code: `npm install express          # runtime dependency
npm install -D eslint        # dev-only dependency
npm install                  # install everything in package.json
npm uninstall express
npm update                   # update within allowed ranges
npm outdated                 # see what is behind
npm ci                       # clean, exact install from the lockfile (use in CI)` },
      { type: 'h', text: 'A typical package.json' },
      { type: 'code', lang: 'json', title: 'package.json', code: `{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0"
  },
  "engines": {
    "node": ">=20"
  }
}` },
      { type: 'p', text: 'Run scripts with `npm run dev`. The names `start` and `test` are special and work without `run`: `npm start`, `npm test`.' },
      { type: 'h', text: 'Version ranges (semver)' },
      { type: 'p', text: 'Versions follow **MAJOR.MINOR.PATCH**. A major bump may break your code; minor adds features; patch fixes bugs.' },
      { type: 'table', head: ['Range', 'Allows', 'Example for 1.4.2'], rows: [
        ['`^1.4.2`', 'Minor and patch updates', '1.4.2 up to, not including, 2.0.0'],
        ['`~1.4.2`', 'Patch updates only', '1.4.2 up to 1.5.0'],
        ['`1.4.2`', 'Exactly this version', '1.4.2'],
        ['`*`', 'Anything (avoid)', 'Any version'],
      ]},
      { type: 'h', text: 'The lockfile' },
      { type: 'p', text: '`package-lock.json` records the exact version of every installed package, including dependencies of dependencies. Commit it so everyone, and your servers, get identical installs. Never commit `node_modules`.' },
      { type: 'h', text: 'npx' },
      { type: 'code', lang: 'bash', code: `npx create-next-app@latest my-site   # run a package without installing it globally
npx eslint .                          # run a locally installed tool` },
      { type: 'tip', text: 'Run `npm audit` to check dependencies for known vulnerabilities. Fewer dependencies means fewer things to audit.' },
    ],
  },
  {
    id: 'async',
    title: 'Async JavaScript and the event loop',
    summary: 'Callbacks, promises, async/await, and the order things really run in.',
    minutes: 12,
    blocks: [
      { type: 'p', text: 'Almost everything interesting in Node — reading files, querying databases, calling APIs — is asynchronous. Understanding how async code runs is the most important Node skill.' },
      { type: 'h', text: 'Three styles, same idea' },
      { type: 'code', lang: 'js', code: `import fs from 'node:fs'
import { readFile } from 'node:fs/promises'

// 1. Callbacks (older style, error-first)
fs.readFile('notes.txt', 'utf8', (err, data) => {
  if (err) return console.error(err)
  console.log(data)
})

// 2. Promises
readFile('notes.txt', 'utf8')
  .then((data) => console.log(data))
  .catch((err) => console.error(err))

// 3. async / await (the modern default)
try {
  const data = await readFile('notes.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}` },
      { type: 'h', text: 'Run things in parallel' },
      { type: 'p', text: 'Awaiting one call after another makes them run in sequence. When calls do not depend on each other, start them together:' },
      { type: 'code', lang: 'js', code: `// Sequential: total time = a + b + c
const user = await getUser(id)
const orders = await getOrders(id)

// Parallel: total time = the slowest one
const [user2, orders2] = await Promise.all([getUser(id), getOrders(id)])

// Keep going even if some fail
const results = await Promise.allSettled([taskA(), taskB()])` },
      { type: 'h', text: 'How the event loop orders work' },
      { type: 'p', text: 'Node runs your synchronous code first. Then it drains the **microtask** queue (resolved promises and `process.nextTick`) before moving on to **macrotasks** such as timers and I/O callbacks.' },
      { type: 'code', lang: 'js', title: 'order.js', code: `console.log('1: sync')

setTimeout(() => console.log('5: timeout'), 0)
setImmediate(() => console.log('6: immediate'))

Promise.resolve().then(() => console.log('4: promise'))
process.nextTick(() => console.log('3: nextTick'))

console.log('2: sync')` },
      { type: 'p', text: 'This prints 1, 2, 3, 4, then 5 and 6. Outside an I/O callback, the order of `setTimeout(…, 0)` and `setImmediate` is not guaranteed.' },
      { type: 'h', text: 'Never block the loop' },
      { type: 'code', lang: 'js', code: `// This freezes the whole server for every user
app.get('/slow', (req, res) => {
  const end = Date.now() + 5000
  while (Date.now() < end) {}   // busy-wait: blocks everything
  res.send('done')
})` },
      { type: 'warn', text: 'Unhandled promise rejections crash the process in modern Node. Always `await` inside `try/catch` or attach a `.catch()`.' },
      { type: 'h', text: 'Cancel slow work' },
      { type: 'code', lang: 'js', code: `// Give up on a request after 5 seconds
const res = await fetch('https://api.example.com/data', {
  signal: AbortSignal.timeout(5000),
})` },
    ],
  },
  {
    id: 'file-system',
    title: 'Files and paths',
    summary: 'Read, write and organize files with fs/promises and path.',
    minutes: 8,
    blocks: [
      { type: 'p', text: 'The `node:fs/promises` module gives you promise-based file operations. Pair it with `node:path` so paths work on Windows, macOS and Linux alike.' },
      { type: 'h', text: 'Read and write' },
      { type: 'code', lang: 'js', code: `import { readFile, writeFile, appendFile } from 'node:fs/promises'

const text = await readFile('notes.txt', 'utf8')

await writeFile('out.txt', 'Hello\\n')        // create or overwrite
await appendFile('log.txt', 'New line\\n')    // add to the end

// JSON round trip
const config = JSON.parse(await readFile('config.json', 'utf8'))
config.updatedAt = new Date().toISOString()
await writeFile('config.json', JSON.stringify(config, null, 2))` },
      { type: 'h', text: 'Folders' },
      { type: 'code', lang: 'js', code: `import { mkdir, readdir, rm, stat, rename } from 'node:fs/promises'

await mkdir('uploads/2026', { recursive: true })   // create nested folders
const entries = await readdir('uploads', { withFileTypes: true })
for (const e of entries) console.log(e.name, e.isDirectory() ? 'dir' : 'file')

const info = await stat('notes.txt')
console.log(info.size, 'bytes, modified', info.mtime)

await rename('old.txt', 'new.txt')
await rm('tmp', { recursive: true, force: true })   // delete a folder` },
      { type: 'h', text: 'Paths done right' },
      { type: 'code', lang: 'js', code: `import path from 'node:path'

// Build paths relative to this file, not the current working directory
const dataFile = path.join(import.meta.dirname, 'data', 'users.json')

path.basename('/a/b/photo.jpg')       // 'photo.jpg'
path.extname('photo.jpg')             // '.jpg'
path.resolve('src', 'index.js')       // absolute path
path.relative('/a/b', '/a/c/d')       // '../c/d'` },
      { type: 'tip', text: 'Relative paths like `./data.json` are resolved from where you ran `node`, not from the file’s location. Use `import.meta.dirname` (or `__dirname` in CommonJS) to anchor them.' },
      { type: 'h', text: 'Watch for changes' },
      { type: 'code', lang: 'js', code: `import { watch } from 'node:fs/promises'

for await (const event of watch('./content')) {
  console.log(event.eventType, event.filename)
}` },
    ],
  },
  {
    id: 'streams',
    title: 'Streams and buffers',
    summary: 'Process large data piece by piece without running out of memory.',
    minutes: 9,
    blocks: [
      { type: 'p', text: '`readFile` loads the whole file into memory. That is fine for small files, but a 4 GB log would crash your app. Streams process data in chunks, so memory use stays flat no matter how large the input is.' },
      { type: 'h', text: 'Four kinds of streams' },
      { type: 'table', head: ['Type', 'Does', 'Examples'], rows: [
        ['Readable', 'Produces data', '`fs.createReadStream`, an HTTP request'],
        ['Writable', 'Consumes data', '`fs.createWriteStream`, an HTTP response'],
        ['Duplex', 'Both, independently', 'A TCP socket'],
        ['Transform', 'Modifies data passing through', '`zlib.createGzip()`'],
      ]},
      { type: 'h', text: 'Connect streams with pipeline' },
      { type: 'code', lang: 'js', title: 'compress.js', code: `import { createReadStream, createWriteStream } from 'node:fs'
import { createGzip } from 'node:zlib'
import { pipeline } from 'node:stream/promises'

// Compress a huge file using a few kilobytes of memory
await pipeline(
  createReadStream('access.log'),
  createGzip(),
  createWriteStream('access.log.gz'),
)
console.log('Compressed')` },
      { type: 'p', text: '`pipeline` handles **backpressure** (pausing a fast reader when the writer is slow) and cleans up every stream if one of them fails. Prefer it over `.pipe()`.' },
      { type: 'h', text: 'Read line by line' },
      { type: 'code', lang: 'js', code: `import { createReadStream } from 'node:fs'
import readline from 'node:readline'

const rl = readline.createInterface({ input: createReadStream('access.log') })
let errors = 0
for await (const line of rl) {
  if (line.includes(' 500 ')) errors++
}
console.log(errors, 'server errors')` },
      { type: 'h', text: 'Write your own transform' },
      { type: 'code', lang: 'js', code: `import { Transform } from 'node:stream'

const upper = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  },
})

process.stdin.pipe(upper).pipe(process.stdout)` },
      { type: 'h', text: 'Buffers' },
      { type: 'p', text: 'A `Buffer` holds raw bytes. Stream chunks are buffers unless you set an encoding.' },
      { type: 'code', lang: 'js', code: `const buf = Buffer.from('Hello', 'utf8')
console.log(buf)                    // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString('base64')) // 'SGVsbG8='
console.log(buf.length)             // 5 bytes` },
    ],
  },
  {
    id: 'events',
    title: 'Events and EventEmitter',
    summary: 'The publish-subscribe pattern behind much of Node’s core.',
    minutes: 6,
    blocks: [
      { type: 'p', text: 'Many Node objects — servers, streams, processes — are **event emitters**. They announce that something happened, and any number of listeners react. You can use the same pattern in your own code.' },
      { type: 'code', lang: 'js', title: 'orders.js', code: `import { EventEmitter } from 'node:events'

class OrderService extends EventEmitter {
  place(order) {
    // ...save the order...
    this.emit('placed', order)
  }
}

const orders = new OrderService()

orders.on('placed', (order) => console.log('Send email for', order.id))
orders.on('placed', (order) => console.log('Update stock for', order.id))
orders.once('placed', () => console.log('First order of the day!'))

orders.place({ id: 42 })` },
      { type: 'h', text: 'Key methods' },
      { type: 'table', head: ['Method', 'Purpose'], rows: [
        ['`on(name, fn)`', 'Listen every time the event fires'],
        ['`once(name, fn)`', 'Listen only for the next occurrence'],
        ['`off(name, fn)`', 'Remove a listener'],
        ['`emit(name, ...args)`', 'Fire the event, calling listeners synchronously in order'],
        ['`listenerCount(name)`', 'How many listeners are attached'],
      ]},
      { type: 'h', text: 'The special "error" event' },
      { type: 'warn', text: 'If an emitter fires `error` and nobody listens, Node throws and the process crashes. Always attach an `error` listener to streams, sockets and your own emitters.' },
      { type: 'code', lang: 'js', code: `orders.on('error', (err) => console.error('Order failed:', err.message))
orders.emit('error', new Error('Payment declined'))` },
      { type: 'h', text: 'Await an event' },
      { type: 'code', lang: 'js', code: `import { once } from 'node:events'

const [order] = await once(orders, 'placed')
console.log('Got order', order.id)` },
      { type: 'tip', text: 'Listeners added in a loop or per request can pile up. Node warns after 10 listeners on one event — usually a sign of a leak.' },
    ],
  },
  {
    id: 'http',
    title: 'An HTTP server from scratch',
    summary: 'Build a small JSON API with only the built-in http module.',
    minutes: 9,
    blocks: [
      { type: 'p', text: 'Frameworks make servers easier, but seeing the raw version shows what they do for you. The built-in `node:http` module handles requests and responses directly.' },
      { type: 'code', lang: 'js', title: 'server.js', code: `import http from 'node:http'

const todos = [{ id: 1, title: 'Learn Node', done: false }]

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

async function readBody(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  return body ? JSON.parse(body) : {}
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`)

  if (req.method === 'GET' && url.pathname === '/todos') {
    return sendJson(res, 200, todos)
  }

  if (req.method === 'POST' && url.pathname === '/todos') {
    try {
      const { title } = await readBody(req)
      if (!title) return sendJson(res, 400, { error: 'title is required' })
      const todo = { id: todos.length + 1, title, done: false }
      todos.push(todo)
      return sendJson(res, 201, todo)
    } catch {
      return sendJson(res, 400, { error: 'Invalid JSON' })
    }
  }

  sendJson(res, 404, { error: 'Not found' })
})

server.listen(3000, () => console.log('http://localhost:3000'))` },
      { type: 'h', text: 'Try it' },
      { type: 'code', lang: 'bash', code: `curl http://localhost:3000/todos

curl -X POST http://localhost:3000/todos \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Write tests"}'` },
      { type: 'h', text: 'Common status codes' },
      { type: 'table', head: ['Code', 'Meaning'], rows: [
        ['200 OK', 'Success'],
        ['201 Created', 'A new resource was created'],
        ['204 No Content', 'Success with no body (often after DELETE)'],
        ['400 Bad Request', 'The client sent invalid data'],
        ['401 / 403', 'Not logged in / not allowed'],
        ['404 Not Found', 'No such route or resource'],
        ['500 Internal Server Error', 'Something broke on the server'],
      ]},
      { type: 'h', text: 'Making requests from Node' },
      { type: 'code', lang: 'js', code: `const res = await fetch('https://api.github.com/repos/nodejs/node')
if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
const repo = await res.json()
console.log(repo.stargazers_count, 'stars')` },
      { type: 'tip', text: 'Routing, body parsing and error handling by hand get repetitive fast. That is exactly what Express solves — next lesson.' },
    ],
  },
  {
    id: 'express',
    title: 'Building APIs with Express',
    summary: 'Routes, middleware and error handling in the most popular framework.',
    minutes: 12,
    blocks: [
      { type: 'code', lang: 'bash', code: `npm install express` },
      { type: 'h', text: 'A REST API in one file' },
      { type: 'code', lang: 'js', title: 'src/server.js', code: `import express from 'express'

const app = express()
app.use(express.json())        // parse JSON request bodies

let nextId = 2
const todos = [{ id: 1, title: 'Learn Express', done: false }]

app.get('/todos', (req, res) => {
  const { done } = req.query                 // /todos?done=true
  const list = done ? todos.filter((t) => String(t.done) === done) : todos
  res.json(list)
})

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id))
  if (!todo) return res.status(404).json({ error: 'Not found' })
  res.json(todo)
})

app.post('/todos', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'title is required' })
  const todo = { id: nextId++, title, done: false }
  todos.push(todo)
  res.status(201).json(todo)
})

app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id))
  if (!todo) return res.status(404).json({ error: 'Not found' })
  Object.assign(todo, req.body)
  res.json(todo)
})

app.delete('/todos/:id', (req, res) => {
  const i = todos.findIndex((t) => t.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'Not found' })
  todos.splice(i, 1)
  res.status(204).end()
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(\`API on http://localhost:\${PORT}\`))` },
      { type: 'h', text: 'Middleware' },
      { type: 'p', text: 'Middleware is a function that runs between the request arriving and the route handler. It can read or change `req` and `res`, end the response, or call `next()` to pass control along.' },
      { type: 'code', lang: 'js', code: `// Log every request
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    console.log(req.method, req.url, res.statusCode, \`\${Date.now() - start}ms\`)
  })
  next()
})

// Protect routes
function requireApiKey(req, res, next) {
  if (req.get('x-api-key') !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' })
  }
  next()
}
app.delete('/todos/:id', requireApiKey, deleteTodo)` },
      { type: 'h', text: 'Organize with routers' },
      { type: 'code', lang: 'js', title: 'src/routes/todos.js', code: `import { Router } from 'express'
const router = Router()

router.get('/', listTodos)
router.post('/', createTodo)

export default router

// in server.js
// app.use('/todos', todosRouter)` },
      { type: 'h', text: 'Central error handling' },
      { type: 'p', text: 'An error handler has four parameters. In Express 5, errors thrown inside `async` route handlers are passed to it automatically.' },
      { type: 'code', lang: 'js', code: `app.get('/users/:id', async (req, res) => {
  const user = await db.findUser(req.params.id)  // if this throws...
  res.json(user)
})

// ...it lands here. Register this after all routes.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status ?? 500).json({ error: 'Something went wrong' })
})` },
      { type: 'tip', text: 'Useful middleware packages: `helmet` (security headers), `cors` (cross-origin requests), `express-rate-limit` (throttling). Fastify and Hono are popular faster alternatives with a similar style.' },
    ],
  },
  {
    id: 'databases',
    title: 'Working with databases',
    summary: 'Connect to PostgreSQL safely with connection pools and parameters.',
    minutes: 10,
    blocks: [
      { type: 'p', text: 'Most apps store data in a database. This lesson uses PostgreSQL with the `pg` package; the same ideas apply to MySQL, SQLite and MongoDB.' },
      { type: 'code', lang: 'bash', code: `npm install pg

# Start a local Postgres with Docker
docker run -d --name pg -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres:16` },
      { type: 'h', text: 'A shared connection pool' },
      { type: 'p', text: 'Opening a connection is slow. A pool keeps a few open and lends them out per query. Create one pool for the whole app.' },
      { type: 'code', lang: 'js', title: 'src/db.js', code: `import pg from 'pg'

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,   // at most 10 open connections
})

export const query = (text, params) => pool.query(text, params)` },
      { type: 'h', text: 'Queries with parameters' },
      { type: 'code', lang: 'js', code: `import { query } from './db.js'

await query(\`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false
  )\`)

const { rows } = await query(
  'INSERT INTO todos (title) VALUES ($1) RETURNING *',
  ['Learn SQL'],
)
console.log(rows[0])

const { rows: open } = await query('SELECT * FROM todos WHERE done = $1', [false])` },
      { type: 'warn', text: 'Never build SQL by gluing strings together with user input, like `\'... WHERE id = \' + req.params.id`. That allows SQL injection. Always pass values as parameters (`$1`, `$2`).' },
      { type: 'h', text: 'Transactions' },
      { type: 'p', text: 'When several writes must succeed or fail together, use a transaction on a single client from the pool:' },
      { type: 'code', lang: 'js', code: `const client = await pool.connect()
try {
  await client.query('BEGIN')
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [100, fromId])
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [100, toId])
  await client.query('COMMIT')
} catch (err) {
  await client.query('ROLLBACK')
  throw err
} finally {
  client.release()   // always return the client to the pool
}` },
      { type: 'h', text: 'ORMs and query builders' },
      { type: 'table', head: ['Tool', 'Style'], rows: [
        ['Prisma', 'Schema file + generated, type-safe client'],
        ['Drizzle', 'SQL-like TypeScript query builder'],
        ['Knex', 'Query builder with migrations'],
        ['Mongoose', 'Schemas and models for MongoDB'],
      ]},
      { type: 'tip', text: 'Keep schema changes in migration files under version control rather than running `CREATE TABLE` by hand on each server.' },
    ],
  },
  {
    id: 'config',
    title: 'Environment and configuration',
    summary: 'process.env, .env files and failing fast on bad settings.',
    minutes: 6,
    blocks: [
      { type: 'p', text: 'Settings that change between environments — ports, database URLs, API keys — belong in environment variables, not in your code.' },
      { type: 'code', lang: 'bash', code: `PORT=4000 NODE_ENV=production node src/server.js` },
      { type: 'code', lang: 'js', code: `const port = Number(process.env.PORT ?? 3000)
const isProd = process.env.NODE_ENV === 'production'` },
      { type: 'h', text: '.env files' },
      { type: 'p', text: 'Modern Node loads `.env` files natively — no extra package required.' },
      { type: 'code', lang: 'bash', title: '.env', code: `PORT=3000
DATABASE_URL=postgres://postgres:secret@localhost:5432/app
API_KEY=dev-only-key` },
      { type: 'code', lang: 'bash', code: `node --env-file=.env src/server.js

# Don't fail if the file is missing (handy in production)
node --env-file-if-exists=.env src/server.js` },
      { type: 'warn', text: 'Add `.env` to `.gitignore`. Commit a `.env.example` with the variable names and dummy values instead, so teammates know what to set.' },
      { type: 'h', text: 'Validate config at startup' },
      { type: 'p', text: 'Crash immediately with a clear message if something is missing, instead of failing mysteriously on the first request.' },
      { type: 'code', lang: 'js', title: 'src/config.js', code: `function required(name) {
  const value = process.env[name]
  if (!value) throw new Error(\`Missing environment variable: \${name}\`)
  return value
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required('DATABASE_URL'),
  apiKey: required('API_KEY'),
  isProd: process.env.NODE_ENV === 'production',
}` },
      { type: 'tip', text: 'Libraries like `zod` or `envalid` validate types too — for example, rejecting `PORT=abc`.' },
    ],
  },
  {
    id: 'debugging',
    title: 'Errors and debugging',
    summary: 'Handle failures cleanly and step through code with the inspector.',
    minutes: 9,
    blocks: [
      { type: 'h', text: 'Two kinds of errors' },
      { type: 'list', items: [
        '**Operational errors** are expected in a running system: a file is missing, a network call times out, input is invalid. Handle them and respond sensibly.',
        '**Programmer errors** are bugs: reading a property of `undefined`, a typo in a function name. Fix the code; do not try to recover at runtime.',
      ]},
      { type: 'h', text: 'Custom error classes' },
      { type: 'code', lang: 'js', code: `export class NotFoundError extends Error {
  constructor(what) {
    super(\`\${what} not found\`)
    this.name = 'NotFoundError'
    this.status = 404
  }
}

// Wrap low-level errors without losing the original
try {
  await readFile(path)
} catch (err) {
  throw new Error(\`Could not load settings from \${path}\`, { cause: err })
}` },
      { type: 'h', text: 'Last-resort handlers' },
      { type: 'code', lang: 'js', code: `process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  process.exit(1)   // state may be corrupted: restart cleanly
})` },
      { type: 'warn', text: 'Do not keep running after an uncaught exception. Log it, exit, and let a process manager or container platform restart the app.' },
      { type: 'h', text: 'Debug with the inspector' },
      { type: 'code', lang: 'bash', code: `node --inspect src/server.js       # attach a debugger any time
node --inspect-brk src/server.js   # pause on the first line` },
      { type: 'p', text: 'Open `chrome://inspect` in Chrome and click your process, or press F5 in VS Code. Set breakpoints, step through code and inspect variables. Put a `debugger` statement in your code to pause right there.' },
      { type: 'h', text: 'Better console output' },
      { type: 'code', lang: 'js', code: `console.table([{ id: 1, ok: true }, { id: 2, ok: false }])
console.dir(deepObject, { depth: null })   // show nested objects fully
console.time('query'); await runQuery(); console.timeEnd('query')
console.trace('How did we get here?')` },
      { type: 'tip', text: '`node --trace-warnings` shows where a warning came from, and `node --cpu-prof` writes a CPU profile you can open in Chrome DevTools to find slow code.' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing with node:test',
    summary: 'Write and run tests using the test runner built into Node.',
    minutes: 8,
    blocks: [
      { type: 'p', text: 'Node ships with a test runner and assertion library, so you can start testing with zero dependencies.' },
      { type: 'code', lang: 'js', title: 'src/cart.js', code: `export function total(items, discount = 0) {
  if (discount < 0 || discount > 1) throw new RangeError('discount must be 0–1')
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0)
  return Math.round(sum * (1 - discount) * 100) / 100
}` },
      { type: 'code', lang: 'js', title: 'src/cart.test.js', code: `import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { total } from './cart.js'

describe('total', () => {
  it('adds up price × quantity', () => {
    assert.equal(total([{ price: 2.5, qty: 2 }, { price: 1, qty: 3 }]), 8)
  })

  it('applies a discount', () => {
    assert.equal(total([{ price: 100, qty: 1 }], 0.2), 80)
  })

  it('rejects an invalid discount', () => {
    assert.throws(() => total([], 2), RangeError)
  })

  it('works with async code', async () => {
    const res = await Promise.resolve(total([]))
    assert.equal(res, 0)
  })
})` },
      { type: 'h', text: 'Run the tests' },
      { type: 'code', lang: 'bash', code: `node --test                         # finds *.test.js files automatically
node --test --watch                 # rerun on changes
node --test --experimental-test-coverage` },
      { type: 'h', text: 'Useful assertions' },
      { type: 'table', head: ['Assertion', 'Checks'], rows: [
        ['`assert.equal(a, b)`', 'Strict equality (`===`)'],
        ['`assert.deepEqual(a, b)`', 'Objects and arrays have the same contents'],
        ['`assert.ok(value)`', 'Value is truthy'],
        ['`assert.throws(fn, Err)`', 'Function throws'],
        ['`assert.rejects(promise)`', 'Promise rejects'],
        ['`assert.match(str, /re/)`', 'String matches a pattern'],
      ]},
      { type: 'h', text: 'Mocks' },
      { type: 'code', lang: 'js', code: `import { it, mock } from 'node:test'

it('calls the notifier once', () => {
  const notify = mock.fn()
  placeOrder({ id: 1 }, notify)
  assert.equal(notify.mock.callCount(), 1)
})` },
      { type: 'tip', text: 'Test HTTP APIs end to end by starting your app on a random port (`app.listen(0)`) and calling it with `fetch`. Vitest and Jest are popular alternatives with extra features.' },
    ],
  },
  {
    id: 'production',
    title: 'Security and production',
    summary: 'Harden, scale and deploy a Node app you can trust.',
    minutes: 10,
    blocks: [
      { type: 'h', text: 'Security checklist' },
      { type: 'list', items: [
        'Validate every input from users (body, query, params, headers) — for example with `zod`.',
        'Use parameterized queries; never concatenate SQL.',
        'Add security headers with `helmet` and restrict CORS to the origins you trust.',
        'Rate-limit login and other sensitive endpoints.',
        'Hash passwords with `bcrypt` or `argon2`, never store them in plain text.',
        'Keep secrets in environment variables or a secret manager.',
        'Run `npm audit` and keep Node and dependencies up to date.',
        'Return generic error messages to clients; log the details on the server.',
      ]},
      { type: 'h', text: 'Graceful shutdown' },
      { type: 'p', text: 'When a platform stops your app, it sends SIGTERM. Finish in-flight requests and close database connections before exiting.' },
      { type: 'code', lang: 'js', code: `const server = app.listen(PORT)

process.on('SIGTERM', () => {
  console.log('Shutting down…')
  server.close(async () => {
    await pool.end()
    process.exit(0)
  })
  setTimeout(() => process.exit(1), 10_000).unref()   // force quit after 10s
})` },
      { type: 'h', text: 'Use every CPU core' },
      { type: 'p', text: 'One Node process uses one core for JavaScript. To use more, run several processes behind a load balancer — with the `cluster` module, PM2, or multiple container replicas.' },
      { type: 'code', lang: 'bash', code: `npm install -g pm2
pm2 start src/server.js -i max --name api   # one process per core
pm2 logs api
pm2 reload api                              # zero-downtime restart` },
      { type: 'h', text: 'Structured logging' },
      { type: 'code', lang: 'js', code: `import pino from 'pino'
const log = pino()

log.info({ userId: 42, orderId: 7 }, 'order placed')
// {"level":30,"time":...,"userId":42,"orderId":7,"msg":"order placed"}` },
      { type: 'h', text: 'Containerize it' },
      { type: 'code', lang: 'dockerfile', title: 'Dockerfile', code: `FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]` },
      { type: 'tip', text: 'Set `NODE_ENV=production`. Many libraries, including Express, switch on faster, less verbose behavior when they see it.' },
    ],
  },
  {
    id: 'cheat-sheet',
    title: 'Node.js cheat sheet',
    summary: 'The commands and snippets you reach for every day.',
    minutes: 3,
    blocks: [
      { type: 'h', text: 'Node CLI' },
      { type: 'code', lang: 'bash', code: `node app.js                       # run a file
node --watch app.js               # rerun on save
node --env-file=.env app.js       # load environment variables
node --test                       # run tests
node --inspect app.js             # attach a debugger
node -e "console.log(1 + 1)"      # run a one-liner` },
      { type: 'h', text: 'npm' },
      { type: 'code', lang: 'bash', code: `npm init -y
npm install pkg | npm i -D pkg
npm uninstall pkg
npm ci                            # exact install from the lockfile
npm run <script>
npm outdated | npm update
npm audit
npx <tool>` },
      { type: 'h', text: 'Everyday imports' },
      { type: 'code', lang: 'js', code: `import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { EventEmitter, once } from 'node:events'
import { setTimeout as sleep } from 'node:timers/promises'
import { randomUUID } from 'node:crypto'
import assert from 'node:assert/strict'` },
      { type: 'h', text: 'Handy snippets' },
      { type: 'code', lang: 'js', code: `await sleep(1000)                                   // wait 1 second
const id = randomUUID()                             // unique id
const here = import.meta.dirname                    // this file's folder
const [a, b] = await Promise.all([taskA(), taskB()])
const res = await fetch(url, { signal: AbortSignal.timeout(5000) })` },
      { type: 'tip', text: 'Run `node --help` to list every flag, or browse the API docs at nodejs.org/api.' },
    ],
  },
]
