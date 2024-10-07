import {
  CONFIG_FILE_NAME,
  ConfigNodeModel,
  ConfigModel,
  dataDirPath,
  INITIAL_CONFIG,
  readFile,
  StoreConfigModel,
  writeFile,
} from "@/libs";
import { atom } from "jotai";

export const configAtom = atom<ConfigModel>(INITIAL_CONFIG);
export const nodeAtom = atom<ConfigNodeModel>(INITIAL_CONFIG.Node);
export const themeAtom = atom<string>(INITIAL_CONFIG.theme);
export const fontFamilyAtom = atom<string>(INITIAL_CONFIG.fontFamily);

export const updateConfigAtom = atom(null, async (get, set, config: StoreConfigModel) => {
  const oldConfig = get(configAtom);
  const dirPath = await dataDirPath();
  const newConfig = { ...oldConfig, ...config };

  set(configAtom, newConfig);

  if (config.theme) set(themeAtom, config.theme);
  if (config.fontFamily) set(fontFamilyAtom, config.fontFamily);
  if (config.Node) {
    const tools = config.Node ?? INITIAL_CONFIG.Node;
    set(nodeAtom, tools);
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
        theme: config.theme ?? INITIAL_CONFIG.theme,
        fontFamily: config.fontFamily ?? INITIAL_CONFIG.fontFamily,
      };

      set(configAtom, config);
      set(nodeAtom, config.Node);
      set(themeAtom, config.theme);
      set(fontFamilyAtom, config.fontFamily);
    }
  });
});
