import { atom } from "jotai";
import { nodeAtom } from "./config";
import { NodeVersionListModel } from "@/libs/models/node-version";
import { loadNodeVersionList } from "@/libs/utils/load-node-version-list";
import { isUnstable } from "@/libs/utils/node-filter";

export const nodeAllVersionAtom = atom<NodeVersionListModel[] | []>([]);

export const loadNodeVersionAtom = atom(
  null,
  async (get, set, isRefresh: boolean = false) => {
    const all = await loadNodeVersionList(isRefresh);

    set(nodeAllVersionAtom, all);

    if (all.length > 0) {
      all.filter((data: NodeVersionListModel) => isUnstable(data));

      const node = get(nodeAtom);

      const installedSet = new Set(node.installed);
      const active = node.active;

      all.filter((v: NodeVersionListModel) => {
        if (installedSet.has(v.version)) {
          v.status = "Installed";
        }

        if (active === v.version) {
          v.status = "Active";
        }
      });
    }
  },
);
