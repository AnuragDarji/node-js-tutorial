import { redirect } from 'next/navigation'
import { topics } from '@/data/topics'

export default function LessonsIndex() {
  redirect(`/lessons/${topics[0].id}`)
}
