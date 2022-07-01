import { DEFAULT_IPFS_FALLBACK_GATEWAY, PATHS } from "../utils/defines";

import { EyeIcon } from "@heroicons/react/solid";
import Identicon from "identicon.js";
import Link from "next/link";
import React from "react";
import Token from "../types/Token";
import { extractIPFSHash } from "../utils/helpers";

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {

  const exctractedIpfsHash = !!token.dataAsJson?.url && extractIPFSHash(
    token.dataAsJson.url
  );
  const transformedUrl = !!exctractedIpfsHash
    ? `${DEFAULT_IPFS_FALLBACK_GATEWAY}/${exctractedIpfsHash}`
    : token.dataAsJson?.url;

  const trimmedAuthorPublicKey = `${token.owner.substring(0, 4)}...${token.owner.substring(token.owner.length - 4)}`;
  const trimmedDescription = !!token.description && token.description.length > 250 ? `${token.description?.substring(0, 250)}...` : token.description;
  const authorIdenticon = new Identicon(token.owner, 50).toString();

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border rounded-lg border-gray-700 hover:shadow-lg hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-center">
          <img
            className="object-cover w-5 h-5 rounded-full shrink-0"
            src={`data:image/png;base64,${authorIdenticon}`}
            alt={token.owner}
          />
          <Link href={PATHS.EXPLORE({ owner: token.owner })}>
            <a
              title={`View tokens created by ${token.owner}`}
              className="flex-1 ml-2 text-sm font-medium text-gray-700"
            >
              {trimmedAuthorPublicKey}
            </a>
          </Link>
        </div>
      </div>

      {!!token.dataAsJson?.url && (
        <Link href={PATHS.TOKEN(token.tokenid)}>
          <a
            title={`View ${token.name}`}
            className="block overflow-hidden aspect-w-1 aspect-h-1"
          >
            <img
              className="object-cover w-full h-full"
              loading="lazy"
              // @ts-ignore
              onError={(e) => e.target.removeAttribute("src")}
              src={transformedUrl}
              alt={token.name}
            />
          </a>
        </Link>
      )}

      <div className="p-4">
        <p className="text-base font-bold text-primary">
          <Link href={PATHS.TOKEN(token.tokenid)}>
            <a title={`View ${token.name}`}>{token.name}</a>
          </Link>
        </p>
        <p className="mt-1 text-sm font-medium text-gray-500">
          {trimmedDescription}
        </p>
      </div>

      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-between space-x-6">
          <div className="flex items-center flex-1 min-w-0">
            {!!token.dataAsJson?.arbitrary?.collection_name && (
              <div className="flex-1 ml-3 w-full">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Collection
                </p>
                <p
                  className="mt-0.5 text-sm font-bold text-gray-600 truncate"
                  title={token.dataAsJson.arbitrary.collection_name as string}
                >
                  {token.dataAsJson.arbitrary?.collection_name}
                </p>
              </div>
            )}
          </div>

          <div>
            <Link href={PATHS.TOKEN(token.tokenid)}>
              <a
                title={`View ${token.name}`}
                className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-200 bg-transparent border border-primary rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:border-primary hover:bg-primary hover:text-white"
                role="button"
              >
                <span className="sr-only">View {token.name}</span>
                <EyeIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

TokenCard.defaultProps = {}

export default TokenCard;