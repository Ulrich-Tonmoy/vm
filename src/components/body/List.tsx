import { NodeVersionListModel } from "@/libs";
import { MdInstallDesktop } from "react-icons/md";

interface ListProps {
  name: string;
  list: NodeVersionListModel[];
}

export const List = ({ name, list }: ListProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30">
        {name}
      </div>
      {list.map((v, i) => (
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
    </div>
  );
};
