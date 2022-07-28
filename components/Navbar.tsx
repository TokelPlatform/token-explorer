import { MenuIcon, XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import NavSearch from "./NavSearch";
import { PATHS } from "utils/defines";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className="py-4 bg-primary">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href={PATHS.HOME}>
              <a title="" className="flex">
                <Image
                  src="/tokel.svg"
                  alt="Tokel Logo"
                  width={90}
                  height={45}
                />
              </a>
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-100"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <span x-show="expanded" aria-hidden="true">
                  <XIcon className="w-7 h-7" />
                </span>
              ) : (
                <span aria-hidden="true">
                  <MenuIcon className="w-7 h-7" />
                </span>
              )}
            </button>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12 z-10">
            <NavSearch />
          </nav>

          <nav className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-10">
            <Link href={PATHS.EXPLORE()}>
              <a
                title="Explore Tokel"
                className="text-base font-medium text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-white focus:ring-offset-2"
              >
                Explore
              </a>
            </Link>

            <button
              onClick={() => window.open("tokel://", "_self")}
              className="
                        inline-flex
                        items-center
                        justify-center
                        px-5
                        py-2
                        text-base
                        font-semibold
                        leading-7
                        text-gray-100
                        transition-all
                        duration-200
                        bg-transparent
                        border border-gray-100
                        rounded-xl
                        font-pj
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100
                        hover:bg-gray-100 hover:text-white
                        focus:bg-gray-100 focus:text-white
                    "
              role="button"
            >
              Open dApp
            </button>
          </nav>
        </div>

        {isExpanded && (
          <nav>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                <NavSearch />

                <a
                  href={PATHS.EXPLORE()}
                  className="flex items-center p-3 -m-3 text-base font-medium text-white transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-white focus:ring-offset-2"
                >
                  Explore
                </a>

                <a
                  href="http://discord.tokel.io"
                  target="_blank"
                  title="Discord Community Invite"
                  className="
                            inline-flex
                            items-center
                            justify-center
                            px-5
                            py-2
                            text-base
                            font-semibold
                            leading-7
                            text-white
                            transition-all
                            duration-200
                            bg-transparent
                            border border-white
                            rounded-xl
                            font-pj
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                            hover:bg-white hover:text-white
                            focus:bg-white focus:text-white
                        "
                  role="button" rel="noreferrer"
                >
                  Join Discord Community
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

Navbar.defaultProps = {};

export default Navbar;
