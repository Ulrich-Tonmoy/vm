import {
  mkdir,
  exists,
  readDir,
  readTextFile,
  remove,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { ask } from "@tauri-apps/plugin-dialog";
import { basename } from "@tauri-apps/api/path";
import { dataDir } from "@tauri-apps/api/path";
import { CONFIG_FOLDER_NAME } from "@/libs/constants/config";

export const dataDirPath = async () => {
  return (await dataDir()) + "/" + CONFIG_FOLDER_NAME;
};

export const readFile = async (filePath: string): Promise<string> => {
  const fileExist = await exists(filePath);
  if (!fileExist) {
    return "";
  }

  const contents = await readTextFile(filePath);
  return contents;
};

export const writeFile = async (
  folderPath: string,
  fileName: string,
  content: string,
): Promise<boolean> => {
  const folderExist = await exists(folderPath);
  if (!folderExist) {
    await createFolder(folderPath);
  }
  await writeTextFile(folderPath + "/" + fileName, content);
  return true;
};

export const deleteFile = async (filePath: string): Promise<boolean> => {
  const fileName = await basename(filePath);

  const confirmed = await ask(
    `Are you sure you want to delete '${fileName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete '${fileName}'?`,
      kind: "warning",
    },
  );

  if (!confirmed) return false;
  await remove(filePath);
  return true;
};

export const createFolder = async (folderPath: string): Promise<boolean> => {
  await mkdir(folderPath, { recursive: true });
  return true;
};

export const deleteFolder = async (dirPath: string): Promise<boolean> => {
  await remove(dirPath, { recursive: true });
  return true;
};

export const readDirectory = async (folderPath: string): Promise<any[]> => {
  const fileTree = await readDir(folderPath);
  const customSort = (a: any, b: any) => {
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    return a.name.localeCompare(b.name);
  };

  const sortFileTree = (tree: any) => {
    tree.forEach((node: any) => {
      if (node.children) {
        node.children = sortFileTree(node.children);
      }
    });
    return tree.sort(customSort);
  };
  const sortedFileTree = sortFileTree(fileTree);

  return sortedFileTree;
};
