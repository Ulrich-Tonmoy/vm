import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const ContentLayout = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge("flex-1 mt-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  ),
);
ContentLayout.displayName = "ContentLayout";
