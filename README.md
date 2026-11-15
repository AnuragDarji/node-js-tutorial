# Node.js, Topic by Topic

A dark-mode Next.js course that takes you from your first `node` command to
deploying a production API.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

Every lesson is pre-rendered as a static page at `/lessons/<id>`.

## Project layout

- `app/page.js` — course home with the lesson list
- `app/lessons/[id]/page.js` — one page per lesson (statically generated)
- `app/lessons/layout.js` — sidebar + progress shell for lessons
- `components/` — sidebar, code blocks, callouts, lesson footer
- `data/topics.js` — **all lesson content**; edit or add topics here
- `data/videos.js` — the YouTube video for each lesson, in English and Hindi
- `app/fonts/` — fonts bundled locally with `next/font/local` (no network needed)

Block types in `topics.js`: `p`, `h`, `code`, `list`, `tip`, `warn`, `table`.
Wrap text in backticks for inline code and in `**double asterisks**` for bold.

Keyboard: ← / → move between lessons. Progress is saved in your browser.

## Lesson videos (English / हिन्दी)

Every lesson ends with a YouTube video. Use the **English / हिन्दी** switch to
pick the language; your choice is remembered for the next lessons. The player
loads only when you press play, so pages stay fast.

To swap a video, edit `data/videos.js`: put the new video id (the part after
`watch?v=`) and its title under the lesson's `en` or `hi` entry. Where no short
Hindi video was chosen for a topic, a full Hindi Node.js course is shown with a
note, plus a "Search YouTube" link for that topic.
