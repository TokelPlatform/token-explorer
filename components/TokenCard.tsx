import { DEFAULT_IPFS_FALLBACK_GATEWAY } from "../utils/defines";
import React from "react";
import Token from "../types/Token";
import { extractIPFSHash } from "../utils/helpers";

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {

  const exctractedIpfsHash = extractIPFSHash(token.dataAsJson.url);
  const transformedUrl = !!exctractedIpfsHash
    ? `${DEFAULT_IPFS_FALLBACK_GATEWAY}/${exctractedIpfsHash}`
    : token.dataAsJson.url;

  const trimmedAuthorPublicKey = `${token.owner.substring(0, 4)}...${token.owner.substring(token.owner.length - 4)}`;

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border rounded-lg border-gray-700 hover:shadow-lg hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-center">
          <img
            className="object-cover w-5 h-5 rounded-full shrink-0"
            src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/featured-drops-marketplace/7/author.png"
            alt=""
          />
          <a
            href="#"
            title={`Created by ${token.owner}`}
            className="flex-1 ml-2 text-sm font-medium text-gray-700"
          >
            {trimmedAuthorPublicKey}
          </a>
        </div>
      </div>

      <a
        href="#"
        title=""
        className="block overflow-hidden aspect-w-1 aspect-h-1"
      >
        <img
          className="object-cover w-full h-full"
          src={transformedUrl}
          alt={token.name}
        />
      </a>

      <div className="p-4">
        <p className="text-base font-bold text-primary">
          <a href="#" title="">
            {token.name}
          </a>
        </p>
        <p className="mt-1 text-sm font-medium text-gray-500">
          {token.description}
        </p>
      </div>

      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-between space-x-6">
          {!!token.dataAsJson.arbitrary?.collection_name && (
            <div className="flex items-center flex-1">
              <div className="flex-1 ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Collection
                </p>
                <p className="mt-0.5 text-sm font-bold text-gray-600">
                  {token.dataAsJson.arbitrary?.collection_name}
                </p>
              </div>
            </div>
          )}

          <div>
            <a
              href="#"
              title=""
              className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-200 bg-transparent border border-primary rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:border-primary hover:bg-primary hover:text-white"
              role="button"
            >
              Place bid
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

TokenCard.defaultProps = {}

export default TokenCard;