export interface NodeVersionDataModel {
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
