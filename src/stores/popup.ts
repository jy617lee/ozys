import { atom } from "recoil";

export const popupsState = atom({
  key: "popupsState",
  default: [] as JSX.Element[],
});
