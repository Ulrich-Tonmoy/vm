import { LIST_LIMIT, NodeVersionListModel } from "@/libs";
import { searchTermAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { MdExpandLess, MdInstallDesktop, MdOutlineExpandMore } from "react-icons/md";

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
    <div className="flex flex-col items-center space-y-2">
      <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30">
        {name}
      </div>
      {newList.slice(0, limit).map((v, i) => (
        <div
          key={i}
          className="flex flex-wrap items-center justify-center p-1 px-2 text-sm rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30"
        >
          {v.version}
          <button
            className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900 size-8"
            title="Install"
          >
            <MdInstallDesktop />
          </button>
        </div>
      ))}
      {expand && (
        <button
          className="flex items-center justify-center rounded-md hover:bg-slate-600 bg-slate-900"
          title="Show More"
          onClick={() => setLimit(newList.length)}
        >
          <MdOutlineExpandMore className="size-8" />
        </button>
      )}
      {collapse && (
        <button
          className="flex items-center justify-center rounded-md hover:bg-slate-600 bg-slate-900"
          title="Collapse"
          onClick={() => setLimit(LIST_LIMIT)}
        >
          <MdExpandLess className="size-8" />
        </button>
      )}
    </div>
  );
};
