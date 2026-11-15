// One video per topic in English (en) and Hindi (hi).
// Every id below was checked against its YouTube page title.
//
// Fields:
//   id       YouTube video id (the part after watch?v=)
//   title    video title as shown on YouTube
//   channel  channel name (optional)
//   note     short line shown under the video (optional)
//   fallback true when no dedicated video was picked for the topic and a
//            full course is shown instead
//
// To change a video, replace its id and title. To add a topic, add an entry
// whose key matches the topic id in data/topics.js.

const HINDI_FULL_COURSE = {
  id: 'Eafgk0GbEUg',
  title: 'Node.js Full Course in Hindi 2025 | Learn Node.js with Projects',
  channel: 'Code Step By Step',
}

const fallbackHi = (topic) => ({
  ...HINDI_FULL_COURSE,
  fallback: true,
  note: `No short Hindi video was picked for ${topic} yet, so this is a full Hindi Node.js course. Use “Search YouTube” below to find a topic-specific one.`,
})

export const videos = {
  'what-is-node': {
    en: {
      id: 'ENrzD9HAZK4',
      title: 'Node.js Ultimate Beginner’s Guide in 7 Easy Steps',
      channel: 'Fireship',
    },
    hi: {
      id: 'ydlUfmboeSQ',
      title: 'Node JS Tutorial in Hindi #1 – What is Node.js, V8 and how Node code runs',
    },
  },
  installation: {
    en: {
      id: 'ENrzD9HAZK4',
      title: 'Node.js Ultimate Beginner’s Guide in 7 Easy Steps',
      channel: 'Fireship',
      note: 'Installing Node with nvm and the REPL are covered in the first steps of this video.',
    },
    hi: fallbackHi('installing Node.js'),
  },
  modules: {
    en: {
      id: 'ENrzD9HAZK4',
      title: 'Node.js Ultimate Beginner’s Guide in 7 Easy Steps',
      channel: 'Fireship',
      note: 'Modules are covered in the last step of this video.',
    },
    hi: {
      id: 'FSRo41TaHFU',
      title: 'Modules in NodeJS',
      channel: 'Piyush Garg',
      note: 'Uses require() (CommonJS); the import/export ideas are the same.',
    },
  },
  npm: {
    en: {
      id: 'h0thRmdftnU',
      title: 'Everything You Need to Know to Get Started With npm | Node Package Manager Explained',
    },
    hi: {
      id: 'ORmB_ABimjM',
      title: 'How Versioning Works in NodeJS?',
      channel: 'Piyush Garg',
    },
  },
  async: {
    en: {
      id: '8aGhZQkoFbQ',
      title: 'What the heck is the event loop anyway?',
      channel: 'Philip Roberts · JSConf EU',
    },
    hi: {
      id: '_eJ6KAb56Gw',
      title: 'How NodeJS Works? – You don’t Know NodeJS',
      channel: 'Piyush Garg',
    },
  },
  'file-system': {
    en: {
      id: 'ENrzD9HAZK4',
      title: 'Node.js Ultimate Beginner’s Guide in 7 Easy Steps',
      channel: 'Fireship',
      note: 'The file system (fs) step shows both blocking and non-blocking reads.',
    },
    hi: {
      id: 'YazJFb_i4A0',
      title: 'File Handling in NodeJS',
      channel: 'Piyush Garg',
    },
  },
  streams: {
    en: {
      id: 'GlybFFMXXmQ',
      title: 'Node JS Tutorial for Beginners #13 – Streams and Buffers',
      channel: 'The Net Ninja',
    },
    hi: {
      id: '64LJJhT6Ybo',
      title: 'NodeJS Streams',
      channel: 'Piyush Garg',
    },
  },
  events: {
    en: {
      id: 'NtrnaTKqFPQ',
      title: 'Node JS Tutorial for Beginners #8 – The Node Event Emitter',
      channel: 'The Net Ninja',
    },
    hi: {
      id: '7QBb6n-Wj3A',
      title: 'Node JS in Hindi #46 – Events and Event Emitter',
      channel: 'Code Step By Step',
    },
  },
  http: {
    en: {
      id: 'IONBlM9fSjc',
      title: 'Creating HTTP Server with Nodejs',
    },
    hi: {
      id: 'ZQsrcayZcSk',
      title: 'Building HTTP Server in NodeJS',
      channel: 'Piyush Garg',
    },
  },
  express: {
    en: {
      id: 'L72fhGm1tfE',
      title: 'Express JS Crash Course',
      channel: 'Traversy Media',
    },
    hi: {
      id: 'uNCrMvkPUAE',
      title: 'Building REST API’s using Node and Express.js',
      channel: 'Piyush Garg',
    },
  },
  databases: {
    en: {
      id: 'DihOP19LQdg',
      title: 'Build a Rest API with NodeJS (JavaScript), Express, and PostgreSQL',
    },
    hi: {
      id: 'xrglM8U0Zv8',
      title: 'Connecting NodeJS with MongoDB',
      channel: 'Piyush Garg',
      note: 'Uses MongoDB with Mongoose instead of PostgreSQL; pools and schemas work the same way.',
    },
  },
  config: {
    en: {
      id: 'T_OlUb5YwaU',
      title: 'You DON’T NEED Dotenv to Handle Environment Variables in Node.js Anymore!',
      note: 'Covers the built-in --env-file flag used in this lesson.',
    },
    hi: {
      id: 'zoqW6qSjSfI',
      title: 'Manage Secrets & Configs using .DOTENV in NodeJS and MongoDB',
      note: 'Uses the dotenv package; modern Node can also load .env files with --env-file.',
    },
  },
  debugging: {
    en: {
      id: 'blBoIyNhGvY',
      title: 'Javascript Error Handling',
      channel: 'Dave Gray',
    },
    hi: fallbackHi('error handling and debugging'),
  },
  testing: {
    en: {
      id: 'FKnzS_icp20',
      title: 'Testing Node Server with Jest and Supertest',
      channel: 'Sam Meech-Ward',
      note: 'Uses Jest instead of node:test; describe, it and assertions work the same way.',
    },
    hi: fallbackHi('testing'),
  },
  production: {
    en: {
      id: 'g9P7s4O7YT4',
      title: 'Scaling NodeJS Applications with the native cluster module',
      note: 'Focuses on the “use every CPU core” part of this lesson.',
    },
    hi: fallbackHi('security and production'),
  },
  'cheat-sheet': {
    en: {
      id: 'Oe421EPjeBE',
      title: 'Node.js and Express.js – Full Course',
      channel: 'freeCodeCamp.org',
      note: 'A full course to review everything in one place.',
    },
    hi: {
      ...HINDI_FULL_COURSE,
      note: 'A full Hindi course to review everything in one place.',
    },
  },
}

export const LANGUAGES = [
  { code: 'en', label: 'English', searchSuffix: 'node js tutorial english' },
  { code: 'hi', label: 'हिन्दी', searchSuffix: 'node js tutorial in hindi' },
]
