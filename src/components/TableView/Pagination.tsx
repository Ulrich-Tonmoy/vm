import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/libs";

interface PaginationProps<TData> {
  table: Table<TData>;
  pageSize: number;
}

export const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
          (pageNumber) => {
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const isCurrent = currentPage === pageNumber;
            const isFirstPage = pageNumber === 1;
            const isLastPage = pageNumber === totalPages;

            // Show first page, last page, and 2 pages before and after current page
            const isNearCurrent = Math.abs(pageNumber - currentPage) <= 2;

            if (isFirstPage || isLastPage || isNearCurrent) {
              return (
                <Button
                  key={pageNumber}
                  variant={isCurrent ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 cursor-pointer",
                    isCurrent && "pointer-events-none",
                  )}
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                >
                  {pageNumber}
                </Button>
              );
            }

            // Show ellipsis after first page if not near it
            if (pageNumber === 2 && !isNearCurrent) {
              return <span key={pageNumber}>...</span>;
            }

            // Show ellipsis before last page if not near it
            if (pageNumber === totalPages - 1 && !isNearCurrent) {
              return <span key={pageNumber}>...</span>;
            }

            return null;
          },
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
