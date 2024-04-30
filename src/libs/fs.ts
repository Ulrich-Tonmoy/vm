import { FileSysRes } from "@/libs";
import {
  createDir,
  exists,
  readDir,
  readTextFile,
  removeDir,
  removeFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { ask } from "@tauri-apps/api/dialog";
import { basename } from "@tauri-apps/api/path";

export const readFile = async (filePath: string): Promise<string> => {
  const contents = await readTextFile(filePath);
  return contents;
};

export const writeFile = async (
  folderPath: string,
  fileName: string,
  content: string,
): Promise<string> => {
  const folderExist = await exists(folderPath);
  if (!folderExist) {
    await createFolder(folderPath);
  }
  await writeTextFile(folderPath + "/" + fileName, content);
  return FileSysRes.OK;
};

export const createFolder = async (folderPath: string): Promise<string> => {
  await createDir(folderPath, { recursive: true });
  return FileSysRes.OK;
};

export const deleteFolder = async (dirPath: string): Promise<string> => {
  const folderName = await basename(dirPath);

  const confirmed = await ask(
    `Are you sure you want to delete folder name '${folderName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete folder name '${folderName}'?`,
      type: "warning",
    },
  );

  if (!confirmed) return FileSysRes.CANCEL;
  await removeDir(dirPath, { recursive: true });
  return FileSysRes.OK;
};

export const deleteFile = async (filePath: string): Promise<string> => {
  const fileName = await basename(filePath);

  const confirmed = await ask(
    `Are you sure you want to delete '${fileName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete '${fileName}'?`,
      type: "warning",
    },
  );

  if (!confirmed) return FileSysRes.CANCEL;
  await removeFile(filePath);
  return FileSysRes.OK;
};

export const readDirectory = async (folderPath: string): Promise<any[]> => {
  const fileTree = await readDir(folderPath, { recursive: true });
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
