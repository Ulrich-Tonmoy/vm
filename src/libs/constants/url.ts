export const NODE_BASE_URL = `https://nodejs.org/dist/`;
export const NODE_DOWNLOAD_URL = (version: string) =>
  `${NODE_BASE_URL}${version}/node-${version}-win-x64.zip`;
export const NODE_UNZIP_FOLDER_NAME = (version: string) => `node-${version}-win-x64`;
export const NODE_INSTALLED_PATH = (path: string, version: string) =>
  `${path}\\${version}`;
