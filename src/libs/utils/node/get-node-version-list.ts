import { useAtomValue } from "jotai";
import { VersionType } from "@/libs";
import {
  nodeAllVersionAtom,
  nodeCurrentVersionAtom,
  nodeLtsVersionAtom,
  nodeStableVersionAtom,
  nodeUnStableVersionAtom,
} from "@/store";

export const getNodeVersionList = (versionType: VersionType) => {
  switch (versionType) {
    case VersionType.LTS:
      return useAtomValue(nodeLtsVersionAtom);
    case VersionType.CURRENT:
      return useAtomValue(nodeCurrentVersionAtom);
    case VersionType.STABLE:
      return useAtomValue(nodeStableVersionAtom);
    case VersionType.UNSTABLE:
      return useAtomValue(nodeUnStableVersionAtom);
    default:
      return useAtomValue(nodeAllVersionAtom);
  }
};
