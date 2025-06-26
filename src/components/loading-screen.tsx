"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [slideOut, setSlideOut] = useState(false)
  const [dots, setDots] = useState(".")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Pop up for 9.3s, then slide out right for 0.7s (total 10s)
    timeoutRef.current = setTimeout(() => {
      setSlideOut(true)
      // After slide out, call onFinish
      setTimeout(() => {
        onFinish?.()
      }, 700) // match slide out duration
    }, 9300)

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."))
    }, 500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      clearInterval(dotsInterval)
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
      <div className={slideOut ? "animate-slide-out-right" : "animate-popup"}>
        <Image
          src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png"
          alt="Apple Haven Inn Logo"
          width={150}
          height={150}
          priority
        />
      </div>
      <p className="mt-8 text-lg text-gray-700 font-semibold text-center">
        Loading the website, hold on tight{dots}
      </p>
    </div>
  )
} 