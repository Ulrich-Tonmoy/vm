import { invoke } from "@tauri-apps/api";

export const setToPath = (path: string, prevPath = "") => {
  invoke("get_user_path").then((message: unknown) => {
    const paths = message as string;
    console.log(paths.split(";"));

    let newPath = paths;
    if (prevPath) {
      newPath = paths.replace(prevPath, "");
    }
    if (!newPath.endsWith(";")) {
      newPath += ";";
    }
    newPath += path;

    invoke("set_user_path", { newPath }).then((message: unknown) => {
      const msg = message as string;
      console.log(msg);
    });
  });
};
