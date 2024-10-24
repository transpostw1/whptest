import React, { useState, useEffect } from "react";

const Ripple: React.FC = () => {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number }[]>([]);

  const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setRipples((prevRipples) => [...prevRipples, { x, y, size }]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 500); 
  };

  return (
    <div className="ripple-container" onMouseDown={addRipple}>
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
};

export default Ripple;
