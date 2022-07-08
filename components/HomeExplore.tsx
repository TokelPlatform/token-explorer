import { extractTokenMeta, formatNumberTkl } from "utils/helpers";

import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { PATHS } from "utils/defines";
import React from "react";
import Token from "types/Token";

interface HomeExploreProps {
  tokens?: Array<Token>;
}

const HomeExplore: React.FC<HomeExploreProps> = ({ tokens }) => {
  if (!tokens) return null;

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:space-x-6">
          <h2 className="flex-1 text-2xl font-bold text-gray-900">
            Last Tokens For Sale
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-12 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tokens.map((token) => {
            const {
              transformedUrl,
              trimmedAuthorPublicKey,
              authorIdenticon,
              lastAskingPrice,
            } = extractTokenMeta(token);
            return (
              <div
                key={token.tokenid}
                className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-stretch">
                    <Link href={PATHS.TOKEN(token.tokenid)}>
                      <a title={token.name} className="block shrink-0">
                        <img
                          className="object-cover h-auto rounded w-36 sm:w-32"
                          src={transformedUrl}
                          alt={token.name}
                        />
                      </a>
                    </Link>

                    <div className="flex flex-col justify-between flex-1 ml-5">
                      <div>
                        <p className="text-base font-bold text-gray-900">
                          <Link href={PATHS.TOKEN(token.tokenid)}>
                            <a title={PATHS.TOKEN(token.tokenid)}>
                              {token.name}
                            </a>
                          </Link>
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500 flex gap-1">
                          <img
                            className="object-cover w-5 h-5 rounded-full shrink-0"
                            src={`data:image/png;base64,${authorIdenticon}`}
                            alt={token.owner}
                          />
                          <Link href={PATHS.EXPLORE({ search: token.owner })}>
                            <a
                              title={token.owner}
                              className="font-bold text-gray-900"
                            >
                              {trimmedAuthorPublicKey}
                            </a>
                          </Link>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 mt-4 gap-x-6 gap-y-2 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Asking Price
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {formatNumberTkl(lastAskingPrice)} TKL
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Supply
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-900">
                            {token.supply}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex mt-6">
          <Link href={PATHS.EXPLORE()}>
            <a className="ml-auto flex items-center gap-1 font-semibold text-2xl">
              See All Tokens <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

HomeExplore.defaultProps = {};

export default HomeExplore;
