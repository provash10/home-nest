import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import '../Header/Navbar.css';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Navbar = () => {
   const {user,signOutUser} = use(AuthContext);
    console.log(user);

    const handleSignOut = () =>{
      signOutUser()
       .then((result)=>{
            console.log(result)
            alert('Signout Successfull.')
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const links = (
    <>
    <li><NavLink to='/' className="font-bold">Home</NavLink></li>
    <li><NavLink to='/all-properties' className="font-bold">All Properties</NavLink></li>
    <li><NavLink to='/add-properties' className="font-bold">Add Properties</NavLink></li>
    <li><NavLink to='/my-properties' className="font-bold">My Properties</NavLink></li>
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
  <div className="navbar-end">
    {/* <a className="btn">Login</a> */}
    {
      user ? <a onClick={handleSignOut} className="btn">Sign Out</a> : 
      <Link to='/login'>Login</Link>
    }
  </div>
</div>
    );
};

export default Navbar;