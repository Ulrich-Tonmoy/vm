import { ToolType } from "@/libs";
import { atom } from "jotai";

export const selectedToolAtom = atom<ToolType | null>(null);
export const searchTermAtom = atom<string>("");

export const updateSelectedToolAtom = atom(null, async (_get, set, type: ToolType) => {
  set(selectedToolAtom, type);
});

export const updateSearchTermAtom = atom(null, async (_get, set, searchTerm: string) => {
  set(searchTermAtom, searchTerm);
});
