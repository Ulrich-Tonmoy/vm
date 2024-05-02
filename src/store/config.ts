import {
  CONFIG_FILE_NAME,
  CONFIG_FOLDER_NAME,
  ConfigModel,
  INITIAL_CONFIG,
  readFile,
  writeFile,
} from "@/libs";
import { dataDir } from "@tauri-apps/api/path";
import { atom } from "jotai";

const dataDirPath = async () => {
  return (await dataDir()) + CONFIG_FOLDER_NAME;
};

export const configAtom = atom<ConfigModel>(INITIAL_CONFIG);

export const updateConfigAtom = atom(null, async (_get, set, config: ConfigModel) => {
  const dirPath = await dataDirPath();
  set(configAtom, config);

  await writeFile(dirPath, CONFIG_FILE_NAME, JSON.stringify(config));
});

export const loadConfigAtom = atom(null, async (_, set) => {
  const dirPath = (await dataDirPath()) + "/" + CONFIG_FILE_NAME;
  readFile(dirPath).then((res: string) => {
    if (res !== "ERROR") {
      let config: ConfigModel = JSON.parse(res);
      config = {
        Node: config.Node ?? INITIAL_CONFIG.Node,
        Bun: config.Bun ?? INITIAL_CONFIG.Bun,
        Deno: config.Deno ?? INITIAL_CONFIG.Deno,
        Zig: config.Zig ?? INITIAL_CONFIG.Zig,
        Python: config.Python ?? INITIAL_CONFIG.Python,
        Godot: config.Godot ?? INITIAL_CONFIG.Godot,
      };
      set(configAtom, config);
    }
  });
});
