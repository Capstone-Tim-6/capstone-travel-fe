import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMenu, IoClose, IoLogOutOutline, IoPersonOutline } from "react-icons/io5"; // Tambah icon agar lebih cantik
import { FaUserCircle } from "react-icons/fa";
import logoImg from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Untuk menu hamburger mobile
    const [isProfileOpen, setIsProfileOpen] = useState(false); // Untuk dropdown profil desktop
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Cek status login
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
        // Tutup semua dropdown saat pindah halaman
        setIsProfileOpen(false);
        setIsOpen(false);
    }, [location]);

    // 2. Fungsi Logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
        if (confirmLogout) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('rememberMe');
            
            setIsLoggedIn(false);
            setIsProfileOpen(false);
            setIsOpen(false);

            alert("Berhasil Logout!");
            navigate('/login');
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Peta Keamanan", path: "/peta-keamanan" },
        { name: "Info Keamanan", path: "/info-keamanan" },
        { name: "Destinasi", path: "/destinasi" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 font-[Zen_Kaku_Gothic_Antique]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center">
                            <img src={logoImg} alt="Travel Logo" className="h-10 w-auto" />
                        </Link>

                        {/* Navigasi Desktop */}
                        <div className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `text-base font-medium transition duration-150 ${isActive ? 'text-[#76A4FA] border-b-2 border-[#76A4FA]' : 'text-[#757575] hover:text-[#212121]'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Auth/Profile Section */}
                    <div className="hidden md:flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200 h-10">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-[#212121] px-4 py-2 text-base font-medium border border-[#76A4FA] rounded-lg hover:bg-gray-50 transition">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-[#212121] text-white px-4 py-2 text-base font-medium rounded-lg hover:bg-gray-800 transition">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <div className="relative">
                                {/* Tombol Profil klik untuk buka dropdown */}
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 transition ${isProfileOpen ? 'border-[#76A4FA]' : 'border-transparent'}`}>
                                        <FaUserCircle className="text-2xl text-gray-600" />
                                    </div>
                                </button>
                                
                                {/* Dropdown Menu Desktop */}
                                {isProfileOpen && (
                                    <>
                                        {/* Overlay bening untuk menutup dropdown saat klik di luar */}
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                        
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 overflow-hidden transform transition-all">
                                            <div className="px-4 py-2 border-b border-gray-50">
                                                <p className="text-xs text-gray-400">Akun Saya</p>
                                                <p className="text-sm font-bold truncate text-gray-700">{localStorage.getItem('userEmail') || 'User'}</p>
                                            </div>

                                            <Link 
                                                to="/profile" 
                                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                                            >
                                                <IoPersonOutline className="text-lg" />
                                                <span>My Profile</span>
                                            </Link>

                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 transition border-t border-gray-50"
                                            >
                                                <IoLogOutOutline className="text-lg" />
                                                <span className="font-medium">Logout</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#212121]">
                            {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-inner">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-600 font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-100">
                        {!isLoggedIn ? (
                            <div className="flex flex-col space-y-2">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-2 text-center border border-[#76A4FA] rounded-lg">Login</Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-2 text-center bg-[#212121] text-white rounded-lg">Sign Up</Link>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <div className="px-3 py-2 mb-2 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Info Akun</p>
                                    <p className="text-sm text-gray-700 truncate">{localStorage.getItem('userEmail')}</p>
                                </div>
                                <Link 
                                    to="/profile" 
                                    onClick={() => setIsOpen(false)} 
                                    className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                                >
                                    <IoPersonOutline size={20} />
                                    <span>My Profile</span>
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                                >
                                    <IoLogOutOutline size={20} />
                                    <span className="font-bold">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;