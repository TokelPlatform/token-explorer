import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

import { DEFAULT_IPFS_FALLBACK_GATEWAY } from "utils/defines";
import Link from "next/link";
import React from "react";
import Token from "types/Token";
import classNames from "classnames";
import { extractIPFSHash } from "utils/helpers";

interface HomeFeaturedProps {
  featured?: Array<Token>;
}

const HomeFeatured: React.FC<HomeFeaturedProps> = ({ featured }) => {
  if (!featured) return null;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:space-x-6">
          <h2 className="flex-1 text-2xl font-bold text-gray-900">
            Featured NFTs & Tokens
          </h2>
        </div>

        <div className="mt-12">
          <div className="flex w-full gap-6 pt-4 pb-8 -mt-4 overflow-x-auto snap-x">
            {featured.map((token) => {
              const exctractedIpfsHash =
                !!token.dataAsJson?.url &&
                extractIPFSHash(token.dataAsJson.url);
              const transformedUrl = !!exctractedIpfsHash
                ? `${DEFAULT_IPFS_FALLBACK_GATEWAY}/${exctractedIpfsHash}`
                : token.dataAsJson?.url;
              const collectionName =
                token.dataAsJson?.arbitrary?.collection_name;

              const lastPrice = token.tokenDEX
                ?.filter((item) => item.funcid === "S" || item.funcid === "B")
                ?.sort((a, b) => b.blockHeight - a.blockHeight)?.[0]?.price;

              const lastOfferPrice = token.tokenDEX
                ?.filter((item) => item.funcid === "s")
                ?.sort((a, b) => b.blockHeight - a.blockHeight)?.[0]?.price;

              const lastBidPrice = token.tokenDEX
                ?.filter((item) => item.funcid === "b")
                ?.sort((a, b) => b.blockHeight - a.blockHeight)?.[0]?.price;
              return (
                <Link href={`/tokens/${token.tokenid}`} key={token.tokenid}>
                  <a title={`View ${token.name}`}>
                    <div className="relative w-full overflow-hidden bg-gray-800 rounded-lg snap-start scroll-ml-6 shrink-0 lg:w-[286px] sm:w-1/2 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
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
                                : !!lastOfferPrice
                                ? "Last Offer"
                                : !!lastBidPrice
                                ? "Last Bid"
                                : "Last Price"}
                            </p>
                            <p className="mt-1 text-sm font-bold text-white">
                              {!!lastPrice
                                ? `${lastPrice} TKL`
                                : !!lastOfferPrice
                                ? `${lastOfferPrice} TKL`
                                : !!lastBidPrice
                                ? `${lastBidPrice} TKL`
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
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
