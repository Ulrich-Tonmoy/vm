import { NODE_VERSION_LIST_FILE_NAME } from "@/libs/constants/config";
import { dataDirPath, readFile, writeFile } from "./fs";
import { fetch } from "@tauri-apps/plugin-http";
import { NODE_BASE_URL } from "@/libs/constants/url";
import { ToasterType } from "@/libs/enums/toaster-type";
import { NodeVersionListModel } from "@/libs/models/node-version";
import { showToaster } from "@/libs/utils/toaster";



export const loadNodeVersionList = async (isRefresh: boolean) => {
  let all = [];
  const dirPath = await dataDirPath();
  const listPath = dirPath + "\\" + NODE_VERSION_LIST_FILE_NAME;

  const res = await readFile(listPath);
  if (res && !isRefresh) {
    all = JSON.parse(res);
  } else {
    all = await saveNodeVersionListToJSON();
  }

  return all;
};

export const saveNodeVersionListToJSON = async () => {
  const dirPath = await dataDirPath();

  const all = await fetchNodeVersionList();
  await writeFile(dirPath, NODE_VERSION_LIST_FILE_NAME, JSON.stringify(all));

  return all;
};


export const fetchNodeVersionList = async (): Promise<NodeVersionListModel[]> => {
  const response = await fetch(`${NODE_BASE_URL}index.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Version Manager",
    },
  });

  const resJson = await response.json();

  if (response.ok) {
    showToaster({
      msg: "Successfully Fetch the Node Version List.",
      type: ToasterType.SUCCESS,
    });

    return resJson as NodeVersionListModel[];
  } else {
    showToaster({
      msg: "Failed to fetch the Node Version List.",
      type: ToasterType.ERROR,
    });

    return [];
  }
};