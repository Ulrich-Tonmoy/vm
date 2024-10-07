import { Button } from "@/components/Button";
import {
  dataDirPath,
  NODE_DOWNLOAD_URL,
  NODE_UNZIP_FOLDER_NAME,
  NodeVersionListModel,
  ToasterType,
  showToaster,
} from "@/libs";
import {
  downloadingProgressAtom,
  downloadingVersionAtom,
  loadNodeVersionAtom,
  toastIdAtom,
  nodeAtom,
  updateConfigAtom,
  updateDownloadingAtom,
} from "@/store";
import { DownloadIcon } from "@radix-ui/react-icons";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

interface ListItemProps {
  versionInfo: NodeVersionListModel;
}

export const ListItem = ({ versionInfo }: ListItemProps) => {
  const downloadingVersion = useAtomValue(downloadingVersionAtom);
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const toastId = useAtomValue(toastIdAtom);
  const downloadingProgress = useAtomValue(downloadingProgressAtom);
  const updateDownloading = useSetAtom(updateDownloadingAtom);
  const node = useAtomValue(nodeAtom);
  const updateConfig = useSetAtom(updateConfigAtom);

  const downloadFile = async () => {
    const newName = versionInfo.version;
    const oldName = NODE_UNZIP_FOLDER_NAME(newName);
    const url = NODE_DOWNLOAD_URL(newName);
    const dest = await dataDirPath();
    await invoke("download_and_unzip", { url, dest, oldName, newName });
    updateDownloading({ version: versionInfo.version });
  };

  const onClickDownload = async () => {
    if (downloadingVersion !== "") return;
    downloadFile();
    const id = showToaster({
      type: ToasterType.LOADING,
      msg: `Downloading ${downloadingVersion} - ${downloadingProgress.toFixed(2)}%`,
    });
    updateDownloading({ toastId: id as number });
  };

  useEffect(() => {
    if (downloadingVersion === versionInfo.version) {
      if (downloadingProgress > 1 && downloadingProgress < 100) {
        showToaster(
          { type: ToasterType.UPDATE, id: toastId },
          {
            render: `Downloading ${downloadingVersion} - ${downloadingProgress.toFixed(
              2,
            )}%`,
            isLoading: true,
          },
        );
      }

      if (downloadingProgress >= 100) {
        showToaster(
          { type: ToasterType.UPDATE, id: toastId },
          {
            render: `Installed Node ${downloadingVersion}`,
            type: "success",
            isLoading: false,
          },
        );
        updateConfig({
          Node: {
            active: node.active,
            installed: [...node.installed, downloadingVersion],
          },
        });

        loadNodeVersion(false);
        updateDownloading({ version: versionInfo.version, toastId: 0, progress: 0 });
      }
    }
  }, [downloadingProgress]);

  useEffect(() => {
    const listenProgress = listen("download_progress", (event) => {
      updateDownloading({ progress: event.payload as number });
    });

    return () => {
      listenProgress.then((f) => f());
    };
  }, []);

  return (
    <div
      className="flex flex-wrap items-center justify-center p-1 px-2 rounded-md text-md lg:text-2xl bg-card shadow-md gap-x-2"
      key={versionInfo.version}
    >
      <span className="cursor-text select-text">{versionInfo.version}</span>
      <Button
        variant="outline"
        size="icon"
        content={<DownloadIcon className="size-8" />}
        tooltip={`Install ${versionInfo.version}`}
        onClick={onClickDownload}
        disabled={downloadingVersion !== ""}
      />
    </div>
  );
};
