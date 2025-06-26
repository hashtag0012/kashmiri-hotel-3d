"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Decoration {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  image: string;
}

const decorationsList: string[] = [
  '/decorations/clipart-leaves-tulsi-leaf-19.png', // Chinar leaf
  // Add more leaf images here if available
];

const Decorations = () => {
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  useEffect(() => {
    const generateDecorations = () => {
      const newDecorations: Decoration[] = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 100, // Start above the screen
        size: Math.random() * 40 + 20, // 20px to 60px
        rotation: Math.random() * 360,
        speed: Math.random() * 2 + 1, // 1 to 3
        image: decorationsList[Math.floor(Math.random() * decorationsList.length)],
      }));
      setDecorations(newDecorations);
    };

    generateDecorations();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {decorations.map((deco) => (
        <div
          key={deco.id}
          className="absolute"
          style={{
            left: `${deco.x}vw`,
            top: `${deco.y}vh`,
            width: `${deco.size}px`,
            height: `${deco.size}px`,
            transform: `rotate(${deco.rotation}deg)`,
            animation: `float-drift ${15 / deco.speed}s linear infinite`,
            animationDelay: `${Math.random() * -15}s`,
          }}
        >
          <Image src={deco.image} alt="Floating leaf" layout="fill" objectFit="contain" />
        </div>
      ))}
    </div>
  );
};

export default Decorations; 