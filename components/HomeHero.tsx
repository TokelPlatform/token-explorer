import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";

interface HomeHeroProps {
}

const HomeHero: React.FC<HomeHeroProps> = () => {

  return (
    <section className="relative py-12 bg-primary sm:py-16 lg:py-20 xl:py-24">
      <div className="absolute inset-0">
        <img className="object-cover w-full h-full" src="/bg.png" alt="" />
      </div>
      <div className="absolute inset-0 hidden lg:block">
        <img
          className="object-cover w-full h-full"
          src="/floating.png"
          alt=""
        />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex">
          <div className="max-w-md mx-auto text-center lg:w-1/2 lg:max-w-none lg:mx-0 lg:text-left">
            <h1 className="text-4xl font-bold text-white uppercase sm:text-5xl xl:text-6xl">
              BUY, SELL, AND COLLECT ON TOKEL
            </h1>
            <p className="max-w-sm mx-auto mt-6 text-lg font-normal text-gray-300 sm:text-xl lg:mx-0">
              Tokel is a UTXO blockchain with token features built-in in the
              consensus. No complicated code to maintain, easy creation of
              tokens and NFTs
            </p>
            <div className="flex flex-col justify-center px-16 mt-10 space-y-5 sm:px-0 sm:items-center sm:space-x-5 sm:flex-row lg:justify-start sm:space-y-0">
              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-200 bg-transparent border rounded-md border-blue-400 focus:outline-none text-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 hover:bg-blue-400 hover:text-white"
                role="button"
              >
                Explore the chain
                <ArrowCircleRightIcon className="w-5 h-5 ml-2 -mr-0.5" />
              </a>

              <a
                href="#"
                title=""
                className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold tracking-widest text-slate-300 uppercase transition-all duration-200 bg-transparent border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 hover:bg-slate-300 hover:text-slate-700"
                role="button"
              >
                Discover creators
                <ArrowCircleRightIcon className="w-5 h-5 ml-2 -mr-0.5" />
              </a>
            </div>

            <div className="inline-grid grid-cols-2 mt-12 lg:mt-24 xl:mt-40 gap-x-8">
              <div className="flex flex-col lg:items-center lg:space-x-3 lg:flex-row">
                <p className="text-4xl font-bold text-white">692</p>
                <p className="mt-2 text-sm font-medium text-gray-400 lg:mt-0">
                  Token <br className="hidden lg:block" />
                  Creators
                </p>
              </div>

              <div className="flex flex-col lg:items-center lg:space-x-3 lg:flex-row">
                <p className="text-4xl font-bold text-white">3,570+</p>
                <p className="mt-2 text-sm font-medium text-gray-400 lg:mt-0">
                  Tokens <br className="hidden lg:block" />
                  On Chain
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HomeHero.defaultProps = {}

export default HomeHero;