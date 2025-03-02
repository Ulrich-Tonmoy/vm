import { DownloadStatus } from "@/libs/models/app";
import { atom } from "jotai";

export const downloadingStatusAtom = atom<Record<string, DownloadStatus>>({});
export const updateDownloadingStatusAtom = atom(
  null,
  (get, set, update: Partial<DownloadStatus> & { version: string }) => {
    const current = get(downloadingStatusAtom);
    const { version, ...rest } = update;
    set(downloadingStatusAtom, {
      ...current,
      [version]: { ...current[version], ...rest, version },
    });
  }
);
