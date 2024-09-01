import { Button } from "@/components/Button";
import { NodeVersionListModel } from "@/libs";
import { DownloadIcon } from "@radix-ui/react-icons";

interface ListItemProps {
  versionInfo: NodeVersionListModel;
}

export const ListItem = ({ versionInfo }: ListItemProps) => {
  const onClickDownload = () => {
    console.log(versionInfo);
  };

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
