import {
  NodeVersionDataModel,
  fetchNodeVersions,
  isCurrent,
  isLTS,
  isStable,
  isUnstable,
} from "@/libs";
import { atom } from "jotai";

export const allNodeAtom = atom<NodeVersionDataModel[] | []>([]);
export const ltsVersionsAtom = atom<NodeVersionDataModel[] | []>([]);
export const currentVersionsAtom = atom<NodeVersionDataModel[] | []>([]);
export const stableVersionsAtom = atom<NodeVersionDataModel[] | []>([]);
export const unStableVersionsAtom = atom<NodeVersionDataModel[] | []>([]);

export const loadNodeAtom = atom(null, async (_, set) => {
  const all = await fetchNodeVersions();
  let lts: NodeVersionDataModel[] | [] = [];
  let current: NodeVersionDataModel[] | [] = [];
  let stable: NodeVersionDataModel[] | [] = [];
  let unstable: NodeVersionDataModel[] | [] = [];

  set(allNodeAtom, all);

  if (all.length > 0) {
    lts = all.filter((data: NodeVersionDataModel) => isLTS(data));
    current = all.filter((data: NodeVersionDataModel) => isCurrent(data));
    stable = all.filter((data: NodeVersionDataModel) => isStable(data));
    unstable = all.filter((data: NodeVersionDataModel) => isUnstable(data));

    set(ltsVersionsAtom, lts);
    set(currentVersionsAtom, current);
    set(stableVersionsAtom, stable);
    set(unStableVersionsAtom, unstable);
  }
});

export const getNodeAtom = atom(null, (get, _set) => {
  const all = get(allNodeAtom);
  const lts = get(ltsVersionsAtom);
  const current = get(currentVersionsAtom);
  const stable = get(stableVersionsAtom);
  const unstable = get(unStableVersionsAtom);

  return {
    all,
    lts,
    current,
    stable,
    unstable,
  };
});
