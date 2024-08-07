import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={twMerge("flex flex-row h-screen", className)} {...props}>
      {children}
    </div>
  );
};
