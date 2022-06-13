import React, { useMemo } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const ExternalLinkSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);

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
                  <ExternalLinkSvg />
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
                  <ExternalLinkSvg />
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
                  <ExternalLinkSvg />
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
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-8 sm:space-x-14">
                  <a
                    href="#"
                    title=""
                    className="py-4 text-sm font-medium text-soft border-b-2 border-transparent hover:text-white hover:border-gray-300 whitespace-nowrap"
                  >
                    Activity
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center py-4 text-sm font-medium text-white border-b-2 border-white whitespace-nowrap"
                  >
                    Listings
                  </a>

                  <a
                    href="#"
                    title=""
                    className="py-4 text-sm font-medium text-soft border-b-2 border-transparent hover:text-white hover:border-gray-300 whitespace-nowrap"
                  >
                    Offers
                  </a>
                </nav>
              </div>

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
                          <ExternalLinkSvg />
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
                          <ExternalLinkSvg />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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