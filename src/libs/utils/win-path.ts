import { invoke } from "@tauri-apps/api";

export const setToPath = (path: string) => {
  invoke("get_user_path").then((message: unknown) => {
    const paths = message as string;
    console.log(paths.split(";"));

    let newPath = paths;
    if (!newPath.endsWith(";")) {
      newPath += ";";
    }

    if (!newPath.includes(path)) {
      newPath += path;
    }

    invoke("set_user_path", { newPath }).then((message: unknown) => {
      const msg = message as string;
      console.log(msg);
    });
  });
};

export const removeFromPath = (
  pathToRemove: string[] = ["%NVM_SYMLINK%;", "C:\\Program Files\\nodejs;"],
) => {
  invoke("get_user_path").then((message: unknown) => {
    const paths = message as string;
    console.log(paths.split(";"));

    let newPath = paths;
    if (pathToRemove.length > 0) {
      pathToRemove.forEach((prev) => {
        newPath = newPath.replace(prev, "");
      });
    }

    invoke("set_user_path", { newPath }).then((message: unknown) => {
      const msg = message as string;
      console.log(msg);
    });
  });
};
