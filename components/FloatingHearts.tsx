
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newHeart = {
        id,
        left: `${Math.random() * 100}vw`,
        size: `${Math.random() * (30 - 10) + 10}px`,
        duration: `${Math.random() * (15 - 5) + 5}s`,
        delay: `${Math.random() * 2}s`,
      };
      setHearts((prev) => [...prev, newHeart].slice(-20)); // Keep only latest 20
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
            bottom: '-50px',
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
