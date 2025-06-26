"use client"

import Image from "next/image"

const LEAF_COUNT = 1

export function ChinarLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: LEAF_COUNT }).map((_, i) => {
        const size = Math.random() * 20 + 10 // 10px to 30px
        const animationDuration = Math.random() * 5 + 10 // 10s to 15s
        const animationDelay = Math.random() * 15 // 0s to 15s
        const initialX = Math.random() * 100 // 0% to 100%

        return (
          <div
            key={i}
            className="absolute -top-[10%]"
            style={{
              left: `${initialX}vw`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `fall ${animationDuration}s linear ${animationDelay}s infinite`,
              willChange: "transform, opacity",
            }}
          >
            <Image
              src="/decorations/clipart-leaves-tulsi-leaf-19.png"
              alt="Falling Leaf"
              layout="fill"
              objectFit="contain"
            />
          </div>
        )
      })}
    </div>
  )
} 