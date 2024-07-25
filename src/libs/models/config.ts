export interface ConfigModel {
  Node: ConfigGeneralObject;
  Bun: ConfigGeneralObject;
  Deno: ConfigGeneralObject;
}

export interface ConfigGeneralObject {
  active: string;
  installed: [name: string] | [];
}
