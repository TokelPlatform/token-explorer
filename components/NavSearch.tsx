import React, { useEffect, useState } from "react";

import Link from "next/link";
import { SearchIcon } from "@heroicons/react/solid";
import useDebounce from "../utils/useDebounce";

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

interface NavSearchProps {
}

const NavSearch: React.FC<NavSearchProps> = () => {

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Array<any>>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

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
        {loading && (
          <div className="absolute top-12 rounded-lg bg-soft p-4 w-96 flex flex-col">
            <svg
              role="status"
              className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="mx-auto mt-2">Loading...</p>
          </div>
        )}

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

        <input
          type="text"
          placeholder="Search the Tokel blockchain..."
          value={searchQuery}
          onChange={({ target: { value } }) => setSearchQuery(value)}
          className="focus:outline-0 block w-full py-3 pl-12 pr-4 placeholder-gray-500 rounded-lg sm:text-sm"
        />
      </div>
    </nav>
  );
}

NavSearch.defaultProps = {}

export default NavSearch;