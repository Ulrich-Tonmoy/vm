export interface NodeVersionListModel {
  version: string;
  dater: string;
  filses: Array<string>;
  npm: string;
  v8: string;
  uv: string;
  zlib: string;
  openssl: string;
  modules: string;
  lts: boolean | string;
  security: boolean;
}

export interface NodeFilterVersionModel {
  lts: NodeVersionListModel[];
  current: NodeVersionListModel[];
  stable: NodeVersionListModel[];
  unstable: NodeVersionListModel[];
}
