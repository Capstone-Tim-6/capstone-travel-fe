import React from 'react';
import { Link } from 'react-router-dom';
// Import gambar latar yang sama dari ProfileCard
import cardImg from "../assets/card.png"; 

// Import icons untuk tampilan yang lebih modern sesuai gambar
import { FiBell, FiMap, FiStar } from 'react-icons/fi'; 

const FiturSection = () => {
    const fiturItems = [
        { 
            title: "Umpan Keamanan Real-Time", 
            description: "Dapatkan pembaruan langsung tentang bencana alam dan insiden kejahatan.", 
            icon: <FiBell className="w-8 h-8 text-blue-600" />,
            // PATH BARU: Mengarah ke /destinasi
            path: "/destinasi" 
        },
        { 
            title: "Peta Keamanan", 
            description: "Visualisasi zona aman dan berisiko.", 
            icon: <FiMap className="w-8 h-8 text-blue-600" />,
            // PATH BARU: Mengarah ke /peta-keamanan
            path: "/peta-keamanan"
        },
        { 
            title: "Skor Keamanan Destinasi", 
            description: "Lihat skor keamanan terperinci untuk setiap lokasi, didukung dengan data resmi dan ulasan pengguna lain.", 
            icon: <FiStar className="w-8 h-8 text-blue-600" />,
            // PATH DEFAULT: Mengarah ke /destinasi juga, atau path lain jika diperlukan
            path: "/info-keamanan" 
        }
    ];

    return (
        <section className="relative pt-20 pb-16 md:pt-70">

            {/* Konten Fitur */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Fitur Utama Travsecure
                    </h1>
                    {/* Garis pemisah horizontal */}
                    <div className="mx-auto w-10/10 h-0.5 bg-gray-300 mt-6"></div> 
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {fiturItems.map((fitur, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl p-8 shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
                        >
                            <div>
                                {/* Ikon */}
                                <div className="text-3xl mb-4">{fitur.icon}</div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {fitur.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {fitur.description}
                                </p>
                            </div>
                            
                            {/* Tombol "Pelajari Lebih Lanjut" menggunakan properti fitur.path */}
                            <Link 
                                to={fitur.path} // Menggunakan path yang sudah ditentukan di array
                                className="inline-block w-full text-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-200"
                            >
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Buttons Section kolektif dihapus */}
            </div>
        </section>
    );
};

export default FiturSection;