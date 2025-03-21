import { DEFAULT_REMOVE_FROM_PATH } from "@/libs/constants/config";
import { invoke } from "@tauri-apps/api/core";

export const setToPath = (path: string) => {
  invoke("get_user_path").then((message: unknown) => {
    const paths = message as string;
    console.log(paths.split(";"));

    let newPath = paths;

    const contains = DEFAULT_REMOVE_FROM_PATH.some((defaultPath) =>
      newPath.includes(defaultPath),
    );
    if (contains) removeFromPath();

    if (!newPath.endsWith(";")) {
      newPath += ";";
    }
    if (!newPath.includes(path)) {
      newPath += path;
    }
    if (!newPath.endsWith(";")) {
      newPath += ";";
    }

    invoke("set_user_path", { newPath }).then((message: unknown) => {
      const msg = message as string;
      console.log(msg);
    });
  });
};

export const removeFromPath = (pathToRemove: string[] = DEFAULT_REMOVE_FROM_PATH) => {
  invoke("get_user_path").then((message: unknown) => {
    const paths = message as string;
    console.log(paths.split(";"));

    let newPath = paths;
    if (pathToRemove.length > 0) {
      pathToRemove.forEach((prev) => {
        if (!prev.endsWith(";")) {
          prev += ";";
        }
        newPath = newPath.replace(prev, "");
      });
    }

    invoke("set_user_path", { newPath }).then((message: unknown) => {
      const msg = message as string;
      console.log(msg);
    });
  });
};
