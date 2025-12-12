import React, { useState } from 'react';
import { FiUser, FiLogOut, FiTrash2 } from 'react-icons/fi';
// 1. IMPOR useNavigate DARI REACT-ROUTER-DOM
import { useNavigate } from 'react-router-dom'; 

// Pastikan path ini benar
import profileImage from '../assets/OIP.jpg'; 


const Profile = () => {
    // Panggil hook useNavigate
    const navigate = useNavigate();

    // State data dan form tetap sama
    const [profileData] = useState({
        fullName: 'Novaria Zertlin',
        email: 'novaria@jtrave.com',
        phoneNumber: '0813665446598',
        profileImageUrl: profileImage, 
    });

    const [formState, setFormState] = useState({
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Perubahan disimpan:', formState);
        // Logika simpan data...
    };

    // 2. FUNGSI UNTUK LOGOUT / NAVIGASI KE HOME
    const handleLogout = () => {
        // Logika yang biasanya dilakukan saat logout:
        // 1. Hapus token atau sesi dari Local Storage/Cookies.
        // 2. Perbarui state otentikasi global (misal menggunakan Redux/Context).
        
        console.log("Pengguna melakukan logout...");
        
        // 3. NAVIGASI KE HALAMAN HOME/DASHBOARD
        // Ganti '/' jika halaman home/dashboard Anda memiliki path yang berbeda (misalnya '/dashboard')
        navigate('/'); 
    };

    const SidebarProfileImage = profileData.profileImageUrl;
    const FormProfileImage = profileData.profileImageUrl;

    return (
        <div className="flex justify-center p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">

                {/* --- Sidebar (Kiri) --- */}
                <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <div className="rounded-full overflow-hidden w-20 h-20 sm:w-24 sm:h-24 mb-3">
                            <img 
                                src={SidebarProfileImage} 
                                alt="Profile" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <p className="font-semibold text-lg">{profileData.fullName.split(' ')[0]} Imut</p>
                        <p className="text-sm text-gray-500">{profileData.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                        <button className="flex items-center justify-center md:justify-start w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                            <FiUser className="mr-2" />
                            Edit Profile
                        </button>
                        
                        {/* 4. TOMBOL KELUAR DENGAN FUNGSI handleLogout */}
                        <button 
                            onClick={handleLogout} // Tambahkan event handler di sini
                            className="flex items-center justify-center md:justify-start w-full px-4 py-2 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <FiLogOut className="mr-2 hidden md:inline" />
                            Keluar
                        </button>
                    </div>
                </div>

                {/* --- Main Content (Kanan) - Edit Profile --- */}
                {/* Bagian ini tidak berubah */}
                <div className="w-full md:w-3/4 p-6 sm:p-10">
                    {/* ... (isi form) ... */}
                    <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Edit Profile</h1>
                    <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Perbarui foto dan data diri anda</p>

                    <form onSubmit={handleSave}>
                        {/* Foto Profil Form */}
                        <div className="flex items-start mb-8 sm:mb-10">
                            <div className="relative rounded-full overflow-hidden w-24 h-24 sm:w-28 sm:h-28 mr-6 flex-shrink-0">
                                <img 
                                    src={FormProfileImage} 
                                    alt="Edit Profile" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div className="flex flex-col space-y-2 pt-2">
                                <button 
                                    type="button"
                                    className="flex items-center justify-center px-3 py-1 sm:px-4 sm:py-2 text-red-500 border border-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs sm:text-sm whitespace-nowrap"
                                >
                                    <FiTrash2 className="mr-1 sm:mr-2" />
                                    Hapus Foto
                                </button>
                                <p className="text-xs text-gray-500">
                                    Besar file: maks.2MB, Format: JPG, JPEG, PNG.
                                </p>
                            </div>
                        </div>
                        
                        {/* Form Input */}
                        <div className="space-y-6">
                            {/* Nama Lengkap */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                    NAMA LENGKAP
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formState.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Masukkan nama lengkap Anda"
                                />
                            </div>

                            {/* Email & Nomor Telepon - Flex on large screens, stack on mobile */}
                            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4">
                                {/* Email */}
                                <div className="w-full sm:w-1/2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        EMAIL
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Masukkan email Anda"
                                    />
                                </div>
                                
                                {/* Nomor Telepon */}
                                <div className="w-full sm:w-1/2">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nomor Telpon
                                    </label>
                                    <div className="flex">
                                        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-l-lg px-4 text-gray-700 py-3 select-none">
                                            +62
                                        </div>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formState.phoneNumber}
                                            onChange={handleChange}
                                            className="flex-grow px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="8123..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Simpan Perubahan */}
                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors w-full sm:w-auto"
                            >
                                SIMPAN PERUBAHAN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;