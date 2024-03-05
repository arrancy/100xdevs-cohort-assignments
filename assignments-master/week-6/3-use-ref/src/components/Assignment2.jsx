import React, { useState, useCallback, useRef, useEffect } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  const [render, forceRender] = useState(0);

  let aRef = useRef(0);

  aRef.current = aRef.current + 1;
  const handleReRender = () => {
    // Update state to force re-render
    forceRender(render + 1);
  };

  return (
    <div>
      <p>{aRef.current}</p>
      <button onClick={handleReRender}>Force Re-render </button>
    </div>
  );
}
