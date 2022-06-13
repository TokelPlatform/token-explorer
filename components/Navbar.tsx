import React, { useState } from "react";

import Image from "next/image";

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className="py-4 bg-primary">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex">
              <Image
                src="/tokel.svg"
                alt="Tokel Logo"
                width={90}
                height={45}
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-100"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <span x-show="expanded" aria-hidden="true">
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              ) : (
                <span aria-hidden="true">
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12">
            <div className="relative w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search the Tokel blockchain..."
                className="focus:outline-0 block w-full py-3 pl-12 pr-4 placeholder-gray-500 rounded-lg sm:text-sm"
              />
            </div>
          </nav>

          <nav className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-10">
            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              Collections
            </a>

            <a
              href="#"
              title=""
              className="text-base font-medium text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              Create
            </a>

            <a
              href="#"
              title=""
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
              Connect Wallet
            </a>
          </nav>
        </div>

        {isExpanded && (
          <nav>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                <a
                  href="#"
                  title=""
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {" "}
                  Experts{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {" "}
                  Community Groups{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {" "}
                  Support{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {" "}
                  Login{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="
                            inline-flex
                            items-center
                            justify-center
                            px-5
                            py-2
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                            transition-all
                            duration-200
                            bg-transparent
                            border border-gray-900
                            rounded-xl
                            font-pj
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-900 hover:text-white
                            focus:bg-gray-900 focus:text-white
                        "
                  role="button"
                >
                  Join community
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

Navbar.defaultProps = {}

export default Navbar;