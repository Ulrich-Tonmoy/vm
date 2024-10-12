import { Button as ShadCnButton } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DialogButtonProps {
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "icon" | "default" | "sm" | "lg";
  disabled?: boolean;
  content: ReactElement | string;
  tooltip: string;
  info?: string;
  onClick: () => void;
}

export const DialogButton = ({
  variant,
  size,
  disabled = false,
  content,
  tooltip,
  info,
  onClick,
}: DialogButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <ShadCnButton disabled={disabled} variant={variant} size={size}>
                {content}
              </ShadCnButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure, you want to delete {info}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete Node {info}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-700"
                  onClick={onClick}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
