import {
  configAtom,
  getNodeVersionCategoryAtom,
  loadNodeVersionAtom,
  selectedToolAtom,
} from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { NodeFilterVersionModel, NodeVersionListModel, ToolType } from "@/libs";
import { List } from "./List";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/Button";

export const Available = () => {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const getNodeVersionCategory = useSetAtom(getNodeVersionCategoryAtom);
  const selectedTool = useAtomValue(selectedToolAtom);
  const config = useAtomValue(configAtom);
  const selectedConfig = config[selectedTool!];

  const [ltsVersions, setLtsVersions] = useState<NodeVersionListModel[]>([]);
  const [currentVersions, setCurrentVersions] = useState<NodeVersionListModel[]>([]);
  const [stableVersions, setStableVersions] = useState<NodeVersionListModel[]>([]);
  const [unStableVersions, setUnStableVersions] = useState<NodeVersionListModel[]>([]);

  const updateVersionStates = (res: NodeFilterVersionModel) => {
    const installedSet = new Set(selectedConfig.installed);
    setLtsVersions(res.lts.filter((v) => !installedSet.has(v.version)));
    setCurrentVersions(res.current.filter((v) => !installedSet.has(v.version)));
    setStableVersions(res.stable.filter((v) => !installedSet.has(v.version)));
    setUnStableVersions(res.unstable.filter((v) => !installedSet.has(v.version)));
  };

  const loadNodeVersionList = async (isRefresh: boolean) => {
    await loadNodeVersion(isRefresh);
    const res = await getNodeVersionCategory();
    updateVersionStates(res);
  };

  const refreshAvailableVersion = async (isRefresh: boolean) => {
    switch (selectedTool) {
      case ToolType.NODE:
        loadNodeVersionList(isRefresh);
        break;

      default:
        setLtsVersions([]);
        setCurrentVersions([]);
        setStableVersions([]);
        setUnStableVersions([]);
        break;
    }
  };

  useEffect(() => {
    (async () => {
      refreshAvailableVersion(false);
    })();
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
        {currentVersions.length === 0 &&
        ltsVersions.length === 0 &&
        stableVersions.length === 0 &&
        unStableVersions.length === 0 ? (
          <div
            className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
            role="alert"
          >
            <p className="font-bold">No List available for {selectedTool} to install</p>
            <p>Try refreshing the list.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <List key={"LTS"} name="LTS" list={ltsVersions} />
            <List key={"Current"} name="Current" list={currentVersions} />
            <List key={"Old Stable"} name="Old Stable" list={stableVersions} />
            <List key={"Old UnStable"} name="Old UnStable" list={unStableVersions} />
          </div>
        )}
      </div>
    </div>
  );
};
