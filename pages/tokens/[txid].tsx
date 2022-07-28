import React, { useMemo, useState } from "react";
import { extractTokenMeta, formatNumberTkl } from "utils/helpers";

import { ExternalLinkIcon } from "@heroicons/react/solid";
import Footer from "components/Footer";
import { GetStaticPropsContext } from "next";
import HtmlHead from "components/HtmlHead";
import Modal from "components/Modal";
import Navbar from "components/Navbar";
import OpeningInDapp from "components/OpeningInDapp";
import Tabs from "components/Tabs";
import Token from "types/Token";
import { getToken } from "utils/tokens";

interface TokenSingleProps {
  token: Token;
}

const TokenSingle: React.FC<TokenSingleProps> = ({ token }) => {
  const [isInteractingWithMarket, setIsInteractingWithMarket] = useState(false);

  const handlePostBid = () => {
    setIsInteractingWithMarket(true);
    window.open(`tokel://dex?action=bid&tokenid=${token.tokenid}`, "_self");
  };

  const handleFill = (orderId: string) => {
    window.open(`tokel://dex?action=fill&orderid=${orderId}`, "_self");
    setIsInteractingWithMarket(true);
  };

  if (!token) return null;

  const bids = token.tokenDEX?.filter((item) => item.funcid === "b");
  const asks = token.tokenDEX?.filter((item) => item.funcid === "s");

  const { transformedUrl, authorIdenticon, bestAsk } = extractTokenMeta(token);

  // Mock state for token
  const isListed = !!bestAsk;

  return (
    <div>
      <HtmlHead title={`${token.name} - Token on Tokel`} />

      {isInteractingWithMarket && (
        <Modal handleClose={() => setIsInteractingWithMarket(false)}>
          <OpeningInDapp />
        </Modal>
      )}

      <Navbar />

      <section className="py-12 bg-primary sm:py-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-1 lg:mt-12 lg:grid-cols-5 lg:gap-y-4 lg:gap-x-12 xl:gap-x-16">
            {!!transformedUrl && (
              <div className="lg:col-span-2 lg:row-end-1 mx-auto">
                <div className="lg:flex lg:items-start mx-auto">
                  <div className="overflow-hidden bg-soft border-2 border-soft rounded-lg">
                    <img
                      className="object-cover w-full h-full rounded-lg"
                      src={transformedUrl}
                      alt={token.name}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="lg:col-span-3 lg:row-end-2 lg:row-span-2">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {token.name}
              </h1>

              <p className="mt-5 text-sm font-medium text-gray-400">
                Token ID
                <a
                  className="text-blue-500 hover:text-blue-700 flex break-all"
                  href={`http://explorer.tokel.io/tokens/${token.tokenid}/transactions`}
                  target="_blank" rel="noreferrer"
                >
                  {token.tokenid}
                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                </a>
              </p>

              <p className="mt-5 text-sm font-medium text-gray-400">
                Raw Media Url
                <a
                  className="text-blue-500 hover:text-blue-700 flex break-all"
                  href={transformedUrl}
                  target="_blank" rel="noreferrer"
                >
                  {token.dataAsJson?.url}
                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                </a>
              </p>

              <p className="mt-5 text-sm font-medium text-gray-400 break-all">
                Created By
                <p className="text-soft flex gap-1 mt-1">
                  <img
                    className="object-cover w-5 h-5 rounded-full shrink-0"
                    src={`data:image/png;base64,${authorIdenticon}`}
                    alt={token.owner}
                  />
                  {token.owner}
                </p>
              </p>

              {isListed && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-gray-400">
                    Listing price
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatNumberTkl(bestAsk?.price)} TKL
                  </p>
                </div>
              )}

              <div className="flex items-center mt-10 mb-5 space-x-4">
                {isListed && (
                  <button
                    type="button"
                    onClick={() => handleFill(bestAsk?.txid)}
                    className="inline-flex items-center justify-center px-12 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-blue-500 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 hover:bg-blue-700"
                  >
                    Buy Now
                  </button>
                )}
                <button
                  type="button"
                  onClick={handlePostBid}
                  className="inline-flex items-center justify-center px-12 py-3 text-base font-bold leading-7 text-blue-500 transition-all duration-200 border-blue-500 border-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:border-transparent focus:ring-blue-900 hover:bg-blue-700"
                >
                  Make a Bid
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-end-3 bg-soft p-4 rounded-lg">
              <h2 className="mt-1 text-sm font-medium text-gray-400">
                Description
              </h2>
              <p className="mt-1 text-base text-gray-700 break-all">
                {token.description}
              </p>

              <h2 className="mt-4 text-sm font-medium text-gray-400">Supply</h2>
              <p className="mt-1 text-base text-gray-700">
                {token.supply} {token.supply === 1 && "(NFT)"}
              </p>

              {typeof token.dataAsJson?.arbitrary === "object" ? (
                Object.keys(token.dataAsJson.arbitrary).map((key, index) => (
                  <div key={index}>
                    <h2 className="mt-4 text-sm font-medium text-gray-400  reak-all">
                      {key.replaceAll("_", " ").replaceAll("-", " ")}
                    </h2>
                    <p className="mt-1 text-base text-gray-700 break-all">
                      {token.dataAsJson?.arbitrary[key]}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <h2 className="mt-4 text-sm font-medium text-gray-400">
                    Arbitrary Data
                  </h2>
                  <p className="mt-1 text-base text-gray-700">
                    {token.dataAsJson?.arbitrary}
                  </p>
                </>
              )}
            </div>

            <div className="lg:col-span-3">
              <Tabs
                tabs={[
                  {
                    title: "Listings",
                    content:
                      asks.length > 0 ? (
                        <div className="flow-root mt-2 sm:mt-4 bg-soft p-4 rounded-lg overflow-scroll">
                          <table className="min-w-full lg:divide-y lg:divide-gray-400">
                            <thead className="hidden lg:table-header-group">
                              <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Seller
                                </td>

                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Amount
                                </td>

                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Price
                                </td>

                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Total
                                </td>

                                <td></td>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-400">
                              {asks.map((ask) => (
                                <tr key={ask.tokenid}>
                                  <td className="px-4 py-4">
                                    <a
                                      className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                      href={`http://explorer.tokel.io/address/${ask.origtokenaddress}`}
                                      target="_blank" rel="noreferrer"
                                    >
                                      {ask.origaddress}
                                      <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                    </a>
                                  </td>

                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                    {ask.askamount}
                                  </td>

                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 lg:text-left whitespace-nowrap">
                                    {formatNumberTkl(ask.price)} TKL
                                  </td>

                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                    {formatNumberTkl(
                                      ask.price * (ask.askamount || 1)
                                    )}{" "}
                                    TKL
                                  </td>

                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => handleFill(ask.txid)}
                                      className="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-7 text-blue-500 transition-all duration-200 border-blue-500 border-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:border-transparent focus:ring-blue-900 hover:bg-blue-700"
                                    >
                                      Fill
                                      <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="p-4 text-soft">
                          No listings for this token yet.
                        </p>
                      ),
                  },
                  {
                    title: "Offers",
                    content:
                      bids.length > 0 ? (
                        <div className="flow-root mt-2 sm:mt-4 bg-soft p-4 rounded-lg overflow-scroll">
                          <table className="min-w-full lg:divide-y lg:divide-gray-400">
                            <thead className="hidden lg:table-header-group">
                              <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Buyer
                                </td>

                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Amount
                                </td>

                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Price
                                </td>

                                <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                  Total
                                </td>

                                <td></td>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-400">
                              {bids.map((bid) => (
                                <tr key={bid.tokenid}>
                                  <td className="px-4 py-4">
                                    <a
                                      className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                      href={`http://explorer.tokel.io/address/${bid.origtokenaddress}`}
                                      target="_blank" rel="noreferrer"
                                    >
                                      {bid.origtokenaddress}
                                      <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                    </a>
                                  </td>

                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                    {bid.totalrequired}
                                  </td>

                                  <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 lg:text-left whitespace-nowrap">
                                    {formatNumberTkl(bid.price)} TKL
                                  </td>

                                  <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                    {formatNumberTkl(
                                      bid.price * bid.totalrequired
                                    )}{" "}
                                    TKL
                                  </td>

                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => handleFill(bid.txid)}
                                      className="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-7 text-blue-500 transition-all duration-200 border-blue-500 border-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:border-transparent focus:ring-blue-900 hover:bg-blue-700"
                                    >
                                      Fill
                                      <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="p-4 text-soft">
                          No offers for this token yet.
                        </p>
                      ),
                  },
                  {
                    title: "Activity",
                    content: (
                      <p className="p-4 text-soft">
                        Not available at the moment
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

TokenSingle.defaultProps = {};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const token = await getToken(params?.txid as string);

  return {
    props: {
      token,
    },
  };
}

export default TokenSingle;
