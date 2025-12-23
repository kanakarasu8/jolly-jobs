// src/components/LeftPanel3D.js
import React, { useEffect, useState } from 'react';

const LeftPanel3D = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const generatedShapes = Array.from({ length: 25 }).map(() => ({
      size: Math.random() * 60 + 20, // 20px - 80px
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`, // random colors with slight transparency
    }));
    setShapes(generatedShapes);
  }, []);

  return (
    <>
      {shapes.map((shape, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: shape.size,
            height: shape.size,
            borderRadius: '50%',
            backgroundColor: shape.color,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            animation: `floatShape ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
            zIndex: 0,
          }}
        />
      ))}

      <style>
        {`
          @keyframes floatShape {
            0% { transform: translateY(0px) translateX(0px); opacity: 0.9; }
            50% { transform: translateY(-40px) translateX(20px); opacity: 0.5; }
            100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
          }
        `}
      </style>
    </>
  );
};

export default LeftPanel3D;
