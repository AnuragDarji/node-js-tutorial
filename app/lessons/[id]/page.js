import { notFound } from 'next/navigation'
import { topics } from '@/data/topics'
import Block from '@/components/Block'
import LessonFooter from '@/components/LessonFooter'
import VideoSection from '@/components/VideoSection'

export const dynamicParams = false

export function generateStaticParams() {
  return topics.map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const topic = topics.find((t) => t.id === id)
  return topic ? { title: topic.title, description: topic.summary } : {}
}

export default async function LessonPage({ params }) {
  const { id } = await params
  const index = topics.findIndex((t) => t.id === id)
  if (index === -1) notFound()

  const topic = topics[index]
  const prev = topics[index - 1]
  const next = topics[index + 1]

  return (
    <article className="lesson">
      <header className="lesson-head">
        <p className="lesson-step">
          Lesson {index + 1} of {topics.length} <span className="dot-sep" /> {topic.minutes} min read
        </p>
        <h1>{topic.title}</h1>
        <p className="lesson-summary">{topic.summary}</p>
      </header>

      <div className="lesson-body">
        {topic.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>

      <VideoSection topicId={topic.id} topicTitle={topic.title} />

      <LessonFooter
        id={topic.id}
        prev={prev && { id: prev.id, title: prev.title }}
        next={next && { id: next.id, title: next.title }}
      />
    </article>
  )
}
