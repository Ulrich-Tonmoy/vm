import { ToolType } from "../enums";

export interface ToolList {
  name: string;
  icon: string;
  type: ToolType;
  style?: string;
}
