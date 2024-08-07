import { CopyIcon, Cross1Icon, MinusIcon, SquareIcon } from "@radix-ui/react-icons";
import { appWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "./ModeToggle";

export const TitleBar = () => {
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
      className="fixed top-0 left-0 right-0 flex items-center justify-between pl-1 bg-secondary"
      data-tauri-drag-region
    >
      <div className="flex items-center gap-1">
        <img
          src="/logo.ico"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
      </div>
      <div className="cursor-default text-text">JavaScript Version Manager</div>
      <div className="flex items-center">
        <ModeToggle />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MinusIcon
                className="px-2 py-1 text-center cursor-pointer size-8 hover:bg-gray-800"
                onClick={onMinimize}
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
                <SquareIcon
                  className="px-2 py-1 text-center cursor-pointer size-8 hover:bg-gray-800"
                  onClick={onScaleDown}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Maximize</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CopyIcon
                  className="px-2 py-1 text-center scale-x-[-1] cursor-pointer size-8 hover:bg-gray-800"
                  onClick={onScaleUp}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Restore Down</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Cross1Icon
                className="px-2 py-1 text-center cursor-pointer size-8 hover:bg-red-500"
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
