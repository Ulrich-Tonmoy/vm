import { ToolType } from "@/libs";
import { atom } from "jotai";

export const selectedToolAtom = atom<ToolType>(ToolType.NULL);

export const updateSelectedToolAtom = atom(null, async (_get, set, type: ToolType) => {
  set(selectedToolAtom, type);
});
