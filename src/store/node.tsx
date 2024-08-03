import {
  NodeVersionListModel,
  isCurrent,
  isLTS,
  isStable,
  isUnstable,
  loadNodeVersionList,
} from "@/libs";
import { atom } from "jotai";

export const nodeAllVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeLtsVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeCurrentVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeStableVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeUnStableVersionAtom = atom<NodeVersionListModel[] | []>([]);

export const loadNodeVersionAtom = atom(
  null,
  async (_, set, isRefresh: boolean = false) => {
    const all = await loadNodeVersionList(isRefresh);
    let lts: NodeVersionListModel[] | [] = [];
    let current: NodeVersionListModel[] | [] = [];
    let stable: NodeVersionListModel[] | [] = [];
    let unstable: NodeVersionListModel[] | [] = [];

    set(nodeAllVersionAtom, all);

    if (all.length > 0) {
      lts = all.filter((data: NodeVersionListModel) => isLTS(data));
      current = all.filter((data: NodeVersionListModel) => isCurrent(data));
      stable = all.filter((data: NodeVersionListModel) => isStable(data));
      unstable = all.filter((data: NodeVersionListModel) => isUnstable(data));

      set(nodeLtsVersionAtom, lts);
      set(nodeCurrentVersionAtom, current);
      set(nodeStableVersionAtom, stable);
      set(nodeUnStableVersionAtom, unstable);
    }
  },
);

export const getNodeVersionCategoryAtom = atom(null, (get, _set) => {
  const all = get(nodeAllVersionAtom);
  const lts = get(nodeLtsVersionAtom);
  const current = get(nodeCurrentVersionAtom);
  const stable = get(nodeStableVersionAtom);
  const unstable = get(nodeUnStableVersionAtom);

  return {
    all,
    lts,
    current,
    stable,
    unstable,
  };
});
