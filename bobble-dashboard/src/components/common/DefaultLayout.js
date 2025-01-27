import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
