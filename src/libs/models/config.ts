export interface ConfigModel {
  Node: ConfigGeneralObject;
  Bun: ConfigGeneralObject;
  Deno: ConfigGeneralObject;
  Zig: ConfigGeneralObject;
  Python: ConfigGeneralObject;
  Godot: ConfigGeneralObject;
}

export interface ConfigGeneralObject {
  active: string;
  installed: [name: string] | [];
}
