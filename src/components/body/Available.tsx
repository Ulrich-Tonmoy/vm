import {
  getNodeVersionCategoryAtom,
  loadNodeVersionAtom,
  selectedToolAtom,
} from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { NodeVersionListModel } from "@/libs";

export const Available = () => {
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const getNodeVersionCategory = useSetAtom(getNodeVersionCategoryAtom);

  const [ltsVersions, setLtsVersions] = useState<NodeVersionListModel[]>([]);
  const [currentVersions, setCurrentVersions] = useState<NodeVersionListModel[]>([]);
  const [stableVersions, setStableVersions] = useState<NodeVersionListModel[]>([]);
  const [unStableVersions, setUnStableVersions] = useState<NodeVersionListModel[]>([]);
  const selectedTool = useAtomValue(selectedToolAtom);

  useEffect(() => {
    (async () => {
      await loadNodeVersion();
      const res = await getNodeVersionCategory();
      setLtsVersions(res.lts);
      setCurrentVersions(res.current);
      setStableVersions(res.stable);
      setUnStableVersions(res.unstable);
    })();
  }, []);

  return (
    <div>
      <title>{selectedTool}</title>
      <div className="mb-4 text-xl font-black">Available For Installation</div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">Current</div>
          {currentVersions.map((v, i) => (
            <div key={i}>
              {v.version}
              <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
                Install
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">LTS</div>
          {ltsVersions.map((v, i) => (
            <div key={i}>
              {v.version}
              <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
                Install
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">Old Stable</div>
          {stableVersions.map((v, i) => (
            <div key={i}>
              {v.version}
              <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
                Install
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="font-black">Old UnStable</div>
          {unStableVersions.map((v, i) => (
            <div key={i}>
              {v.version}
              <button className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900">
                Install
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
