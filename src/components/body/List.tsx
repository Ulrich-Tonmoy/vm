import { LIST_LIMIT, NodeVersionListModel } from "@/libs";
import { searchTermAtom } from "@/store";
import { ChevronDownIcon, ChevronUpIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Button } from "@/components/Button";

interface ListProps {
  name: string;
  list: NodeVersionListModel[];
}

export const List = ({ name, list }: ListProps) => {
  const [limit, setLimit] = useState(LIST_LIMIT);
  const searchTerm = useAtomValue(searchTermAtom);
  const newList = list.filter((v) => v.version.includes(searchTerm));

  const expand = newList.length > limit;
  const collapse = newList.length === limit;

  return (
    <div className="flex flex-col items-center mb-2 space-y-2">
      <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30">
        {name}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        {newList.slice(0, limit).map((v, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center justify-center p-1 px-2 rounded-md shadow-xl text-md lg:text-2xl backdrop-blur-sm bg-slate-400/30 gap-x-2"
          >
            {v.version}
            <Button
              variant="outline"
              size="icon"
              content={<DownloadIcon className="size-8" />}
              tooltip={`Install ${v.version}`}
              onClick={() => {}}
            />
          </div>
        ))}
        {expand && (
          <Button
            variant="secondary"
            size="icon"
            tooltip="Show more"
            content={<ChevronDownIcon className="size-8" />}
            onClick={() => setLimit(newList.length)}
          />
        )}
        {collapse && (
          <Button
            variant="secondary"
            size="icon"
            content={<ChevronUpIcon className="size-8" />}
            tooltip="Show less"
            onClick={() => setLimit(LIST_LIMIT)}
          />
        )}
      </div>
    </div>
  );
};
