import { nodeAtom, searchTermAtom, loadNodeVersionAtom, updateConfigAtom } from "@/store";
import { CheckIcon, ExitIcon, TrashIcon } from "@radix-ui/react-icons";
import { useAtomValue, useSetAtom } from "jotai";
import { Button, DialogButton } from "@/components";
import {
  dataDirPath,
  deleteFolder,
  FileSysRes,
  NODE_INSTALLED_PATH,
  removeFromPath,
  setToPath,
  showToaster,
  ToasterType,
} from "@/libs";

export const Installed = () => {
  const searchTerm = useAtomValue(searchTermAtom);
  const node = useAtomValue(nodeAtom);
  const loadNodeVersion = useSetAtom(loadNodeVersionAtom);
  const updateConfig = useSetAtom(updateConfigAtom);

  const items = node.installed
    .filter((v) => v.includes(searchTerm))
    .sort((a, b) => {
      if (a === node.active) return -1;
      if (b === node.active) return 1;
      return 0;
    });

  const useVersion = async (version: string) => {
    const path = await dataDirPath();
    const active = node.active;
    if (active) {
      removeFromPath([NODE_INSTALLED_PATH(path, active)]);
    }
    setToPath(NODE_INSTALLED_PATH(path, version));
    updateConfig({
      Node: {
        active: version,
        installed: [...node.installed],
      },
    });
    loadNodeVersion(false);
    showToaster({
      msg: "Using Node " + version,
      type: ToasterType.SUCCESS,
    });
  };

  const deleteVersion = async (version: string) => {
    const path = await dataDirPath();
    const res = await deleteFolder(NODE_INSTALLED_PATH(path, version));
    if (res === FileSysRes.OK) {
      const newTools = node.installed.filter((v) => v !== version);
      updateConfig({
        Node: {
          active: node.active,
          installed: [...newTools],
        },
      });
      loadNodeVersion(false);
      showToaster({
        msg: "Uninstalled Node " + version,
        type: ToasterType.WARN,
      });
    }
  };

  const unUseVersion = async (version: string) => {
    const path = await dataDirPath();
    removeFromPath([NODE_INSTALLED_PATH(path, version)]);
    updateConfig({
      Node: {
        active: "",
        installed: [...node.installed],
      },
    });
    loadNodeVersion(false);
    showToaster({
      msg: "UnUsed Node " + version,
      type: ToasterType.WARN,
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="p-1 px-2 mb-4 text-xl font-black rounded-md lg:text-4xl text-primary-foreground bg-primary shadow-md">
        Installed
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 ml-8 md:m-0">
        {node.installed.length === 0 ? (
          <div
            className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
            role="alert"
          >
            <p className="font-bold">No version is installed.</p>
            <p>Try installing a version from the available list.</p>
          </div>
        ) : (
          items.map((i) => (
            <div
              key={i}
              className="flex items-center justify-center p-1 px-2 rounded-md text-md lg:text-2xl bg-card shadow-md gap-x-2"
            >
              <span className="cursor-text select-text">{i}</span>
              {node.active === i ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled
                    content={<CheckIcon className="bg-green-400 size-8" />}
                    tooltip="Active"
                    onClick={() => {}}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    content={<ExitIcon className="size-8 text-rose-500" />}
                    tooltip={`Un Use ${i}`}
                    onClick={() => unUseVersion(i)}
                  />
                </>
              ) : (
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    content={<CheckIcon className="size-8" />}
                    tooltip={`Use ${i}`}
                    onClick={() => useVersion(i)}
                  />
                  <DialogButton
                    variant="outline"
                    size="icon"
                    content={<TrashIcon className="size-8 text-rose-500" />}
                    tooltip={`Uninstall ${i}`}
                    info={i}
                    onClick={() => deleteVersion(i)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
