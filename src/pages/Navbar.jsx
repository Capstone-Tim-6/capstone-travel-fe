import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; // Tambahkan useLocation
import { IoMenu, IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logoImg from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Ambil lokasi saat ini
    
    // Halaman yang MENAMPILKAN tombol login/signup (hanya Home)
    const showAuthButtons = location.pathname === '/';
    
    // Halaman yang MENAMPILKAN profile (semua kecuali Home)
    const showProfileIcon = !showAuthButtons;

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Peta Keamanan", path: "/peta-keamanan" },
        { name: "Info Keamanan", path: "/info-keamanan" },
        { name: "Destinasi", path: "/destinasi" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Bagian Kiri: Logo + Navigasi */}
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center mt-4">
                            <img
                                src={logoImg}
                                alt="Travel Logo"
                                className="h-16 sm:h-20 lg:h-24 w-auto"
                            />
                        </Link>

                        {/* Navigasi Desktop */}
                        <div className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `text-base font-medium transition duration-150 ease-in-out
                                         ${isActive ? 'text-[#212121]' : 'text-[#757575] '}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Bagian Kanan: Berdasarkan Halaman */}
                    <div className="hidden md:flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200 h-10">
                        {/* HANYA di Home: Tampilkan Login/Signup */}
                        {showAuthButtons && (
                            <>
                                <Link
                                    to="/login"
                                    className="bg-white text-black px-4 py-2 text-base font-medium 
                                               border border-[#76A4FA] rounded-lg 
                                               hover:bg-blue-500 hover:text-black transition duration-150 ease-in-out"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-white text-black px-4 py-2 text-base font-medium 
                                               border border-[#76A4FA] rounded-lg 
                                               hover:bg-blue-500 hover:text-black transition duration-150 ease-in-out"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        {/* SEMUA halaman KECUALI Home: Tampilkan Profile Icon */}
                        {showProfileIcon && (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 focus:outline-none">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                        <FaUserCircle className="text-2xl text-gray-600" />
                                    </div>
                                </button>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 hidden group-hover:block border border-gray-100">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        My Profile
                                    </Link>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 text-red-600 hover:bg-gray-50"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tombol Menu Hamburger Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#212121] hover:text-[#76A4FA] focus:outline-none"
                        >
                            {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile (Dropdown) */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-gray-100">
                    {/* Navigasi Link Mobile */}
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => 
                                `block text-base font-medium rounded-md px-3 py-2 transition duration-150 ease-in-out
                                 ${isActive ? 'text-[#212121] bg-gray-50' : 'text-[#757575] hover:bg-gray-50 '}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    {/* Tombol Mobile: Berdasarkan Halaman */}
                    {showAuthButtons ? (
                        // HANYA di Home Mobile: Tampilkan Login/Signup
                        <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block bg-white text-black px-3 py-2 text-base font-medium text-center
                                           border border-[#76A4FA] rounded-lg 
                                           hover:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setIsOpen(false)}
                                className="block bg-white text-black px-3 py-2 text-base font-medium text-center
                                           border border-[#76A4FA] rounded-lg 
                                           hover:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        // SEMUA halaman KECUALI Home Mobile: Tampilkan Profile
                        <div className="pt-2 border-t border-gray-100 space-y-2">
                            <div className="flex items-center space-x-3 px-3 py-2">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <FaUserCircle className="text-2xl text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">User</p>
                                    <p className="text-sm text-gray-500">user@example.com</p>
                                </div>
                            </div>
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-700 hover:bg-gray-50 rounded-md px-3 py-2"
                            >
                                My Profile
                            </Link>
                            
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block text-red-600 hover:bg-gray-50 rounded-md px-3 py-2"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;