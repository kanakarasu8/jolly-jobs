// src/components/WaterfallDrops.jsx
import React, { useEffect, useState } from "react";

const WaterfallDrops = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const totalDrops = 40;
    const newDrops = [];

    for (let i = 0; i < totalDrops; i++) {
      const size = Math.random() * 8 + 4; // 4-12px
      const left = Math.random() * 100; // % from left
      const delay = Math.random() * 5; // random delay
      const duration = Math.random() * 4 + 3; // 3-7s

      // Random gradient color for each drop
      const color1 = `hsl(${Math.random() * 360}, 70%, 60%)`;
      const color2 = `hsl(${Math.random() * 360}, 80%, 70%)`;

      newDrops.push({ id: i, size, left, delay, duration, color1, color2 });
    }

    setDrops(newDrops);
  }, []);

  return (
    <>
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute rounded-full shadow-lg"
          style={{
            width: `${drop.size}px`,
            height: `${drop.size * 1}px`,
            left: `${drop.left}%`,
            top: "-30px",
            background: `linear-gradient(to bottom, ${drop.color1}, ${drop.color2})`,
            boxShadow: `0 0 ${drop.size / 2}px rgba(36, 55, 199, 0.6)`,
            borderRadius: "50%",
            animation: `fall-${drop.id} ${drop.duration}s linear ${drop.delay}s infinite`,
            transformOrigin: "center top",
          }}
        ></div>
      ))}

      <style>
        {drops
          .map(
            (drop) => `
          @keyframes fall-${drop.id} {
            0% { transform: translateY(0) scaleY(1) rotate(0deg); opacity: 0; }
            30% { opacity: 1; }
            80% { transform: translateY(120vh) scaleY(1.2) rotate(${Math.random() * 15 - 7.5}deg); }
            100% { transform: translateY(120vh) scaleY(1.2) rotate(${Math.random() * 15 - 7.5}deg); opacity: 0; }
          }
        `
          )
          .join("")}
      </style>
    </>
  );
};

export default WaterfallDrops;
