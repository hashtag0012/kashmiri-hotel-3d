"use client"

import Image from "next/image"
import { useState } from "react"

export function LoadingScreen() {
  const [dots, setDots] = useState(".")

  // Animate the dots
  useState(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."))
    }, 500)

    return () => clearInterval(dotsInterval)
  })

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
      <div className="animate-popup">
        <Image
          src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png"
          alt="Apple Haven Inn Logo"
          width={150}
          height={150}
          priority
        />
      </div>
      <p className="mt-8 text-lg text-gray-700 font-semibold text-center">
        Loading the 3D experience{dots}
      </p>
    </div>
  )
}