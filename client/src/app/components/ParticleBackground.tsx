'use client';
import React, { useState, useEffect } from 'react';

// Define the type for each circle
type Circle = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
};

export default function ParticleBackground() {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const generatedCircles: Circle[] = Array.from({ length: 40 }).map(() => ({
      cx: Math.random() * 800,
      cy: Math.random() * 600,
      r: Math.random() * 2 + 1,
      opacity: 0.07,
    }));
    setCircles(generatedCircles);
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 800 600"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, 5px); }
        }
        .float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
      `}</style>
      {circles.map((circle, i) => {
        const duration = 5 + Math.random() * 5;
        const delay = Math.random() * 5;
        return (
          <circle
            key={i}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="white"
            fillOpacity={circle.opacity}
            className="float"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
