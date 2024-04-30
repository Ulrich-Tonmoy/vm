import { configAtom, selectedToolAtom } from "@/store";
import { useAtomValue } from "jotai";

export const ContentBody = () => {
  const selectedTool = useAtomValue(selectedToolAtom);
  const config = useAtomValue(configAtom);

  console.log(config);
  return <div className="flex justify-center items-center h-full">{selectedTool}</div>;
};
