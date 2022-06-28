import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import React from "react";
import classNames from "classnames";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange?: (newPage: number) => void;
}


interface PageProps {
  page: number | string;
  isCurrent?: boolean;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  const hasTwoPreviousPages = previousPage > 2;
  const hasTwoPagesLeft = totalPages - nextPage >= 2;

  const Page: React.FC<PageProps> = ({
    page,
    isCurrent,
    disabled,
  }) => (
    <button
      onClick={() => handlePageChange?.(page as number)}
      disabled={disabled}
      className={classNames(
        "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
        {
          "z-10 bg-indigo-50 border-sky-600 text-sky-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium":
            isCurrent,
        }
      )}
    >
      {page}
    </button>
  );

  if (totalPages === 0) return null;

  return (
    <div className="py-3 flex items-center justify-betweensm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-100">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange?.(previousPage)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {totalPages <= 7 ? (
              [...Array(totalPages)].map((_, index) => {
                const indexPage = index + 1;

                return (
                  <Page
                    page={indexPage}
                    isCurrent={currentPage === indexPage}
                  />
                );
              })
            ) : (
              <>
                {currentPage !== 1 && previousPage !== 1 && <Page page={1} />}

                {hasTwoPreviousPages && totalPages >= 7 && <Page page="..." disabled />}

                {previousPage !== currentPage && <Page page={previousPage} />}

                <Page page={currentPage} isCurrent />

                {nextPage !== currentPage && <Page page={nextPage} />}

                {hasTwoPagesLeft && totalPages >= 7 && <Page page="..." disabled />}

                {currentPage !== totalPages && nextPage !== totalPages && (
                  <Page page={totalPages} />
                )}
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                {/* <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-sky-600 text-sky-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                  8
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  9
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  10
                </a> */}
              </>
            )}

            <button
              onClick={() => handlePageChange?.(nextPage)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

Pagination.defaultProps = {}

export default Pagination;