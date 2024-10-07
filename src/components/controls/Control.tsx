import { appWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon, Cross1Icon, MinusIcon, SquareIcon } from "@radix-ui/react-icons";
import { Settings } from "./settings";

export const Control = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const onMinimize = () => appWindow.minimize();

  const onScaleUp = () => {
    appWindow.toggleMaximize();
    setIsMaximized(true);
  };

  const onScaleDown = () => {
    appWindow.toggleMaximize();
    setIsMaximized(false);
  };

  const onClose = () => appWindow.close();

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between shadow-sm"
      data-tauri-drag-region
    >
      <div className="flex">
        <span className="pl-1 text-xl font-black flex justify-center items-center">
          <img src="/node.png" alt="node logo" className="w-8 h-6 pr-2" />
          Node JS Version Manager
        </span>
      </div>
      <div className="flex items-center">
        <Settings />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MinusIcon
                className="px-2 py-1 text-center cursor-pointer size-8 hover:bg-border hover:rounded-md"
                onClick={() => onMinimize()}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Minimize</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isMaximized ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CopyIcon
                  className="px-2 py-1 text-center scale-x-[-1] cursor-pointer size-8 hover:bg-border hover:rounded-md"
                  onClick={() => onScaleDown()}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Restore Down</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SquareIcon
                  className="px-2 py-1 text-center cursor-pointer size-8 hover:bg-border hover:rounded-md"
                  onClick={() => onScaleUp()}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Maximize</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Cross1Icon
                className="px-2 py-1 text-center cursor-pointer size-8 hover:bg-red-500 hover:rounded-md"
                onClick={onClose}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};