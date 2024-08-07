import { Button as ShadCnButton } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";

interface ButtonProps {
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "icon" | "default" | "sm" | "lg";
  disabled?: boolean;
  content: ReactElement | string;
  tooltip: string;
  onClick: () => void;
}

export const Button = ({
  variant,
  size,
  disabled = false,
  content,
  tooltip,
  onClick,
}: ButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <ShadCnButton
            disabled={disabled}
            variant={variant}
            size={size}
            onClick={onClick}
          >
            {content}
          </ShadCnButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
