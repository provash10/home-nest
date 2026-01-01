import React, { use } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const DashboardLayout = () => {
  const { loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        <ul className="menu gap-2">
          <li>
            <NavLink to="/dashboard/add-properties">
              Add Properties
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-properties">
              My Properties
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-ratings">
              My Ratings
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard/all-ratings">
              All Ratings
            </NavLink>
          </li> */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;

