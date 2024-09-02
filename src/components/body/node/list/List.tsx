import { cn, getNodeVersionList, LIST_LIMIT, VersionType } from "@/libs";
import { searchTermAtom } from "@/store";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Button } from "@/components/Button";
import { ListItem } from "./ListItem";

interface ListProps {
  versionType: VersionType;
}

export const List = ({ versionType }: ListProps) => {
  const list = getNodeVersionList(versionType);
  const [limit, setLimit] = useState(LIST_LIMIT);
  const searchTerm = useAtomValue(searchTermAtom);
  const newList = list?.filter((v) => v.version.includes(searchTerm));

  const expand = newList.length > limit;
  const collapse = newList.length === limit;

  if (newList.length === 0) return null;

  return (
    <div className="flex flex-col items-center mb-4 space-y-3">
      <div
        className={cn(
          "p-1 px-2 text-sm font-black rounded-md md:text-2xl text-card-foreground bg-card shadow-md",
          {
            "text-primary-foreground bg-primary shadow-md": versionType === "LTS",
          },
        )}
      >
        {versionType}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-evenly gap-3">
        {newList.slice(0, limit).map((v) => (
          <ListItem versionInfo={v} key={v.version} />
        ))}
      </div>
      {expand && (
        <Button
          variant="outline"
          size="icon"
          tooltip="Show All"
          content={<ChevronDownIcon className="size-8" />}
          onClick={() => setLimit(newList.length)}
        />
      )}
      {collapse && (
        <Button
          variant="outline"
          size="icon"
          content={<ChevronUpIcon className="size-8" />}
          tooltip="Show less"
          onClick={() => setLimit(LIST_LIMIT)}
        />
      )}
    </div>
  );
};
