export interface ConfigModel {
  Node: ConfigGeneralObject;
  Bun: ConfigGeneralObject;
  Deno: ConfigGeneralObject;
  theme: string;
  fontFamily: string;
}

export interface ConfigGeneralObject {
  active: string;
  installed: [name: string] | [];
}
