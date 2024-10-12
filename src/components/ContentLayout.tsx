import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const ContentLayout = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-row h-[calc(100vh-32px)] mt-8", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
ContentLayout.displayName = "ContentLayout";
