import { configAtom, selectedToolAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Installed, Available } from "./";
import { FaSearch } from "react-icons/fa";

export const ContentBody = () => {
  const selectedTool = useAtomValue(selectedToolAtom);
  const config = useAtomValue(configAtom);
  if (!selectedTool) return;
  const selectedConfig = config[selectedTool];

  return (
    <div className="flex flex-col pb-10 mb-16 space-y-4">
      <div className="flex flex-col items-center justify-center">
        <span className="p-1 px-3 m-1 mx-3 text-4xl font-black rounded-md backdrop-blur-sm bg-slate-400/30">
          {selectedTool} Version Manager
        </span>
        <div className="flex text-sm rounded-lg items-center bg-slate-600 w-[80vw] h-12">
          <input
            type="text"
            className="w-full h-full px-2 text-lg text-white rounded-lg bg-slate-600 placeholder-slate-300 focus:outline-none"
            placeholder="Search version ie: 18.1"
          />
          <FaSearch className="right-0 mr-1 size-6" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-around h-full px-2">
        <Installed active={selectedConfig.active} installed={selectedConfig.installed} />
        <Available />
      </div>
    </div>
  );
};
