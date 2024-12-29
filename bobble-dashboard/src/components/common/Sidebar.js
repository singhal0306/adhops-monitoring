import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/bobble-logo.svg";
import dashboard from "../../assets/Dashboard.svg";
import table from "../../assets/Tables.svg";
// eslint-disable-next-line
import admin from "../../assets/Admin.svg";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const role = useSelector((state) => state.user.user.role);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="items-center justify-between ps-12 pt-5.5 lg:pt-4.5">
        <NavLink to="/" className="flex">
          <img src={Logo} alt="Logo" width={"70%"} />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        ></button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === "/" && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <img src={dashboard} alt="" className="fill-current" />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/mobavenue"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("mobavenue") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <img src={table} alt="" className="fill-current" />
                  Mob Avenue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/surgexoffer"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("surgexoffer") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <img src={table} alt="" className="fill-current" />
                  Surgex Offer
                </NavLink>
              </li>

              {role === "admin" && (
                <li className="absolute bottom-16 sm:bottom-4 w-62.5 pe-2">
                  <NavLink
                    to="/admin"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("admin") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
