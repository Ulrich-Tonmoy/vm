import { cn, toolList } from "@/libs";
import { selectedToolAtom, updateSelectedToolAtom } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Sidebar = ({ className, children, ...props }: ComponentProps<"aside">) => {
  const updateSelectedTool = useSetAtom(updateSelectedToolAtom);
  const selectedTool = useAtomValue(selectedToolAtom);

  return (
    <aside
      className={twMerge("md:w-52 w-40 mt-1 p-1 overflow-y-auto", className)}
      {...props}
    >
      <div className="mb-2 text-xs">Available Tools -&gt; </div>
      {toolList.map((tool) => (
        <div
          key={tool.name}
          className={cn(
            "flex flex-row items-center p-2 m-1 hover:bg-slate-600 rounded-md",
            {
              "bg-slate-900": tool.type === selectedTool,
            },
          )}
          onClick={() => updateSelectedTool(tool.type)}
        >
          <img src={tool.icon} alt={tool.name} className="w-6 h-6 mr-2" />
          <span>{tool.name}</span>
        </div>
      ))}
    </aside>
  );
};
