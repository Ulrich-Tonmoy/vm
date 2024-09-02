export interface ConfigModel {
  Node: ConfigGeneralObject;
  Bun: ConfigGeneralObject;
  Deno: ConfigGeneralObject;
  theme: string;
  fontFamily: string;
}

export interface StoreToolsModel {
  Node: ConfigGeneralObject;
  Bun: ConfigGeneralObject;
  Deno: ConfigGeneralObject;
}

export interface StoreConfigModel {
  Node?: ConfigGeneralObject;
  Bun?: ConfigGeneralObject;
  Deno?: ConfigGeneralObject;
  theme?: string;
  fontFamily?: string;
}

export interface ConfigGeneralObject {
  active: string;
  installed: string[];
}
