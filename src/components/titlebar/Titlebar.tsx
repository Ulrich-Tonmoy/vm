import { Left } from "./Left";
import { Center } from "./Center";
import { Right } from "./Right";

export const TitleBar = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between pl-1 shadow-md"
      data-tauri-drag-region
    >
      <Left />
      <Center />
      <Right />
    </div>
  );
};
