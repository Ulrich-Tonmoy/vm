import { fetchNodeVersionList } from "../fetch";
import { dataDirPath, readFile, writeFile } from "./fs";
import { NODE_FOLDER_NAME, NODE_VERSION_LIST_FILE_NAME } from "../constants";
import { FileSysRes } from "@/libs";

export const loadNodeVersionList = async (isRefresh: boolean) => {
  let all = [];
  const dirPath = await dataDirPath();
  const listPath = dirPath + "\\" + NODE_FOLDER_NAME + "\\" + NODE_VERSION_LIST_FILE_NAME;

  const res = await readFile(listPath);
  if (res !== FileSysRes.ERROR && !isRefresh) {
    all = JSON.parse(res);
  } else {
    all = await saveNodeVersionListToJSON();
  }

  return all;
};

export const saveNodeVersionListToJSON = async () => {
  const dirPath = await dataDirPath();

  const all = await fetchNodeVersionList();
  await writeFile(
    dirPath + "\\" + NODE_FOLDER_NAME,
    NODE_VERSION_LIST_FILE_NAME,
    JSON.stringify(all),
  );

  return all;
};
