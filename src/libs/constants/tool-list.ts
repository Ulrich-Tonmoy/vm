import { ToolType } from "../enums";
import { ToolList } from "../models";

export const toolList: ToolList[] = [
  {
    name: "Node JS",
    icon: "/node.png",
    type: ToolType.NODE,
  },
  {
    name: "Bun",
    icon: "/bun.png",
    type: ToolType.BUN,
  },
  {
    name: "Deno",
    icon: "/deno.png",
    type: ToolType.DENO,
    style: "dark:bg-foreground ",
  },
];
