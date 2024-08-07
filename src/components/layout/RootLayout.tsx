import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge("flex flex-row h-[calc(100vh-28px)] mt-7", className)}
      {...props}
    >
      {children}
    </div>
  );
};
