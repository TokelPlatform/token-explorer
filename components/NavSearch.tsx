import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface NavSearchProps {}

const NavSearch: React.FC<NavSearchProps> = () => (
  <form action="/explore" role="search">
    <div className="relative w:full md:w-96">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>

      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder="Search the Tokel blockchain..."
        className="focus:outline-0 block w-full py-3 pl-12 pr-4 placeholder-gray-500 rounded-lg sm:text-sm"
      />
    </div>
  </form>
);

NavSearch.defaultProps = {};

export default NavSearch;
