import { ConfigModel } from "../models";

export const CONFIG_FOLDER_NAME = "Version Manager";
export const CONFIG_FILE_NAME = "config.json";
export const NODE_FOLDER_NAME = "node";
export const NODE_VERSION_LIST_FILE_NAME = "version-list.json";
export const BUN_FOLDER_NAME = "bun";
export const DENO_FOLDER_NAME = "deno";
export const PREV_NODE_ENV_PATH = "C:\\Program Files\\nodejs";
export const INITIAL_CONFIG: ConfigModel = {
  Node: {
    active: "",
    installed: [],
  },
  Bun: {
    active: "",
    installed: [],
  },
  Deno: {
    active: "",
    installed: [],
  },
};

export const LIST_LIMIT = 20;
