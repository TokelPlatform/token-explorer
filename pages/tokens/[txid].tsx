import React, { useMemo } from "react";

import { ExternalLinkIcon } from "@heroicons/react/solid";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Tabs from "../../components/Tabs";

interface TokenSingleProps {
  token: any;
}

const TokenSingle: React.FC<TokenSingleProps> = ({ token }) => {

  if (!token) return null;

  const decodedArbitraryAsJson = useMemo(() => {
    try {
      return JSON.parse(token.dataAsJson.decodedArbitrary);
    } catch (e) {
      return token.dataAsJson.decodedArbitrary;
    }
  }, [token]);

  return (
    <div>
      <Navbar />

      <section className="py-12 bg-primary sm:py-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-1 lg:mt-12 lg:grid-cols-5 lg:gap-y-4 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-2 lg:row-end-1">
              <div className="lg:flex lg:items-start mx-auto">
                <div className="overflow-hidden bg-soft border-2 border-soft rounded-lg">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={token.dataAsJson.url}
                    alt={token.name}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:row-end-2 lg:row-span-2">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {token.name}
              </h1>

              <p className="mt-5 text-sm font-medium text-gray-400">
                Token ID
                <a
                  className="text-blue-500 hover:text-blue-700 flex"
                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                  target="_blank"
                >
                  {token.tokenid}
                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                </a>
              </p>

              <p className="mt-5 text-sm font-medium text-gray-400">
                Created By
                <a
                  className="text-blue-500 hover:text-blue-700 flex"
                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                  target="_blank"
                >
                  {token.owner}
                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                </a>
              </p>

              <p className="mt-5 text-sm font-medium text-gray-400">
                Owned by
                <a
                  className="text-blue-500 hover:text-blue-700 flex"
                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                  target="_blank"
                >
                  RAyYBfQSbrVbkK7AvdjWC7cdZkJEXgDyUE
                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                </a>
              </p>

              <div className="mt-5">
                <p className="text-sm font-medium text-gray-400">
                  Listing price
                </p>
                <p className="text-3xl font-bold text-white">320 TKL</p>
              </div>

              <div className="flex items-center mt-10 space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-12 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-blue-500 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 hover:bg-blue-700"
                >
                  Buy Now
                </button>
                <button
                  type="button"
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
              <p className="mt-1 text-base text-gray-700">
                {token.description}
              </p>

              <h2 className="mt-4 text-sm font-medium text-gray-400">Supply</h2>
              <p className="mt-1 text-base text-gray-700">{token.supply}</p>

              {typeof decodedArbitraryAsJson === "object" ? (
                Object.keys(decodedArbitraryAsJson).map((key, index) => (
                  <div key={index}>
                    <h2 className="mt-4 text-sm font-medium text-gray-400">
                      {key}
                    </h2>
                    <p className="mt-1 text-base text-gray-700">
                      {decodedArbitraryAsJson[key]}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <h2 className="mt-4 text-sm font-medium text-gray-400">
                    Arbitrary Data
                  </h2>
                  <p className="mt-1 text-base text-gray-700">
                    {decodedArbitraryAsJson}
                  </p>
                </>
              )}
            </div>

            <div className="lg:col-span-3">
              <Tabs
                tabs={[
                  {
                    title: "Activity",
                    content: (
                      <div className="flow-root mt-2 sm:mt-4 bg-soft p-4 rounded-lg overflow-scroll">
                        <table className="min-w-full lg:divide-y lg:divide-gray-400">
                          <thead className="hidden lg:table-header-group">
                            <tr>
                              <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                Date
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                Event
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                From
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                To
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                                Price
                              </td>

                              <td></td>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-400">
                            <tr>
                              <td className="px-4 py-4">
                                <a
                                  className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                                  target="_blank"
                                >
                                  Oct. 20, 2021
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </a>
                              </td>

                              <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                Transfer
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 lg:text-left whitespace-nowrap">
                                <a
                                  className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                                  target="_blank"
                                >
                                  RAyYBfQSbrVbkK7AvdjWC7cdZkJEXgDyUE
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </a>
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 lg:text-left whitespace-nowrap">
                                <a
                                  className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                                  target="_blank"
                                >
                                  RAyYBfQSbrVbkK7AvdjWC7cdZkJEXgDyUE
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </a>
                              </td>

                              <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                320 TKL
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ),
                  },
                  {
                    title: "Listings",
                    content: (
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
                            <tr>
                              <td className="px-4 py-4">
                                <a
                                  className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                                  target="_blank"
                                >
                                  RAyYBfQSbrVbkK7AvdjWC7cdZkJEXgDyUE
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </a>
                              </td>

                              <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                1
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 lg:text-left whitespace-nowrap">
                                320 TKL
                              </td>

                              <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                320 TKL
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-7 text-blue-500 transition-all duration-200 border-blue-500 border-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:border-transparent focus:ring-blue-900 hover:bg-blue-700"
                                >
                                  Fill
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ),
                  },
                  {
                    title: "Offerings",
                    content: (
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
                            <tr>
                              <td className="px-4 py-4">
                                <a
                                  className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap flex truncate"
                                  href="http://explorer.komodoplatform.com:20000/tx/ca771cd29ee8908b2bd84e39500fba743f40a5ce8fff48b68db15f7fb7f78615/TKLTEST2"
                                  target="_blank"
                                >
                                  RAyYBfQSbrVbkK7AvdjWC7cdZkJEXgDyUE
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </a>
                              </td>

                              <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                1
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 lg:text-left whitespace-nowrap">
                                320 TKL
                              </td>

                              <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                320 TKL
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-7 text-blue-500 transition-all duration-200 border-blue-500 border-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white hover:border-transparent focus:ring-blue-900 hover:bg-blue-700"
                                >
                                  Fill
                                  <ExternalLinkIcon className="h-5 w-5 ml-1" />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
}

TokenSingle.defaultProps = {};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps() {
  const token = {
    result: "success",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    owner: "03bc2b973fb03531501f633b7c02393fe16849d00361ecfcba78ea6ababbeb3aa8",
    name: "My tutorial NFT",
    supply: 1,
    description: "This showcases how to create an NFT using the Tokel dApp",
    data: "f7010235697066733a2f2f516d62434a427169663165416b376e4a6b794e716b75557941594244666b7a413974344478486a6b6d6a38677a65033204287b22537472656e677468223a223535222c224861697220436f6c6f7572223a2259656c6c6f77227d",
    dataAsJson: {
      // url: "https://ipfs.io/ipfs/QmbCJBqif1eAk7nJkyNqkuUyAYBDfkzA9t4DxHjkmj8gze",
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
      royalty: 50,
      decodedArbitrary: '{"Strength":"55","Hair Colour":"Yellow"}',
      arbitrary:
        "7b22537472656e677468223a223535222c224861697220436f6c6f7572223a2259656c6c6f77227d",
    },
    version: 1,
    IsMixed: "yes",
    height: 96379,
  };

  return {
    props: {
      token,
    },
  };
}

export default TokenSingle;