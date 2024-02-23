import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  function createChild(title, description, id) {
    let markAsDone = document.createElement("button");
    markAsDone.innerHTML = "mark as done";
    let childDiv = document.createElement("div");
    childDiv.appendChild(title);
    childDiv.appendChild(description);
    childDiv.appendChild(markAsDone);
    let docBody = document.getElementsByTagName("body")[0];
    docBody.appendChild(childDiv);
    childDiv.setAttribute("id", id);
    markAsDone.addEventListener("click", () => {
      markAsDone.innerHTML = "done";
    });
  }
  let globalId = 0;
  function addTodo() {
    let todoTitle = document.getElementById("todoTitle").value;
    let todoDescription = document.getElementById("todoDescription").value;
    let newp = document.createElement("p");
    newp.innerHTML = todoTitle;

    let newp2 = document.createElement("p");
    newp2.innerHTML = todoDescription;
    createChild(newp, newp2, globalId++);
  }
  return (
    <>
      <input type="text" name="" id="todoTitle" />
      <input type="text" name="" id="todoDescription" />
      <button onClick={addTodo}>add todo</button>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
App();

export default App;
