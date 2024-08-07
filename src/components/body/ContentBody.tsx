import { selectedToolAtom, updateSearchTermAtom, updateSelectedToolAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { Installed, Available } from "./";
import { useCallback } from "react";
import { debounce } from "@/libs";
import { ExitIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/Button";

export const ContentBody = () => {
  const selectedTool = useAtomValue(selectedToolAtom);
  const updateSelectedTool = useSetAtom(updateSelectedToolAtom);
  const updateSearchTerm = useSetAtom(updateSearchTermAtom);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      updateSearchTerm(value);
    }, 500),
    [],
  );

  if (!selectedTool) return;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <div className="flex flex-col pb-10 mb-16 space-y-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex">
          <span className="p-1 px-3 m-1 mx-3 text-xl font-black rounded-md text-md lg:text-4xl backdrop-blur-sm bg-slate-400/30">
            {selectedTool} Version Manager
          </span>

          <Button
            variant="outline"
            size="icon"
            content={<ExitIcon className="size-7" />}
            tooltip="Close"
            onClick={() => updateSelectedTool(null)}
          />
        </div>
        <div className="flex text-sm rounded-lg items-center bg-slate-600 w-[90%] lg:w-[80vw] h-12">
          <input
            onChange={handleSearchChange}
            type="text"
            className="w-full h-full px-2 text-lg text-white rounded-lg bg-slate-600 placeholder-slate-300 focus:outline-none"
            placeholder="Search version ie: 18.1"
          />
          <MagnifyingGlassIcon className="right-0 mr-1 size-8" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-around h-full px-2">
        <Installed />
        <Available />
      </div>
    </div>
  );
};
