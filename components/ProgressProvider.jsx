'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'node-tutorial-done'
const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [done, setDone] = useState(() => new Set())
  const [loaded, setLoaded] = useState(false)

  // Read saved progress after hydration so server and client HTML match
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setDone(new Set(JSON.parse(raw)))
    } catch {
      /* storage unavailable */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]))
    } catch {
      /* progress lasts for this session only */
    }
  }, [done, loaded])

  const toggle = useCallback((id) => {
    setDone((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const markDone = useCallback((id) => {
    setDone((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const reset = useCallback(() => setDone(new Set()), [])

  return (
    <ProgressContext.Provider value={{ done, toggle, markDone, reset }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}
