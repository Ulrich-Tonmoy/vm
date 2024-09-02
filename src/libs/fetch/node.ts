import { ResponseType, fetch } from "@tauri-apps/api/http";
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
    responseType: ResponseType.JSON,
  });

  const resJson = await response;

  if (resJson.ok) {
    showToaster({
      msg: "Successfully Fetch the Node Version List.",
      type: ToasterType.SUCCESS,
    });

    return resJson.data as NodeVersionListModel[];
  } else {
    showToaster({
      msg: "Failed to fetch the Node Version List.",
      type: ToasterType.ERROR,
    });

    return [];
  }
};
