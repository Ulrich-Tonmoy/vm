import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRightIcon, GearIcon } from "@radix-ui/react-icons";
import { FontToggle } from "./FontToggle";
import { ThemeToggle } from "./theme-toggle";
import { Label } from "@/components/ui/label";
import { useAtomValue } from "jotai";
import { fontFamilyAtom, themeAtom } from "@/store";

export const Settings = () => {
  const theme = useAtomValue(themeAtom);
  const fontFamily = useAtomValue(fontFamilyAtom);

  return (
    <div className="m-0 p-0 size-8">
      <Sheet>
        <SheetTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GearIcon className="size-8 px-1.5 hover:bg-border hover:rounded-md" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Tweak the look and feel of the application.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-start justify-center w-full flex-col mt-4">
            <div className="flex items-center justify-center space-x-2 text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Label htmlFor="terms" className="flex justify-center items-center">
                      Change Font Family :
                      <FontToggle />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click on the icons to see the dropdown options.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ArrowRightIcon />
              <p className="font-bold">{fontFamily}</p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Label htmlFor="terms" className="flex justify-center items-center">
                      Toggle Theme :
                      <ThemeToggle />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click on the icons to see the dropdown options.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ArrowRightIcon />
              <p className="font-bold">{theme}</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
