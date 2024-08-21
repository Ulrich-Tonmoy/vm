import {
  CONFIG_FILE_NAME,
  ConfigModel,
  dataDirPath,
  INITIAL_CONFIG,
  readFile,
  StoreConfigModel,
  StoreToolsModel,
  writeFile,
} from "@/libs";
import { atom } from "jotai";

export const configAtom = atom<ConfigModel>(INITIAL_CONFIG);
export const toolsAtom = atom<StoreToolsModel>(INITIAL_CONFIG);
export const themeAtom = atom<string>(INITIAL_CONFIG.theme);
export const fontFamilyAtom = atom<string>(INITIAL_CONFIG.fontFamily);

export const updateConfigAtom = atom(null, async (get, set, config: StoreConfigModel) => {
  const oldConfig = get(configAtom);
  const dirPath = await dataDirPath();
  const newConfig = { ...oldConfig, ...config };

  set(configAtom, newConfig);

  if (config.theme) set(themeAtom, config.theme);
  if (config.fontFamily) set(fontFamilyAtom, config.fontFamily);
  if (config.Node || config.Bun || config.Deno) {
    const tools = {
      Node: config.Node ?? INITIAL_CONFIG.Node,
      Bun: config.Bun ?? INITIAL_CONFIG.Bun,
      Deno: config.Deno ?? INITIAL_CONFIG.Deno,
    };
    set(toolsAtom, tools);
  }

  await writeFile(dirPath, CONFIG_FILE_NAME, JSON.stringify(newConfig));
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

      const tools = { Node: config.Node, Bun: config.Bun, Deno: config.Deno };
      set(configAtom, config);
      set(toolsAtom, tools);
      set(themeAtom, config.theme);
      set(fontFamilyAtom, config.fontFamily);
    }
  });
});
