import React from "react";

interface HomeExploreProps {
}

const HomeExplore: React.FC<HomeExploreProps> = () => {

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-900">Explore Tokel</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-12 sm:mt-16 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer">
                <div className="p-4">
                  <div className="flex items-stretch">
                    <a href="#" title="" className="block shrink-0">
                      <img
                        className="object-cover h-auto rounded w-36 sm:w-32"
                        src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/2/drop-1.png"
                        alt=""
                      />
                    </a>

                    <div className="flex flex-col justify-between flex-1 ml-5">
                      <div>
                        <p className="text-base font-bold text-gray-900">
                          <a href="#" title="">
                            Beetle King
                          </a>
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          by{" "}
                          <a
                            href="#"
                            title=""
                            className="font-bold text-gray-900"
                          >
                            Jenny Wilson
                          </a>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 mt-4 gap-x-6 gap-y-2 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Last Price
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            1.7k TKL
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Supply
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            39/100
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

HomeExplore.defaultProps = {}

export default HomeExplore;