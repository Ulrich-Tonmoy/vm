import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface ColumnFilterProps<TData> {
  column: Column<TData>;
  title: string;
  filterValues?: string[];
}

export const ColumnFilter = <TData,>({
  column,
  title,
  filterValues,
}: ColumnFilterProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 hover:bg-accent cursor-pointer">
          {title}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="border-border">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          className="cursor-pointer"
          checked={column.getIsSorted() === "asc"}
          onSelect={(e) => e.preventDefault()}
          onCheckedChange={() => column.toggleSorting(false)}
        >
          Ascending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="cursor-pointer"
          checked={column.getIsSorted() === "desc"}
          onSelect={(e) => e.preventDefault()}
          onCheckedChange={() => column.toggleSorting(true)}
        >
          Descending
        </DropdownMenuCheckboxItem>
        {filterValues && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            {filterValues.map((value) => (
              <DropdownMenuCheckboxItem
                key={value}
                className="hover:bg-accent cursor-pointer"
                checked={
                  Array.isArray(column?.getFilterValue())
                    ? (column?.getFilterValue() as string[])?.includes(value)
                    : false
                }
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(checked) => {
                  const currentFilters = Array.isArray(column?.getFilterValue())
                    ? (column?.getFilterValue() as string[])
                    : [];
                  if (checked) {
                    column?.setFilterValue([...currentFilters, value]);
                  } else {
                    column?.setFilterValue(currentFilters.filter((val) => val !== value));
                  }
                }}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
