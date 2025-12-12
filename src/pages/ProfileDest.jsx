import React, { useState } from "react";
// Pastikan path ini benar
import cardImg from "../assets/card.png"; 

// Menggunakan FiSearch dari React Icons untuk ikon yang lebih konsisten
// Pastikan Anda telah menginstal React Icons: npm install react-icons
import { FiSearch } from 'react-icons/fi'; 

const ProfileDest = () => {
    // 1. STATE UNTUK INPUT LOKASI
    const [searchTerm, setSearchTerm] = useState("Surabaya");

    // 2. HANDLER KETIKA INPUT BERUBAH
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 3. HANDLER KETIKA PENCARIAN DIJALANKAN
    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Mencegah refresh halaman
        
        // --- LOGIKA PENCARIAN UTAMA DITEMPATKAN DI SINI ---
        console.log("Mencari Lokasi:", searchTerm);
        
        // Contoh: Panggil fungsi API atau navigasi ke halaman hasil
        // if (searchTerm) {
        //     // navigate(`/search?q=${searchTerm}`);
        //     alert(`Pencarian untuk: ${searchTerm} sedang diproses...`);
        // }
        // ----------------------------------------------------
        
        alert(`Pencarian real-time untuk lokasi: ${searchTerm} sedang dijalankan.`);
    };

    return (
        // Ditambahkan mb-12 (Margin Bottom 12 = 3rem) untuk memberikan jarak dari section FiturSection
        <section 
            id="about" 
            className="w-full relative flex items-center justify-center py-20 px-8 mb-12"
        >
            {/* Background Image dengan Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/7]">
                    <img
                        src={cardImg}
                        alt="Travel Gambar"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-5/10 bg-gradient-to-t from-white to-transparent"></div>
                </div>
            </div>

            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">

                {/* Creative & Passionate Text */}
                <div className="flex flex-col gap-6 items-center md:items-start md:justify-self-start md:h-full">
                    <h1 className="text-[32px] md:text-[48px] font-extrabold leading-tight text-black text-center md:text-left">
                        Umpan Keamanan Real Time
                    </h1>
                    <p className="text-[16px] md:text-[18px] font-normal text-gray-600 max-w-md text-center md:text-left">
                        Dapatkan Pembaruan real-time insiden keamanan dan bencana alam
                    </p>
                    
                    {/* FORM PENCARIAN BARU */}
                    <form 
                        onSubmit={handleSearchSubmit} 
                        className="relative w-full max-w-md mt-2"
                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Cari Lokasi..."
                            className="w-full pl-5 pr-14 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium shadow-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                        
                        {/* TOMBOL SUBMIT */}
                        <button
                            type="submit"
                            className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-200"
                            aria-label="Cari Lokasi"
                        >
                             {/* Ikon Pencarian dari React Icons */}
                            <FiSearch className="h-5 w-5" /> 
                        </button>
                    </form>
                    
                    {/* Catatan: Jika Anda ingin mempertahankan tampilan seperti tombol statis
                        tetapi membuatnya interaktif, Anda bisa menggunakan kode asli
                        dan mengganti <button> dengan <button type="button" onClick={handleSearchSubmit}> 
                        dan menghilangkan Form, tetapi input box lebih fungsional untuk pencarian.
                    */}
                </div>
            </div>
        </section>
    );
};

export default ProfileDest;