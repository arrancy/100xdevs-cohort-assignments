import { useEffect, useState } from "react";
import { todosAtom } from "./store/atoms/todos";
import { filterAtom } from "./store/atoms/filterState";
import { filteredTodos } from "./store/selectors/filterApplied";
import { todossState } from "./store/atoms/filterState";
import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function App() {
  return (
    <>
      <CreateTodo />
      <Filter></Filter>
      <TodoList />
    </>
  );
}

function CreateTodo() {
  const [todoList, setTodoList] = useRecoilState(todosAtom);
  const [todoInput, setTodoInput] = useRecoilState(todossState);

  function onClickHandler() {
    setTodoList([...todoList, { ...todoInput }]);
  }
  return (
    <>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTodoInput({ ...todoInput, title: e.target.value })}
      ></input>
      <input
        type="text"
        placeholder="description"
        onChange={(e) =>
          setTodoInput({ ...todoInput, description: e.target.value })
        }
      ></input>
      <button onClick={onClickHandler}>submit</button>
    </>
  );
}
function Filter() {
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  return (
    <>
      <br></br>
      add filter :
      <input
        type="text"
        onChange={(event) => {
          setFilterState(event.target.value);
        }}
        placeholder="filter"
      ></input>
    </>
  );
}

function TodoList() {
  const todos = useRecoilValue(filteredTodos);
  return (
    <>
      <div>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
