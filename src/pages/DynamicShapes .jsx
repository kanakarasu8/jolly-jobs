// src/components/DynamicShapes.jsx
import React from "react";

const DynamicShapes = () => {
  const [shapes, setShapes] = React.useState([]);

  React.useEffect(() => {
    const totalShapes = 30; // increased number of shapes
    const newShapes = [];
    const types = ["circle", "rectangle", "sphere", "triangle", "hexagon"];

    for (let i = 0; i < totalShapes; i++) {
      const size = Math.random() * 60 + 20; // 20-80px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const speed = Math.random() * 8 + 3; // 3s-11s
      const type = types[Math.floor(Math.random() * types.length)];
      const text = Math.random() > 0.5 ? "FD" : "Fulcrum";
      const gradientColors = [
        "from-red-400 to-red-200",
        "from-yellow-400 to-yellow-200",
        "from-green-400 to-green-200",
        "from-blue-400 to-blue-200",
        "from-pink-500 to-pink-300",
        "from-purple-500 to-purple-300",
      ];
      const color = gradientColors[Math.floor(Math.random() * gradientColors.length)];

      newShapes.push({ id: i, size, top, left, speed, type, text, color });
    }
    setShapes(newShapes);
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute flex items-center justify-center text-white font-bold ${
            shape.type === "circle" ? `rounded-full bg-gradient-to-tr ${shape.color} shadow-lg` : ""
          } ${
            shape.type === "rectangle" ? `bg-gradient-to-br ${shape.color} shadow-md` : ""
          } ${
            shape.type === "sphere" ? `rounded-full bg-gradient-to-br ${shape.color} shadow-2xl` : ""
          } ${
            shape.type === "triangle"
              ? `w-0 h-0 border-l-[${shape.size / 2}px] border-r-[${shape.size / 2}px] border-b-[${shape.size}px] border-l-transparent border-r-transparent ${shape.color}`
              : ""
          } ${
            shape.type === "hexagon"
              ? `bg-gradient-to-tr ${shape.color} shadow-lg clip-hexagon`
              : ""
          }`}
          style={{
            width: shape.type === "triangle" ? 0 : `${shape.size}px`,
            height: shape.type === "triangle" ? 0 : `${shape.size}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            animation: `float-${shape.id} ${shape.speed}s ease-in-out infinite alternate`,
            zIndex: 0,
            fontSize: `${Math.min(shape.size / 4, 16)}px`,
            textAlign: "center",
            lineHeight: shape.type === "triangle" ? "0" : `${shape.size}px`,
          }}
        >
          {shape.type !== "triangle" ? shape.text : ""}
        </div>
      ))}

      <style>
        {`
          ${shapes
            .map(
              (shape) => `
            @keyframes float-${shape.id} {
              0% { transform: translate(0, 0) rotate(0deg) scale(1); }
              50% { transform: translate(${Math.random() * 80 - 40}px, ${
                Math.random() * 80 - 40
              }px) rotate(${Math.random() * 360}deg) scale(1.1); }
              100% { transform: translate(0, 0) rotate(0deg) scale(1); }
            }
          `
            )
            .join("")}

          .clip-hexagon {
            clip-path: polygon(
              25% 0%, 75% 0%, 
              100% 50%, 75% 100%, 
              25% 100%, 0% 50%
            );
          }
        `}
      </style>
    </>
  );
};

export default DynamicShapes;
