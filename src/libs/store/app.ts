import { atom } from "jotai";

export const downloadingVersionAtom = atom<string>("");
export const toastIdAtom = atom<number>(0);
export const downloadingProgressAtom = atom<number>(0);

export const updateDownloadingAtom = atom(
  null,
  async (get, set, item: { version?: string; toastId?: number; progress?: number }) => {
    if (item.version) {
      const downloadingVersion = get(downloadingVersionAtom);
      if (downloadingVersion.includes(item.version)) {
        set(downloadingVersionAtom, "");
        return;
      }
      set(downloadingVersionAtom, item.version);
    }
    if (item.toastId || item.toastId === 0) set(toastIdAtom, item.toastId);
    if (item.progress || item.progress === 0) set(downloadingProgressAtom, item.progress);
  },
);
