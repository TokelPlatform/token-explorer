import { DownloadIcon } from "@heroicons/react/solid";
import React from "react";

interface OpeningInDappProps {}

const OpeningInDapp: React.FC<OpeningInDappProps> = () => {
  return (
    <div className="w-[60rem] flex gap-8">
      <div className="w-[45rem]">
        <video autoPlay muted loop>
          <source src="/dapp1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video autoPlay muted loop className="mt-2">
          <source src="/dapp2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mx-auto">
        <h1 className="text-primary font-medium text-2xl">
          Opening in the Tokel dApp
        </h1>
        <p className="text-slate-600 font-medium text-md mt-2">
          The Tokel dApp is a desktop application that allows you to interact
          with the Tokel blockchain in a decentralized way via nSPV. It includes
          a wallet, a token creation tool, and access to the on-chain DEX.
        </p>
        <p className="text-slate-600 font-medium text-md mt-2">
          You can use the in-dApp DEX to transact in a trustless manner, create
          tokens and send or sell them to other users.
        </p>
        <p className="text-slate-600 font-medium text-md mt-2">
          Clicking on links on this website will open the Tokel dApp so you can
          complete market interactions.
        </p>
        <h2 className="text-slate-600 font-medium text-md mt-2 flex items-center">
          Don't have the Tokel dApp?
          <a
            type="button"
            target="_blank"
            href="https://github.com/tokelPlatform/tokel_dapp/releases"
            className="mt-2 ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Now
          </a>
        </h2>
      </div>
    </div>
  );
};

export default OpeningInDapp;
