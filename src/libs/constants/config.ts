import { ConfigModel } from "@/libs/models/config";

export const CONFIG_FOLDER_NAME = "Version Manager";
export const CONFIG_FILE_NAME = "config.json";
export const NODE_VERSION_LIST_FILE_NAME = "version-list.json";
export const PREV_NODE_ENV_PATH = "C:\\Program Files\\nodejs";
export const INITIAL_CONFIG: ConfigModel = {
  Node: {
    active: "",
    installed: [],
  },
  theme: "system",
  fontFamily: "font-Krypton",
};

export const LIST_LIMIT = 20;
// TODO: remove before release build
// export const DEFAULT_REMOVE_FROM_PATH = ["%NVM_SYMLINK%;", "C:\\Program Files\\nodejs;"];
export const DEFAULT_REMOVE_FROM_PATH = [];
