import { ConfigModel } from "../models";

export const CONFIG_FOLDER_NAME = `Version Manager`;
export const CONFIG_FILE_NAME = `config.json`;
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
  Zig: {
    active: "",
    installed: [],
  },
  Python: {
    active: "",
    installed: [],
  },
  Godot: {
    active: "",
    installed: [],
  },
};
