import { useState } from "react";
import { BusinessCard } from "./BusinessCard";

import "./App.css";

function App() {
  const [card, setCard] = useState([]);
  let input = {
    name: "",
    description: "",
    interest1: "",
    interest2: "",
    interest3: "",
    social_media1: "",
    social_medi2: "",
  };
  function onChangeHandler(e, vari) {
    input[vari] = e.target.value;
  }
  function onClickHandler() {
    setCard([
      ...card,
      {
        name: input.name,
        description: input.description,
        interest1: input.interest1,
        interest2: input.interest2,
        interest3: input.interest3,
        social_media1: input.social_media1,
        social_medi2: input.social_medi2,
      },
    ]);
  }

  return (
    <div>
      <div>
        <input
          onChange={(e) => onChangeHandler(e, "name")}
          placeholder="name"
          id="name"
        ></input>
        <input
          onChange={(e) => onChangeHandler(e, "description")}
          placeholder="description"
          id="description"
        ></input>
        <input
          onChange={(e) => onChangeHandler(e, "interest1")}
          placeholder="interest-1"
          id="interest-1"
        ></input>
        <input
          onChange={(e) => onChangeHandler(e, "interest2")}
          placeholder="interest-2"
          id="interest-2"
        ></input>
        <input
          onChange={(e) => onChangeHandler(e, "interest3")}
          placeholder="interest-3"
          id="interest-3"
        ></input>
        <input
          onChange={(e) => onChangeHandler(e, "social_media1")}
          placeholder="social_media-1"
          id="social_media-1"
        ></input>
        <input
          onChange={(e) => onChangeHandler(e, "social_medi2")}
          placeholder="social_media-2"
          id="social_media-2"
        ></input>
        <button id="btn" onClick={onClickHandler}>
          generate card
        </button>
      </div>
      {card.map((cards) => {
        return (
          <div>
            <BusinessCard
              name={cards.name}
              description={cards.description}
              interest1={cards.interest1}
              interest2={cards.interest2}
              interest3={cards.interest3}
              social1={cards.social_media1}
              social2={cards.social_medi2}
            ></BusinessCard>
          </div>
        );
      })}
    </div>
  );
}

export default App;
