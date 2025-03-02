import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fontFamilyList } from "@/libs/constants/font-list";
import { fontFamilyAtom, updateConfigAtom } from "@/libs/store/config";
import { FontFamilyIcon } from "@radix-ui/react-icons";
import { useAtomValue, useSetAtom } from "jotai";

export function FontToggle() {
  const fontFamily = useAtomValue(fontFamilyAtom);
  const updateConfig = useSetAtom(updateConfigAtom);

  const onChange = (fontFamily: string) => {
    updateConfig({ fontFamily });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="size-[30px] inline-flex items-center justify-center hover:bg-border whitespace-nowrap rounded-md transition-colors cursor-pointer">
          <FontFamilyIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle Font Family</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Font Family</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={fontFamily} onValueChange={onChange}>
          {fontFamilyList.map((item) => (
            <DropdownMenuRadioItem value={item.value} key={item.value}>
              {item.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
