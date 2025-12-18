import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAddCall, MdOutlineMarkEmailRead } from 'react-icons/md';
import { Link } from 'react-router';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">HomeNest</h2>
                    <p className="text-gray-400">
                        Your trusted platform for real estate listings. Find, buy, or rent properties with ease.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="all-properties" className="hover:text-white transition-colors">All Properties</Link></li>
                        <li><Link to="add-properties" className="hover:text-white transition-colors">Add Property</Link></li>
                        <li><Link to="/my-properties" className="hover:text-white transition-colors">My Properties</Link></li>
                        <li><Link to="/my-ratings" className="hover:text-white transition-colors">My Ratings</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li> <FaLocationDot /> 123 Main Street, Dhaka, Bangladesh</li>
                        <li><MdAddCall /> +880 1234 567890</li>
                        <li><MdOutlineMarkEmailRead/> info@homenest.com</li>
                    </ul>
                </div>

              
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
            </div>

   
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} HomeNest. All Rights Reserved. | <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            </div>
        </footer>
    );
};

export default Footer;
