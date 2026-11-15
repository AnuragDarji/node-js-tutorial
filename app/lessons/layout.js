import Sidebar from '@/components/Sidebar'

export default function LessonsLayout({ children }) {
  return (
    <div className="shell">
      <Sidebar />
      <main className="stage">{children}</main>
    </div>
  )
}
