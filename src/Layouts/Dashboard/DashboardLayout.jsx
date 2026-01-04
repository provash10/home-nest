import React, { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaSun, FaMoon, FaEnvelope } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { MdDashboard, MdHome } from "react-icons/md";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { role, isLoading } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate("/login"))
      .catch(err => console.error("Sign out error:", err));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-base-100">
      <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
        <div className="flex-1">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-ghost btn-circle lg:hidden">
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="ml-4 flex items-center gap-3">
            <RiDashboardFill className="text-2xl text-primary" />
            <div>
              <h1 className="text-xl font-bold">{role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}</h1>
              <p className="text-xs text-gray-500">Welcome back, {user?.displayName || user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex-none gap-4">
          <button onClick={toggleDarkMode} className="btn btn-ghost btn-circle">
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaEnvelope size={20} />
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">3 Notifications</span>
                <span className="text-info">You have 3 unread messages</span>
              </div>
            </div>
          </div>

          {/* profile */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                {user?.photoURL ? <img src={user.photoURL} alt="Profile" /> : <FaUserCircle className="w-10 h-10 text-gray-400" />}
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title"><span>Account</span></li>
              <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
              <li><NavLink to="/dashboard">Dashboard Home</NavLink></li>
              <li><NavLink to="/">Main Website</NavLink></li>
              <li className="divider my-1"></li>
              <li><NavLink to="/dashboard/settings">Settings</NavLink></li>
              <li><a onClick={handleSignOut} className="text-red-500">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-base-200 min-h-[calc(100vh-64px)] p-4 border-r border-base-300`}>
          <ul className="menu gap-2">
            <li><NavLink to="/dashboard">Dashboard Home</NavLink></li>
            {role === 'user' && (
              <>
                <li><NavLink to="/dashboard/add-properties">Add Properties</NavLink></li>
                <li><NavLink to="/dashboard/my-properties">My Properties</NavLink></li>
                <li><NavLink to="/dashboard/my-ratings">My Ratings</NavLink></li>
              </>
            )}
            {role === 'admin' && (
              <>
                <li><NavLink to="/dashboard/users">Manage Users</NavLink></li>
                <li><NavLink to="/dashboard/all-properties">All Properties</NavLink></li>
                <li><NavLink to="/dashboard/all-ratings">All Ratings</NavLink></li>
                <li><NavLink to="/dashboard/statistics">Statistics</NavLink></li>
              </>
            )}
            <div className="divider mt-6"></div>
            <li><NavLink to="/dashboard/profile">My Profile</NavLink></li>
            <li><NavLink to="/dashboard/settings">Settings</NavLink></li>
          </ul>
        </aside>

        {/* main content */}
        <main className="flex-1 bg-base-100 p-4 lg:p-6 min-h-[calc(100vh-64px)] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
