export interface ConfigModel {
  Node: ConfigNodeModel;
  theme: string;
  fontFamily: string;
}

export interface StoreConfigModel {
  Node?: ConfigNodeModel;
  theme?: string;
  fontFamily?: string;
}

export interface ConfigNodeModel {
  active: string;
  installed: string[];
}
