import React, { use, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import useRole from "../../hooks/useRole";
import { 
  FaHome, FaUsers, FaBuilding, FaStar, 
  FaChartBar, FaPlusCircle, FaListAlt, 
  FaUserCircle, FaSignOutAlt, FaBars, FaTimes,
  FaCog, FaGlobe, FaMoon, FaSun, FaUser, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt,
  FaGoogle, FaLock, FaTrash, FaEdit, FaChevronDown,
  FaChevronRight, FaEye, FaEyeSlash
} from "react-icons/fa";
import { MdDashboard, MdHome, MdApartment, MdRealEstateAgent } from "react-icons/md";
import { HiHome, HiUserGroup, HiChartBar } from "react-icons/hi";
import { IoStatsChart, IoSettings } from "react-icons/io5";
import { RiDashboardFill, RiUserSettingsFill } from "react-icons/ri";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch(error => {
        console.error("Sign out error:", error);
      });
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
    <div className="min-h-screen bg-base-100">
      {/* Top Navbar */}
      <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
        <div className="flex-1">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost btn-circle lg:hidden"
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          
          <div className="ml-4 flex items-center gap-3">
            <RiDashboardFill className="text-2xl text-primary" />
            <div>
              <h1 className="text-xl font-bold">
                {role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
              </h1>
              <p className="text-xs text-gray-500">
                Welcome back, {user?.displayName || user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-none gap-4">
          {/* Dark/Light Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="btn btn-ghost btn-circle"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* Notifications */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaEnvelope size={20} />
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">3 Notifications</span>
                <span className="text-info">You have 3 unread messages</span>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                )}
              </div>
            </div>
            
            <ul 
              tabIndex={0} 
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>Account</span>
              </li>
              <li>
                <NavLink to="/dashboard/profile" className="justify-between">
                  <div className="flex items-center gap-2">
                    <FaUserCircle /> Profile
                  </div>
                  <span className="badge badge-primary badge-xs">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">
                  <MdDashboard /> Dashboard Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome /> Main Website
                </NavLink>
              </li>
              <li className="divider my-1"></li>
              <li>
                <NavLink to="/dashboard/settings">
                  <IoSettings /> Settings
                </NavLink>
              </li>
              <li>
                <a onClick={handleSignOut} className="text-red-500">
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-base-200 min-h-[calc(100vh-64px)] p-4 border-r border-base-300`}>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <RiDashboardFill className="text-2xl text-primary" />
              <h2 className="text-lg font-bold">Navigation</h2>
            </div>
            <p className="text-sm text-gray-500">Manage your account and listings</p>
          </div>

          <ul className="menu gap-2">
            {/* common for all */}
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                <MdDashboard /> Dashboard Home
              </NavLink>
            </li>
            
            {/* User-specific menu */}
            {role === 'user' && (
              <>
                <li>
                  <NavLink to="/dashboard/add-properties" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaPlusCircle /> Add Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-properties" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaListAlt /> My Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-ratings" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaStar /> My Ratings
                  </NavLink>
                </li>
              </>
            )}
            
            {/* Admin-specific menu */}
            {role === 'admin' && (
              <>
                <li>
                  <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-properties" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaBuilding /> All Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-ratings" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaStar /> All Ratings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/statistics" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaChartBar /> Statistics
                  </NavLink>
                </li>
              </>
            )}

            {/* Common bottom links */}
            <div className="divider mt-6"></div>
            <li>
              <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active" : ""}>
                <FaUserCircle /> My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? "active" : ""}>
                <IoSettings /> Settings
              </NavLink>
            </li>
          </ul>

          {/* Sidebar Footer */}
          <div className="mt-auto pt-6 border-t border-base-300">
            <div className="flex items-center gap-3 p-3 bg-base-300 rounded-lg">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" />
                  ) : (
                    <FaUserCircle className="w-10 h-10" />
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{user?.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-base-100 p-4 lg:p-6 min-h-[calc(100vh-64px)] overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;