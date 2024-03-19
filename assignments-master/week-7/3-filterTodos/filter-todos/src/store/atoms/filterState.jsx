import { atom } from "recoil";

export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});

export const todossState = atom({
  key: "todossState",
  default: {
    title: "",
    description: "",
  },
});
