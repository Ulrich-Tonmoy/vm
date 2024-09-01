import { Button } from "@/components/Button";
import {
  dataDirPath,
  NODE_DOWNLOAD_URL,
  NODE_UNZIP_FOLDER_NAME,
  NodeVersionListModel,
} from "@/libs";
import { DownloadIcon } from "@radix-ui/react-icons";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

interface ListItemProps {
  versionInfo: NodeVersionListModel;
}

export const ListItem = ({ versionInfo }: ListItemProps) => {
  const [progress, setProgress] = useState(0);

  const onClickDownload = async () => {
    try {
      const newName = versionInfo.version;
      const oldName = NODE_UNZIP_FOLDER_NAME(newName);
      const url = NODE_DOWNLOAD_URL(newName);
      const dest = (await dataDirPath()) + "/node";
      await invoke("download_and_unzip", { url, dest, oldName, newName });
      console.log("Download and unzip successful");
    } catch (error) {
      console.error("Error downloading and unzipping file:", error);
    }
  };

  useEffect(() => {
    const listenProgress = listen("download_progress", (event) => {
      setProgress(event.payload as number);
    });

    return () => {
      listenProgress.then((f) => f());
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center p-1 px-2 rounded-md text-md lg:text-2xl bg-card shadow-md gap-x-2">
      <span className="cursor-text select-text">{versionInfo.version}</span>
      <Button
        variant="outline"
        size="icon"
        content={<DownloadIcon className="size-8" />}
        tooltip={`Install ${versionInfo.version}`}
        onClick={onClickDownload}
      />
    </div>
  );
};
