import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import '../Header/Navbar.css';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import userImg from '../../assets/user.png';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  // console.log(user);

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result)
        // alert('Signout Successfull.')
        toast.success('Signout Successful !!');
      })
      .catch(error => {
        console.log(error);
        toast.error("Signout failed: " + error.message);
      })
  }

  const links = (
    <>
      <li><NavLink to='/' className="font-bold">Home</NavLink></li>
      <li><NavLink to='/all-properties' className="font-bold">All Properties</NavLink></li>
      <li><NavLink to='/add-properties' className="font-bold">Add Properties</NavLink></li>
      <li><NavLink to='/my-properties' className="font-bold">My Properties</NavLink></li>
      {/* <NavLink
        to="/register"
        className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
      >
        Signup
      </NavLink> */}
      {/* <li><NavLink to='/register' className="font-bold">Register</NavLink></li>
    <li><NavLink to='/login' className="font-bold">Login</NavLink></li> */}
    </>
  )

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <div>
          <NavLink to='/' className="btn btn-ghost text-xl">Home Nest</NavLink>
          <p className='text-xs font-semibold'>A Real Estate Listing Portal</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {/* dropdown */}
        {user && (
          <div className="relative">
            <img src={user.photoURL || userImg} alt="user" className="w-12 rounded-full cursor-pointer" />
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md hidden group-hover:block">
              <p className="p-2">{user.displayName}</p>
              <p className="p-2 text-sm text-gray-500">{user.email}</p>
              <button onClick={handleSignOut} className="w-full text-left px-2 py-1 hover:bg-gray-200">Sign Out</button>
            </div>
          </div>
        )}

        {/* <a className="btn">Login</a> */}
        {/* <img src={userImg} alt="photo" /> */}
        {/* <img className='w-12 rounded-full' src={`${user ? user.photoURL : userImg}`} alt="photo" /> */}
        {/* <img className='w-12 rounded-full' src={`${user && user.photoURL ? user.photoURL : userImg}`} alt="photo" /> */}

        {
          user ? <button
            onClick={handleSignOut}
            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
          >
            Sign Out
          </button> :
            <NavLink
              to="/login"
              className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold"
            >
              Login
            </NavLink>
        }
      </div>
    </div>
  );
};

export default Navbar;