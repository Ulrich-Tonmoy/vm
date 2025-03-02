export interface NodeVersionListModel {
  version: string;
  date: string;
  filses: Array<string>;
  npm: string;
  v8: string;
  uv: string;
  zlib: string;
  openssl: string;
  modules: string;
  lts: boolean | string;
  type?: "LTS" | "Current" | "Stable" | "Unstable";
  status?: "Active" | "Installed";
  security: boolean;
}
