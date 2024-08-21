import {
  NodeVersionListModel,
  isCurrent,
  isLTS,
  isStable,
  isUnstable,
  loadNodeVersionList,
} from "@/libs";
import { atom } from "jotai";
import { toolsAtom } from "./config";
import { selectedToolAtom } from "./app";

export const nodeAllVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeLtsVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeCurrentVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeStableVersionAtom = atom<NodeVersionListModel[] | []>([]);
export const nodeUnStableVersionAtom = atom<NodeVersionListModel[] | []>([]);

export const loadNodeVersionAtom = atom(
  null,
  async (get, set, isRefresh: boolean = false) => {
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

      const tools = get(toolsAtom);
      const selectedTool = get(selectedToolAtom);
      const selectedConfig = tools[selectedTool!];

      const installedSet = new Set(selectedConfig.installed);
      const ltsVersions = lts.filter((v) => !installedSet.has(v.version));
      const currentVersions = current.filter((v) => !installedSet.has(v.version));
      const stableVersions = stable.filter((v) => !installedSet.has(v.version));
      const unStableVersions = unstable.filter((v) => !installedSet.has(v.version));

      set(nodeLtsVersionAtom, ltsVersions);
      set(nodeCurrentVersionAtom, currentVersions);
      set(nodeStableVersionAtom, stableVersions);
      set(nodeUnStableVersionAtom, unStableVersions);
    }
  },
);
