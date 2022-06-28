import React, { useState } from "react";

import { ExternalLinkIcon } from "@heroicons/react/solid";

interface TabsProps {
  tabs: Array<{title: string, content: React.ReactElement}>;
}

const Tabs: React.FC<TabsProps> = ({ tabs = [] }) => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8 sm:space-x-14">
          {tabs.map((tab, index) => (
            <span
              key={tab.title}
              onClick={() => setActiveTab(index)}
              title={tab.title}
              className={index === activeTab ? "inline-flex items-center py-4 text-sm font-medium text-white border-b-2 border-white whitespace-nowrap" : "cursor-pointer py-4 text-sm font-medium text-soft border-b-2 border-transparent hover:text-white hover:border-gray-300 whitespace-nowrap"}
            >
              {tab.title}
            </span>
          ))}
        </nav>
      </div>

      {tabs[activeTab]?.content}
    </div>
  );
}

export default Tabs;