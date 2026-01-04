import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Header/Navbar';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
    return (
        <div className='max-w-7xl mx-auto space-y-16'>
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;