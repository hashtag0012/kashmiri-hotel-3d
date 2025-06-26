"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Line {
  text: string
  className: string
}

interface MultiLineTypewriterProps {
  lines: Line[]
  loop?: boolean
  typeDelay?: number
  lineDelay?: number
}

export function MultiLineTypewriter({
  lines,
  loop = true,
  typeDelay = 50,
  lineDelay = 500,
}: MultiLineTypewriterProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [typedLines, setTypedLines] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLineIndex(0)
    setTypedLines([])
  }, [lines])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLineIndex(0)
          setTypedLines([])
        }
      },
      { threshold: 0.5 }
    )

    const ref = containerRef.current
    if (ref) {
      observer.observe(ref)
    }

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [])

  useEffect(() => {
    if (lineIndex >= lines.length) {
      if (loop) {
        const loopTimeout = setTimeout(() => {
          setLineIndex(0)
          setTypedLines([])
        }, lineDelay * 2)
        return () => clearTimeout(loopTimeout)
      }
      return
    }

    const currentLine = lines[lineIndex]
    const currentTyped = typedLines[lineIndex] || ""

    if (currentTyped.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setTypedLines((prev) => {
          const newTyped = [...prev]
          newTyped[lineIndex] = currentLine.text.substring(0, currentTyped.length + 1)
          return newTyped
        })
      }, typeDelay)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setLineIndex((prev) => prev + 1)
    }, lineDelay)
    return () => clearTimeout(timeout)
  }, [lineIndex, typedLines, lines, loop, typeDelay, lineDelay])

  return (
    <div ref={containerRef}>
      {lines.map((line, i) => (
        <div key={i} className={cn(line.className, "min-h-[1.2em]")}>
          {typedLines[i] || ""}
          {lineIndex === i && <span className="animate-pulse relative -left-1">|</span>}
        </div>
      ))}
    </div>
  )
} 