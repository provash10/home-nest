// import { useContext, useEffect, useState } from "react";
// import { NavLink } from "react-router";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
// import useRole from "../../hooks/useRole";
// import userImg from "../../assets/user.png";
// import "./Navbar.css";

// const Navbar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const { role } = useRole();

//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

//   const handleSignOut = () => {
//     signOutUser()
//       .then(() => toast.success("Signed out successfully"))
//       .catch((err) => toast.error(err.message));
//   };

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "All Properties", path: "/all-properties" },
//     { name: "Dashboard", path: "/dashboard" },
//   ];

//   return (
//     <nav className="navbar-root">
//       <div className="navbar-container">
//         {/* Logo */}
//         <NavLink to="/" className="navbar-logo">
//           <span className="logo-title">HomeNest</span>
//           <span className="logo-sub">Real Estate Portal</span>
//         </NavLink>

//         {/* Menu */}
//         <ul className="navbar-menu">
//           {links.map((link) => (
//             <li key={link.path}>
//               <NavLink to={link.path} className="nav-link">
//                 {link.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Right Section */}
//         <div className="navbar-actions">
//           {/* Theme toggle */}
//           <input
//             type="checkbox"
//             className="toggle toggle-sm"
//             checked={theme === "dark"}
//             onChange={(e) => handleTheme(e.target.checked)}
//           />

//           {/* ser */}
//           {user ? (
//             <motion.div whileHover={{ scale: 1.05 }} className="user-box">
//               <img
//                 src={user.photoURL || userImg}
//                 alt="user"
//                 className="user-avatar"
//               />

//               <div className="user-dropdown">
//                 <p className="user-name">{user.displayName}</p>
//                 <p className="user-email">{user.email}</p>
//                 <button onClick={handleSignOut} className="logout-btn">
//                   Sign Out
//                 </button>
//               </div>
//             </motion.div>
//           ) : (
//             <NavLink to="/login" className="login-btn">
//               Login
//             </NavLink>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";
import userImg from "../../assets/user.png";
import "./Navbar.css";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { role } = useRole();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu state

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("Signed out successfully"))
      .catch((err) => toast.error(err.message));
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/all-properties" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="navbar-root">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <span className="logo-title">HomeNest</span>
          <span className="logo-sub">Real Estate Portal</span>
        </NavLink>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="navbar-actions">
          {/* Theme toggle */}
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={theme === "dark"}
            onChange={(e) => handleTheme(e.target.checked)}
          />

          {/* user */}
          {user ? (
            <motion.div whileHover={{ scale: 1.05 }} className="user-box">
              <img
                src={user.photoURL || userImg}
                alt="user"
                className="user-avatar"
              />
              <div className="user-dropdown">
                <p className="user-name">{user.displayName}</p>
                <p className="user-email">{user.email}</p>
                <button onClick={handleSignOut} className="logout-btn">
                  Sign Out
                </button>
              </div>
            </motion.div>
          ) : (
            <NavLink to="/login" className="login-btn">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
