import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [color, setColor] = useState("white");

  const buttonRefs = new Array(7).fill(null).map(() => useRef());
  let colorsArray = [
    "white",
    "black",
    "red",
    "blue",
    "aqua",
    "brown",
    "purple",
  ];

  function handleClick(index) {
    let currentRef = buttonRefs[index];
    let currentColor = currentRef.current.innerHTML;
    setColor(currentColor);
  }

  return (
    <>
      <div
        style={{
          backgroundColor: color,
          height: "100vh",
          width: "100vw",
          textAlign: "center",
        }}
      >
        {colorsArray.map((colour, index) => {
          return (
            <button
              key={index}
              ref={buttonRefs[index]}
              onClick={() => {
                handleClick(index);
              }}
              style={{
                height: "40px",
                fontSize: "1.2rem",
                width: "150px",
                color: colour === "white" ? "black" : "white",
                backgroundColor: colour,
                borderRadius: "10px",
              }}
            >
              {colour}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
