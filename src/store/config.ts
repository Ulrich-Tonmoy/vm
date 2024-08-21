import {
  CONFIG_FILE_NAME,
  ConfigModel,
  dataDirPath,
  INITIAL_CONFIG,
  readFile,
  writeFile,
} from "@/libs";
import { atom } from "jotai";

export const configAtom = atom<ConfigModel>(INITIAL_CONFIG);
export const fontFamilyAtom = atom<string>(INITIAL_CONFIG.fontFamily);

export const updateConfigAtom = atom(null, async (get, set, config: ConfigModel) => {
  const oldConfig = get(configAtom);
  const dirPath = await dataDirPath();
  set(configAtom, config);
  if (config.fontFamily !== oldConfig.fontFamily) set(fontFamilyAtom, config.fontFamily);

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
        theme: config.theme ?? INITIAL_CONFIG.theme,
        fontFamily: config.fontFamily ?? INITIAL_CONFIG.fontFamily,
      };
      set(configAtom, config);
      set(fontFamilyAtom, config.fontFamily);
    }
  });
});
