import {
  getNodeVersionCategoryAtom,
  loadNodeVersionAtom,
  selectedToolAtom,
} from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { NodeVersionListModel } from "@/libs";
import { MdInstallDesktop } from "react-icons/md";

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
    <div className="flex flex-col items-center justify-center mt-5">
      <title>{selectedTool}</title>
      <div className="p-1 px-2 mb-4 text-xl font-black rounded-md shadow-xl md:text-4xl backdrop-blur-sm bg-slate-400/30">
        Available For Installation
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30">
            Current
          </div>
          {currentVersions.map((v, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center p-1 px-2 text-sm rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30"
            >
              {v.version}
              <MdInstallDesktop
                className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900 size-8"
                title="Install"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-green-500/70 ">
            LTS
          </div>
          {ltsVersions.map((v, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center p-1 px-2 text-sm rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30"
            >
              {v.version}
              <MdInstallDesktop
                className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900 size-8"
                title="Install"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30">
            Old Stable
          </div>
          {stableVersions.map((v, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center p-1 px-2 text-sm rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30"
            >
              {v.version}
              <MdInstallDesktop
                className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900 size-8"
                title="Install"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-1 px-2 text-sm font-black rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30">
            Old UnStable
          </div>
          {unStableVersions.map((v, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center p-1 px-2 text-sm rounded-md shadow-xl lg:text-2xl backdrop-blur-sm bg-slate-400/30"
            >
              {v.version}
              <MdInstallDesktop
                className="p-1 ml-1 rounded-md hover:bg-slate-600 bg-slate-900 size-8"
                title="Install"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
