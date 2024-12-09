import { DOTS, usePagination } from "@/lib/hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

export type Pagination = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = "",
}: Pagination) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNavigate = (direction: 1 | -1) =>
    onPageChange(currentPage + direction);

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classNames(
        "flex justify-center [&>li]:w-8 [&>li:not(.text-inactive)]:cursor-pointer [&>li]:h-8 [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:rounded gap-4 [&>li]:border [&>li]:border-[#BEBEBE]",
        {
          [className]: !!className,
        }
      )}
    >
      <li
        className={classNames({ "text-inactive": currentPage === 1 })}
        onClick={() => onNavigate(-1)}
      >
        <ChevronLeftIcon width={20} height={20} />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) return <>&#8230;</>;

        return (
          <li
            className={classNames({
              "bg-primary text-white !border-white": pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber as number)}
            key={`pagination-${index}`}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classNames({
          "text-inactive": currentPage === lastPage,
        })}
        onClick={() => onNavigate(1)}
      >
        <ChevronRightIcon width={20} height={20} />
      </li>
    </ul>
  );
};

export default Pagination;
