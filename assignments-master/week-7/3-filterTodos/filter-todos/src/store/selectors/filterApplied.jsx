import { selector } from "recoil";
import { todosAtom } from "../atoms/todos";
import { filterAtom } from "../atoms/filterState";

export const filteredTodos = selector({
  key: "filteredTodos",
  get: ({ get }) => {
    const todoState = get(todosAtom);
    const filterState = get(filterAtom);
    return todoState.filter(
      (todo) =>
        todo.title.includes(filterState) ||
        todo.description.includes(filterState)
    );
  },
});
