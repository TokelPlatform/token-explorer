import { ChevronDownIcon, ChevronUpIcon, XIcon } from "@heroicons/react/solid";
import { DEFAULT_PER_PAGE, FILTERS, HIGHLIGHTED_COLLECTIONS } from "utils/defines";
import React, { useMemo, useState } from "react";

import Footer from "../components/Footer";
import { GetServerSidePropsContext } from "next";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Token from "../types/Token";
import TokenCard from "../components/TokenCard";
import classNames from "classnames";
import { elasticQuery } from "../utils/elastic";
import { useRouter } from "next/router";

interface ExploreProps {
  queryResults: Array<Token>;
  queryTotalCount: number;
  page: number;
}


const Explore: React.FC<ExploreProps> = ({ queryResults, queryTotalCount, page }) => {

  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeParameters = router.query;

  const hasActiveParameters = useMemo(() => Object.keys(activeParameters).filter(item => item !== "page").length > 0, [activeParameters]);

  const filterLink = (filter: Record<string, any>) => ({
    pathname: router.pathname,
    query: { ...router.query, ...filter },
  });

  const handleFilterChange = ({ key, value }: { key: string, value?: string }) =>
    router.replace(filterLink({ [key]: value }));

  const handleClearFilters = () => router.replace({ pathname: router.pathname, query: {} });

  const totalPages = Math.ceil(queryTotalCount / DEFAULT_PER_PAGE);

  const FilterCheckbox = ({
    label,
    filterKey,
    value,
  }: {
    label: string;
    filterKey: string;
    value: string;
  }) => (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className="w-5 h-5 text-white border-gray-300 rounded-sm focus:ring-gray-900 cursor-pointer"
          checked={activeParameters[filterKey] === value}
          onChange={() =>
            handleFilterChange({
              key: filterKey,
              value: activeParameters[filterKey] === value ? undefined : value,
            })
          }
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="text-sm font-medium text-gray-200">{label}</label>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <section className="py-12 bg-primary sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="md:flex md:items-end md:justify-between">
            <div className="sm:max-w-md">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                All Tokel Tokens
              </h1>
              <p className="mt-4 text-base font-normal leading-7 text-gray-100">
                Filter, explore and discover the whole of of the Tokel chain,
                including art, collectibles, utility tokens, memorabilia, and
                more.
              </p>
            </div>

            <div>
              <button
                type="button"
                className="inline-flex items-center justify-center w-full px-4 py-3 mt-6 text-sm font-bold text-slate-100 transition-all duration-200 border border-gray-300 rounded-md md:hidden hover:bg-gray-50 hover:text-white focus:outline-none"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                All Filters
                {filtersOpen ? (
                  <ChevronUpIcon className="w-4 h-4 ml-2 -mr-1" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 ml-2 -mr-1" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-6 md:mt-10 lg:grid-cols-4 gap-x-8 gap-y-10">
            <div
              className={classNames("space-y-8 lg:block", {
                hidden: filtersOpen,
              })}
            >
              <button
                type="button"
                onClick={handleClearFilters}
                className={classNames(
                  "inline-flex items-center p-1 -m-1 text-base font-bold text-white transition-all duration-200 focus:outline-none group",
                  { "opacity-0": !hasActiveParameters }
                )}
              >
                <XIcon className="w-5 h-5 mr-2 text-white group-hover:text-slate-100" />
                Reset All Filters
              </button>

              <hr className="mt-5 border-gray-700" />

              <div className="flow-root mt-5">
                <div className="-my-6 divide-y divide-gray-700">
                  <div className="py-6 space-y-7">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-1 -m-1 text-base font-bold text-white transition-all duration-200 group focus:outline-none"
                    >
                      Sort
                    </button>

                    <div className="space-y-6">
                      <FilterCheckbox
                        label="Creation (most recent)"
                        filterKey="sort"
                        value="height:desc"
                      />

                      <FilterCheckbox
                        label="Creation (oldest)"
                        filterKey="sort"
                        value="height:asc"
                      />

                      {/* <FilterCheckbox
                        label="Name (A-Z)"
                        filterKey="sort"
                        value="name:asc"
                      />

                      <FilterCheckbox
                        label="Name (Z-A)"
                        filterKey="sort"
                        value="name:desc"
                      /> */}
                    </div>
                  </div>
                  <div className="py-6 space-y-7">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-1 -m-1 text-base font-bold text-white transition-all duration-200 group focus:outline-none"
                    >
                      Type
                    </button>

                    <div className="space-y-6">
                      <FilterCheckbox
                        label="NFTs"
                        filterKey="type"
                        value={FILTERS.TYPE.NFT}
                      />

                      <FilterCheckbox
                        label="Fungible Tokens"
                        filterKey="type"
                        value={FILTERS.TYPE.FUNGIBLE_TOKEN}
                      />
                    </div>
                  </div>

                  <div className="py-6 space-y-7">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-1 -m-1 text-base font-bold text-white transition-all duration-200 group focus:outline-none"
                    >
                      Highlighted Collections
                    </button>

                    <div className="space-y-6">
                      {HIGHLIGHTED_COLLECTIONS.map((collection) => (
                        <FilterCheckbox
                          key={collection.filterId}
                          label={collection.name}
                          filterKey="collection"
                          value={collection.filterId}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 px-6 mt-6 sm:px-0 sm:grid-cols-2 xl:grid-cols-3">
                {queryResults.map((token, index) => (
                  <TokenCard key={index} token={token} />
                ))}
              </div>

              <div className="mt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={queryTotalCount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

Explore.defaultProps = {};

export async function getServerSideProps(context: GetServerSidePropsContext) {

  let { page, type, sort } = context.query

  const pageInt = parseInt(page as unknown as string) || 1;

  const filters: any = [];
  const sortArray: any = [];

  if (type === FILTERS.TYPE.NFT) filters.push({ supply: { lte: 1 } });
  if (type === FILTERS.TYPE.FUNGIBLE_TOKEN) filters.push({ supply: { gt: 1 } });


  if (!!sort && typeof sort === 'string' && sort.includes(":")) {
    const sortParams = sort.split(":");
    sortArray.push({ [sortParams[0]]: { order: sortParams[1]} });
  } else {
    sortArray.push({ height: { order: 'desc' } });
  }

  const query = await elasticQuery(pageInt, DEFAULT_PER_PAGE, sortArray, filters);
  
  return {
    props: {
      page: pageInt,
      queryResults: query.hits.hits.map((hit: any) => hit._source),
      queryTotalCount: query.hits.total.value,
    },
  };
}

export default Explore;