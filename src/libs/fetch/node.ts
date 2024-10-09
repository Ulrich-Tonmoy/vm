import { fetch } from "@tauri-apps/plugin-http";
import { showToaster } from "../utils";
import { ToasterType } from "../enums";
import { NODE_BASE_URL } from "../constants";
import { NodeVersionListModel } from "../models";

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
