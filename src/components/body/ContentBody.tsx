import { configAtom, selectedToolAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Installed, Available } from "./";

export const ContentBody = () => {
  const selectedTool = useAtomValue(selectedToolAtom);
  const config = useAtomValue(configAtom);
  const selectedConfig = config[selectedTool];

  if (!selectedTool) return;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-black">{selectedTool}</span>
        <input
          type="text"
          className="border text-sm rounded-lg block p-2.5 bg-slate-600 border-slate-700 placeholder-slate-300 text-white focus:ring-blue-500 focus:border-blue-500 w-80"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-col justify-around h-full px-2 md:flex-row">
        <Installed active={selectedConfig.active} installed={selectedConfig.installed} />
        <Available />
      </div>
    </div>
  );
};
