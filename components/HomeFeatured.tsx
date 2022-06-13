import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid";

import React from "react";

interface HomeFeaturedProps {
}

const HomeFeatured: React.FC<HomeFeaturedProps> = () => {

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:space-x-6">
          <h2 className="flex-1 text-2xl font-bold text-gray-900">
            Featured NFTs & Tokens
          </h2>

          <div className="hidden lg:items-center lg:justify-end lg:space-x-3 lg:flex">
            <button
              type="button"
              className="p-1.5 -m-1.5 text-gray-300 transition-all duration-200 rounded-full hover:text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>

            <button
              type="button"
              className="p-1.5 -m-1.5 text-gray-300 transition-all duration-200 rounded-full hover:text-gray-600 hover:bg-gray-100"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex w-full gap-6 pt-4 pb-8 -mt-4 overflow-x-auto snap-x">
            <div className="relative w-full overflow-hidden bg-gray-800 rounded-lg snap-start scroll-ml-6 shrink-0 lg:w-[286px] sm:w-1/2 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
              <div className="p-4">
                <div className="overflow-hidden rounded aspect-w-4 aspect-h-3">
                  <img
                    className="object-cover w-full h-full"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/3/drop-1.png"
                    alt=""
                  />
                </div>
                <p className="mt-4 text-base font-bold text-white">
                  <a href="#" title="">
                    Grave Digger
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium text-gray-400">
                  3233 NFTs
                </p>
                <hr className="mt-3 border-gray-700" />
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      Floor
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">2.1 TKL</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      30d Avg Price
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">1.9 TKL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden bg-gray-800 rounded-lg snap-start scroll-ml-6 shrink-0 lg:w-[286px] sm:w-1/2 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
              <div className="p-4">
                <div className="overflow-hidden rounded aspect-w-4 aspect-h-3">
                  <img
                    className="object-cover w-full h-full"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/3/drop-2.png"
                    alt=""
                  />
                </div>
                <p className="mt-4 text-base font-bold text-white">
                  <a href="#" title="">
                    Cujo
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium text-gray-400">
                  3233 NFTs
                </p>
                <hr className="mt-3 border-gray-700" />
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      Floor
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">2.1 TKL</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      30d Avg Price
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">1.9 TKL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden bg-gray-800 rounded-lg snap-start scroll-ml-6 shrink-0 lg:w-[286px] sm:w-1/2 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
              <div className="p-4">
                <div className="overflow-hidden rounded aspect-w-4 aspect-h-3">
                  <img
                    className="object-cover w-full h-full"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/3/drop-3.png"
                    alt=""
                  />
                </div>
                <p className="mt-4 text-base font-bold text-white">
                  <a href="#" title="">
                    Drugstore Cowboy
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium text-gray-400">
                  3233 NFTs
                </p>
                <hr className="mt-3 border-gray-700" />
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      Floor
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">2.1 TKL</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      30d Avg Price
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">1.9 TKL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden bg-gray-800 rounded-lg snap-start scroll-ml-6 shrink-0 lg:w-[286px] sm:w-1/2 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
              <div className="p-4">
                <div className="overflow-hidden rounded aspect-w-4 aspect-h-3">
                  <img
                    className="object-cover w-full h-full"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/3/drop-4.png"
                    alt=""
                  />
                </div>
                <p className="mt-4 text-base font-bold text-white">
                  <a href="#" title="">
                    Keystone
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium text-gray-400">
                  3233 NFTs
                </p>
                <hr className="mt-3 border-gray-700" />
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      Floor
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">2.1 TKL</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      30d Avg Price
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">1.9 TKL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 space-x-3 lg:hidden">
          <button
            type="button"
            className="p-1.5 -m-1.5 text-gray-300 transition-all duration-200 rounded-full hover:text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <button
            type="button"
            className="p-1.5 -m-1.5 text-gray-300 transition-all duration-200 rounded-full hover:text-gray-600 hover:bg-gray-100"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

HomeFeatured.defaultProps = {}

export default HomeFeatured;