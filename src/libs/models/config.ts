export interface ConfigModel {
  Node: GeneralObject;
  Bun: GeneralObject;
  Deno: GeneralObject;
  Zig: GeneralObject;
  Python: GeneralObject;
  Godot: GeneralObject;
}

interface GeneralObject {
  active: string;
  installed: [name: string] | [];
}
