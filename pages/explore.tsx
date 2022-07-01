import { ChevronDownIcon } from "@heroicons/react/solid";
import { DEFAULT_PER_PAGE } from "utils/defines";
import Footer from "../components/Footer";
import { GetServerSidePropsContext } from "next";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import React from "react";
import Token from "../types/Token";
import TokenCard from "../components/TokenCard";
import { elasticQuery } from "../utils/elastic";

interface ExploreProps {
  queryResults: Array<Token>;
  queryTotalCount: number;
  page: number;
}

const FilterCheckbox = ({ label }: { label: string }) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        type="checkbox"
        name=""
        id=""
        className="w-5 h-5 text-white border-gray-300 rounded-sm focus:ring-gray-900"
        defaultChecked={false}
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor="" className="text-sm font-medium text-gray-200">
        {label}
      </label>
    </div>
  </div>
);

const Explore: React.FC<ExploreProps> = ({ queryResults, queryTotalCount, page }) => {
  const totalPages = Math.ceil(queryTotalCount / DEFAULT_PER_PAGE);

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
                className="items-center justify-center hidden px-4 py-2 text-sm font-bold text-slate-100 transition-all duration-200 border border-gray-300 rounded-md md:inline-flex hover:bg-gray-50 hover:text-white focus:outline-none"
              >
                Sort Items
                <ChevronDownIcon className="w-4 h-4 ml-2 -mr-1" />
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center w-full px-4 py-3 mt-6 text-sm font-bold text-slate-100 transition-all duration-200 border border-gray-300 rounded-md md:hidden hover:bg-gray-50 hover:text-white focus:outline-none"
              >
                All Filters
                <ChevronDownIcon className="w-4 h-4 ml-2 -mr-1" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-6 md:mt-10 lg:grid-cols-4 gap-x-8 gap-y-10">
            <div className="hidden space-y-8 lg:block">
              <button
                type="button"
                className="opacity-0 inline-flex items-center p-1 -m-1 text-base font-bold text-white transition-all duration-200 focus:outline-none group"
              >
                <svg
                  className="w-5 h-5 mr-2 text-white group-hover:text-slate-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
                      Type
                    </button>

                    <div className="space-y-6">
                      <FilterCheckbox label="NFTs" />

                      <FilterCheckbox label="Fungible Tokens" />
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
                      <FilterCheckbox label="Crabbekyn Skulls" />
                      <FilterCheckbox label="Cyber Komodos" />
                      <FilterCheckbox label="Criptty" />
                      <FilterCheckbox label="Eye of the Komodo" />
                      <FilterCheckbox label="UFO" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6 px-6 mt-12 sm:mt-16 sm:px-0 sm:grid-cols-2 xl:grid-cols-3">
                {queryResults.map((token, index) => (
                  <TokenCard key={index} token={token} />
                ))}
              </div>

              <div className="mt-4">
                <Pagination currentPage={page} totalPages={totalPages} />
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
  const page = parseInt(context.query.page as unknown as string) || 1;
  const query = await elasticQuery(page, DEFAULT_PER_PAGE, [
    { height: { order: "desc" } },
  ]);
  
  return {
    props: {
      page,
      queryResults: query.hits.hits.map((hit: any) => hit._source),
      queryTotalCount: query.hits.total.value,
    },
  };
}

export default Explore;