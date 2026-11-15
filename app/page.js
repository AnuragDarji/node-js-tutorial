import Brand from '@/components/Brand'
import CourseList from '@/components/CourseList'
import { topics } from '@/data/topics'

export default function Home() {
  const minutes = topics.reduce((s, t) => s + t.minutes, 0)

  return (
    <main className="home">
      <header className="home-top">
        <Brand />
      </header>

      <section className="hero">
        <p className="kicker">A hands-on course</p>
        <h1>JavaScript on the server, one topic at a time.</h1>
        <p className="lede">
          Go from your first <code className="inline-code">node</code> command to a tested, production-ready API.
          {' '}{topics.length} lessons, about {minutes} minutes of reading, with every snippet ready to copy.
        </p>
        <CourseList />
      </section>
    </main>
  )
}
