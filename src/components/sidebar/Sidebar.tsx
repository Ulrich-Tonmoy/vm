import { toolList } from "@/libs";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Sidebar = ({ className, children, ...props }: ComponentProps<"aside">) => {
  return (
    <aside
      className={twMerge("md:w-52 w-40 mt-1 p-1 overflow-y-auto", className)}
      {...props}
    >
      <div className="text-xs mb-2">Available Tools -&gt; </div>
      {toolList.map((tool) => (
        <div
          key={tool.name}
          className="flex flex-row items-center p-2 hover:bg-slate-600"
        >
          <img src={tool.icon} alt={tool.name} className="h-6 w-6 mr-2" />
          <span>{tool.name}</span>
        </div>
      ))}
    </aside>
  );
};
