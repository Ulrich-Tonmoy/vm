import {
  getNodeVersionCategoryAtom,
  loadNodeVersionAtom,
  selectedToolAtom,
} from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { NodeFilterVersionModel, NodeVersionListModel } from "@/libs";
import { RiRefreshFill } from "react-icons/ri";
import { List } from "./List";

interface AvailableProps {
  installed: string[];
}

export const Available = ({ installed }: AvailableProps) => {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const getNodeVersionCategory = useSetAtom(getNodeVersionCategoryAtom);

  const [ltsVersions, setLtsVersions] = useState<NodeVersionListModel[]>([]);
  const [currentVersions, setCurrentVersions] = useState<NodeVersionListModel[]>([]);
  const [stableVersions, setStableVersions] = useState<NodeVersionListModel[]>([]);
  const [unStableVersions, setUnStableVersions] = useState<NodeVersionListModel[]>([]);
  const selectedTool = useAtomValue(selectedToolAtom);

  const updateVersionStates = (res: NodeFilterVersionModel) => {
    const installedSet = new Set(installed);
    setLtsVersions(res.lts.filter((v) => !installedSet.has(v.version)));
    setCurrentVersions(res.current.filter((v) => !installedSet.has(v.version)));
    setStableVersions(res.stable.filter((v) => !installedSet.has(v.version)));
    setUnStableVersions(res.unstable.filter((v) => !installedSet.has(v.version)));
  };

  const refreshNodeVersion = async () => {
    await loadNodeVersion(true);
    const res = await getNodeVersionCategory();
    updateVersionStates(res);
  };

  useEffect(() => {
    (async () => {
      await loadNodeVersion();
      const res = await getNodeVersionCategory();
      updateVersionStates(res);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <title>{selectedTool}</title>
      <div className="flex gap-1">
        <div className="p-1 px-2 mb-4 text-xl font-black rounded-md shadow-xl lg:text-4xl backdrop-blur-sm bg-slate-400/30">
          Available For Installation
        </div>
        <button
          className="p-1 px-2 mb-4 text-xl font-black rounded-md shadow-xl lg:text-4xl backdrop-blur-sm bg-slate-400/30 hover:bg-slate-500/30"
          title="Refresh The list"
          onClick={() => refreshNodeVersion()}
        >
          <RiRefreshFill />
        </button>
      </div>
      <div className="flex justify-between gap-4">
        <List key={"Current"} name="Current" list={currentVersions} />
        <List key={"LTS"} name="LTS" list={ltsVersions} />
        <List key={"Old Stable"} name="Old Stable" list={stableVersions} />
        <List key={"Old UnStable"} name="Old UnStable" list={unStableVersions} />
      </div>
    </div>
  );
};
