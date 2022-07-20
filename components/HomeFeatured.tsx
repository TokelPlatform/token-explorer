import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { DEFAULT_IPFS_FALLBACK_GATEWAY, PATHS } from "utils/defines";
import {
  extractIPFSHash,
  extractTokenMeta,
  formatNumberTkl,
} from "utils/helpers";

import Link from "next/link";
import React from "react";
import Token from "types/Token";
import classNames from "classnames";

interface HomeFeaturedProps {
  tokens?: Array<Token>;
}

const HomeFeatured: React.FC<HomeFeaturedProps> = ({ tokens }) => {
  if (!tokens) return null;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:space-x-6">
          <h2 className="flex-1 text-2xl font-bold text-gray-900">
            Featured NFTs & Tokens
          </h2>
        </div>

        <div className="mt-12">
          <div className="md:grid md:grid-cols-4 flex flex-col w-full gap-6 pt-4 pb-8 -mt-4">
            {tokens.map((token) => {
              const {
                transformedUrl,
                collectionName,
                lastBidPrice,
                lastAskingPrice,
                lastPrice,
              } = extractTokenMeta(token);
              return (
                <div className="bg-gray-800 rounded-lg scroll-ml-6 shrink-0 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
                  <Link href={PATHS.TOKEN(token.tokenid)} key={token.tokenid}>
                    <a title={`View ${token.name}`}>
                      <div className="p-4">
                        <div className="overflow-hidden rounded aspect-w-4 aspect-h-3">
                          <img
                            className="object-cover w-full h-full"
                            src={transformedUrl}
                            alt={token.name}
                          />
                        </div>
                        <p className="mt-4 text-base font-bold text-white">
                          {token.name}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-400 truncate">
                          {token.description}
                        </p>
                        <hr className="mt-3 border-gray-700" />
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                              Collection
                            </p>
                            <p
                              className={classNames(
                                "mt-1 text-sm font-bold text-white",
                                {
                                  italic: !collectionName,
                                }
                              )}
                            >
                              {collectionName || "No Collection"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                              {!!lastPrice
                                ? "Last Price"
                                : !!lastAskingPrice
                                ? "Last Offer"
                                : !!lastBidPrice
                                ? "Last Bid"
                                : "Last Price"}
                            </p>
                            <p className="mt-1 text-sm font-bold text-white">
                              {!!lastPrice
                                ? `${formatNumberTkl(lastPrice)} TKL`
                                : !!lastAskingPrice
                                ? `${formatNumberTkl(lastAskingPrice)} TKL`
                                : !!lastBidPrice
                                ? `${formatNumberTkl(lastBidPrice)} TKL`
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

HomeFeatured.defaultProps = {};

export default HomeFeatured;
