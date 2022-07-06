import React, { useEffect, useState } from "react";

import Link from "next/link";
import { SearchIcon } from "@heroicons/react/solid";
import useDebounce from "../utils/useDebounce";
import { useRouter } from "next/router";

const tokens = [
  {
    name: "My Tutorial NFT",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    dataAsJson: {
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
    },
  },
  {
    name: "My Tutorial NFT",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    dataAsJson: {
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
    },
  },
  {
    name: "My Tutorial NFT",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    dataAsJson: {
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
    },
  },
  {
    name: "My Tutorial NFT",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    dataAsJson: {
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
    },
  },
  {
    name: "My Tutorial NFT",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    dataAsJson: {
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
    },
  },
  {
    name: "My Tutorial NFT",
    tokenid: "5d6ddf4c50e83b5cf6dc80fb43991a0c0f5ef8807c5044cb0af98890684d899c",
    dataAsJson: {
      url: "https://ipfs.io/ipfs/bafybeigyvostrhealynmpp3yakskukzxeqso6hiuxi67ypbxf6amaumwbu",
    },
  },
];

interface NavSearchProps {}

const NavSearch: React.FC<NavSearchProps> = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Array<any>>([]);
  const router = useRouter();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setSearchQuery((router.query?.search as string) || "");
  }, [router.query.search]);

  useEffect(() => {
    setLoading(true);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery.length > 0) {
      setTimeout(() => {
        setResults(
          tokens.filter((token) =>
            token.name
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
          )
        );
        setLoading(false);
      }, 900);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  return (
    <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12 z-10">
      <div className="relative w-96">
        {results.length > 0 && !loading && (
          <div className="absolute top-12 rounded-lg bg-soft px-2 w-96">
            <ul role="list" className="divide-y divide-gray-200 w-auto">
              {results.map((token) => (
                <Link href={`/tokens/${token.tokenid}`}>
                  <li key={token.tokenid}>
                    <a className="py-4 flex w-auto cursor-pointer">
                      <img
                        className="h-10 w-10 rounded-lg"
                        src={token.dataAsJson.url}
                        alt={token.name}
                      />
                      <div className="ml-3 basis-3/4 w-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {token.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {token.tokenid}
                        </p>
                      </div>
                    </a>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}

        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>

        <form action="/explore">
          <input
            type="text"
            name="search"
            placeholder="Search the Tokel blockchain..."
            value={searchQuery}
            onChange={({ target: { value } }) => setSearchQuery(value)}
            className="focus:outline-0 block w-full py-3 pl-12 pr-4 placeholder-gray-500 rounded-lg sm:text-sm"
          />
        </form>
      </div>
    </nav>
  );
};

NavSearch.defaultProps = {};

export default NavSearch;
