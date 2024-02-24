import { useState } from "react";
import { BusinessCard } from "./BusinessCard";
import "./App.css";

function App() {
  const [count, setCount] = useState();

  return (
    <div>
      <BusinessCard
        name="ruturaj"
        description="hello world i am rutu"
        interest1="coding"
        interest2="football"
        interest3="hello"
        social1="twitter"
        social2="insta"
      ></BusinessCard>
    </div>
  );
}

export default App;
