import { searchTermAtom, updateSearchTermAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { debounce } from "@/libs";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Installed, Available } from "..";

export const ContentBody = () => {
  const searchTerm = useAtomValue(searchTermAtom);
  const updateSearchTerm = useSetAtom(updateSearchTermAtom);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      updateSearchTerm(value);
    }, 50),
    [],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col pb-10 mt-8 mb-16 space-y-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex text-sm rounded-lg items-center bg-input w-[90%] lg:w-[80vw] h-12 shadow-md">
            <MagnifyingGlassIcon className="right-0 ml-1 size-8" />
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              className="w-full h-full px-2 text-lg rounded-lg text-foreground bg-input placeholder-secondary-foreground focus:outline-none"
              placeholder="Search version ie: 18.1"
            />
            {searchTerm && (
              <Cross1Icon
                className="right-0 mr-1 size-5 cursor-pointer"
                onClick={() => updateSearchTerm("")}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-around h-full px-2">
          <Installed />
          <Available />
        </div>
      </div>
    </div>
  );
};
