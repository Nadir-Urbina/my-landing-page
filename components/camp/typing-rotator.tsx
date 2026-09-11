'use client'

import { useEffect, useRef, useState } from 'react'

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 2200

/**
 * Types each phrase out, holds it, deletes it, moves on. Roughly 4–5 seconds
 * per phrase depending on length.
 *
 * The animated text is hidden from assistive tech — a static list of every
 * phrase is rendered for screen readers instead, so nothing is announced on
 * a loop. Honours prefers-reduced-motion by swapping phrases without typing.
 */
export function TypingRotator({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!phrases.length) return
    const phrase = phrases[index % phrases.length]

    // Reduced motion: no character animation, just cycle the whole phrase
    if (reducedMotion.current) {
      setText(phrase)
      const timer = setTimeout(() => setIndex((i) => i + 1), HOLD_MS + 1200)
      return () => clearTimeout(timer)
    }

    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting && text === phrase) {
      timer = setTimeout(() => setIsDeleting(true), HOLD_MS)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setIndex((i) => i + 1)
      return
    } else {
      const next = isDeleting
        ? phrase.slice(0, text.length - 1)
        : phrase.slice(0, text.length + 1)
      timer = setTimeout(() => setText(next), isDeleting ? DELETE_MS : TYPE_MS)
    }

    return () => clearTimeout(timer)
  }, [text, isDeleting, index, phrases])

  return (
    <>
      <span aria-hidden="true" className="inline-flex items-baseline">
        <span className="bg-gradient-to-r from-[#F5A44A] to-[#D9652A] bg-clip-text text-transparent">
          {text}
        </span>
        <span className="ml-0.5 inline-block h-[1em] w-[2px] shrink-0 animate-pulse bg-[#F5A44A] align-middle" />
      </span>
      {/* Static equivalent for screen readers */}
      <span className="sr-only">{phrases.join(', ')}</span>
    </>
  )
}
