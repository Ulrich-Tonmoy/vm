import { loadNodeVersionAtom, selectedToolAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { getNodeVersionList, VersionType } from "@/libs";
import { List } from "./list";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/Button";
import { useEffect } from "react";

export const Available = () => {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const selectedTool = useAtomValue(selectedToolAtom);
  const all = getNodeVersionList(VersionType.DEFAULT);

  const refreshAvailableVersion = async (isRefresh: boolean) => {
    await loadNodeVersion(isRefresh);
  };

  useEffect(() => {
    refreshAvailableVersion(false);
  }, [selectedTool]);

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <title>{selectedTool}</title>
      <div className="p-2 font-black rounded-md text-card-foreground bg-card shadow-md flex items-center justify-center mb-4 text-xl gap-x-2 lg:text-4xl">
        Available For Installation
        <Button
          variant="outline"
          size="icon"
          content={<SymbolIcon className="size-8" />}
          tooltip="Refresh The list"
          onClick={() => refreshAvailableVersion(true)}
        />
      </div>
      <div className="flex justify-between gap-4">
        {all.length === 0 ? (
          <div
            className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
            role="alert"
          >
            <p className="font-bold">No List available for {selectedTool} to install</p>
            <p>Try refreshing the list.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <List key={"LTS"} versionType={VersionType.LTS} />
            <List key={"Current"} versionType={VersionType.CURRENT} />
            <List key={"Old Stable"} versionType={VersionType.STABLE} />
            <List key={"Old UnStable"} versionType={VersionType.UNSTABLE} />
          </div>
        )}
      </div>
    </div>
  );
};
