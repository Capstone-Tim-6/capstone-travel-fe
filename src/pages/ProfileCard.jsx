import React from "react";
// Pastikan path ini benar
import cardImg from "../assets/card.png"; 

const ProfileCard = () => {
    return (
        // Ditambahkan mb-12 (Margin Bottom 12 = 3rem) untuk memberikan jarak dari section FiturSection
        <section 
            id="about" 
            className="w-full relative flex items-center justify-center py-20 px-8 mb-12"
        >
            {/* Background Image dengan Overlay */}
            <div className="absolute inset-0 z-00">
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
                        Keamanan Perjalanan Anda
                    </h1>
                    <p className="text-[16px] md:text-[18px] font-normal text-gray-600 max-w-md text-center md:text-left">
                        Travsecure menyediakan informasi risiko bencana alam dan kejahatan terkini, peta interaktif, dan upan kemanan langsung untuk perjalanan aman Anda 
                    </p>
                    
                    {/* Button di bawah tulisan Travsecure */}
                    {/* <button className="flex items-center justify-center gap-2 w-auto px-6 py-3 bg-gray-300 text-black rounded-lg font-semibold shadow-md hover:bg-gray-400 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Cari Lokasi (Contoh Surabaya)
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default ProfileCard;