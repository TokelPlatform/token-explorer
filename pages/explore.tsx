import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import React from "react";

interface ExploreProps {
}

const FilterCheckbox = ({ label }: { label: string }) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        type="checkbox"
        name=""
        id=""
        className="w-5 h-5 text-white border-gray-300 rounded-sm focus:ring-gray-900"
        checked
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor="" className="text-sm font-medium text-gray-200">
        {label}
      </label>
    </div>
  </div>
);

const Explore: React.FC<ExploreProps> = () => {

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
                <svg
                  className="w-4 h-4 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center w-full px-4 py-3 mt-6 text-sm font-bold text-slate-100 transition-all duration-200 border border-gray-300 rounded-md md:hidden hover:bg-gray-50 hover:text-white focus:outline-none"
              >
                All Filters
                <svg
                  className="w-4 h-4 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-6 md:mt-10 lg:grid-cols-4 gap-x-8 gap-y-10">
            <div className="hidden space-y-8 lg:block">
              <button
                type="button"
                className="inline-flex items-center p-1 -m-1 text-base font-bold text-white transition-all duration-200 focus:outline-none group"
              >
                <svg
                  className="w-5 h-5 mr-2 text-white group-hover:text-slate-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                      <FilterCheckbox label="Skulls" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6 px-6 mt-12 sm:mt-16 sm:px-0 sm:grid-cols-2 xl:grid-cols-3">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden transition-all duration-200 transform bg-white border rounded-lg border-gray-700 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="p-4">
                        <div className="flex items-center">
                          <img
                            className="object-cover w-5 h-5 rounded-full shrink-0"
                            src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/7/author.png"
                            alt=""
                          />
                          <a
                            href="#"
                            title=""
                            className="flex-1 ml-2 text-sm font-medium text-gray-700"
                          >
                            0xDD...2E08
                          </a>
                        </div>
                      </div>

                      <a
                        href="#"
                        title=""
                        className="block overflow-hidden aspect-w-1 aspect-h-1"
                      >
                        <img
                          className="object-cover w-full h-full"
                          src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/6/drop-1.png"
                          alt=""
                        />
                      </a>

                      <div className="p-4">
                        <p className="text-base font-bold text-primary">
                          <a href="#" title="">
                            Washer
                          </a>
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Erat eget etiam.
                        </p>
                      </div>

                      <div className="p-4 border-t border-gray-700">
                        <div className="flex items-center justify-between space-x-6">
                          <div className="flex items-center flex-1">
                            <div className="relative inline-flex items-center justify-center shrink-0 w-7 h-7">
                              <div className="absolute inset-0">
                                <img
                                  className="w-full h-full object-coveer"
                                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/6/avatar-background.png"
                                  alt=""
                                />
                              </div>
                              <div className="relative text-xs font-bold text-slate-600 uppercase">
                                FA
                              </div>
                            </div>
                            <div className="flex-1 ml-3">
                              <p className="text-xs font-medium text-gray-500 uppercase">
                                Owned by
                              </p>
                              <p className="mt-0.5 text-sm font-bold text-gray-600">
                                Jenny Wilson
                              </p>
                            </div>
                          </div>

                          <div>
                            <a
                              href="#"
                              title=""
                              className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-200 bg-transparent border border-primary rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:border-primary hover:bg-primary hover:text-white"
                              role="button"
                            >
                              Place bid
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-4">
                <Pagination currentPage={2} totalPages={50} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

Explore.defaultProps = {}

export default Explore;