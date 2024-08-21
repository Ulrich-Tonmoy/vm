import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, toolList, ToolType } from "@/libs";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedToolAtom, updateSelectedToolAtom } from "@/store";

export const Left = () => {
  const updateSelectedTool = useSetAtom(updateSelectedToolAtom);
  const selectedTool = useAtomValue(selectedToolAtom);

  const toggleTool = (tool: ToolType) => {
    if (tool === selectedTool) {
      updateSelectedTool(null);
    } else {
      updateSelectedTool(tool);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <img
              src="/logo.ico"
              alt="Version Manager"
              className="w-5 mr-2 cursor-default"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Version Manager</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {toolList.map((tool) => (
        <TooltipProvider key={tool.name}>
          <Tooltip>
            <TooltipTrigger>
              <div
                key={tool.name}
                className={cn("px-1", tool?.style, {
                  "border-ring border-t-4": tool.type === selectedTool,
                })}
                onClick={() => toggleTool(tool.type)}
              >
                <img src={tool.icon} alt={tool.name} className="size-6" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tool.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
