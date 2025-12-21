// src/components/InfoKeam.jsx - Versi dengan Gambar Lokal

import React, { useState } from 'react';
// Import Icons
import { 
    IoSearchOutline, IoFlashOutline, IoShieldOutline, IoClipboardOutline, 
    IoStar, IoHeartOutline, IoChatbubbleOutline, IoAlertCircle, 
    IoInformationCircle, IoCameraOutline 
} from 'react-icons/io5'; 
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa'; 

// --- IMPORT GAMBAR LOKAL dari src/assets ---
// Header Destinasi
import headerImage from "../assets/TB.webp";

// Galeri Foto
import playgroundImage from "../assets/TBA.webp";        // taman bermain anak
import pathImage from "../assets/JS.webp";               // jalan setapak
import greeneryImage from "../assets/PH.webp";           // pemandangan hijau
import pondImage from "../assets/KI.webp";               // kolam ikan
import fountainImage from "../assets/AM.webp";           // air mancur
import foodImage from "../assets/AK.webp";              // area kuliner

// --- Data Dummy ---

const review = {
    name: "Sarah Saraswati",
    rating: 5.0,
    text: "Taman Bungkul sangat bersih dan aman untuk keluarga. Anak-anak betah berlama-lama juga bermain di sini. Banyak penjual makanan lokal yang enak dan terjangkau.",
    likes: 128
};

// Data galeri dengan gambar lokal
const photoGallery = [
    { id: 1, src: playgroundImage, alt: "Area bermain anak", label: "Taman Bermain" },
    { id: 2, src: fountainImage, alt: "Air mancur taman", label: "Air Mancur" },
    { id: 3, src: greeneryImage, alt: "Pemandangan hijau", label: "Pemandangan Hijau" },
    { id: 4, src: pathImage, alt: "Jalan setapak", label: "Jalan Setapak" },
    { id: 5, src: foodImage, alt: "Area kuliner", label: "Area Kuliner" },
    { id: 6, src: pondImage, alt: "Kolam ikan", label: "Kolam Ikan" },
];

// --- Komponen Modal Laporan Internal ---

const ReportReviewModalInternal = ({ isOpen, onClose, locationName = "Lokasi" }) => {
    // State internal untuk modal
    const [rating, setRating] = useState(0);
    const [reportType, setReportType] = useState('peringatan'); 

    if (!isOpen) return null;

    return (
        // Overlay Modal
        <div className="fixed inset-0 z-[1001] bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
            
            {/* Modal Content */}
            <div 
                className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        Laporan untuk {locationName}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Tutup Modal">
                        &times;
                    </button>
                </div>

                {/* Body Form */}
                <div className="p-6 space-y-5">
                    
                    {/* Pilihan Tipe Laporan (Dua Tombol) */}
                    <div className="flex space-x-3">
                        {/* Peringatan Bahaya */}
                        <button
                            onClick={() => setReportType('peringatan')}
                            className={`flex-1 flex items-center justify-center py-3 px-2 rounded-lg font-semibold transition-colors shadow-md ${
                                reportType === 'peringatan' 
                                    ? 'bg-red-600 text-white' 
                                    : 'bg-white text-red-600 border border-red-400 hover:bg-red-50'
                            }`}
                        >
                            <IoAlertCircle className="w-5 h-5 mr-2" />
                            Peringatan Bahaya
                        </button>
                        
                        {/* Info Bermanfaat */}
                        <button
                            onClick={() => setReportType('info')}
                            className={`flex-1 flex items-center justify-center py-3 px-2 rounded-lg font-semibold transition-colors shadow-md ${
                                reportType === 'info' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50'
                            }`}
                        >
                            <IoInformationCircle className="w-5 h-5 mr-2" />
                            Info Bermanfaat
                        </button>
                    </div>

                    {/* Detail & Deskripsi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Detail & Deskripsi
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Jelaskan insiden atau informasi yang ingin Anda laporkan..."
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                        ></textarea>
                    </div>

                    {/* Unggah Foto/Video Opsional */}
                    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                        <IoCameraOutline className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-500 text-sm">Unggah Foto / Video Opsional</span>
                        <input type="file" className="hidden" accept="image/*,video/*" />
                    </div>

                    {/* Rating Bintang */}
                    <div className='pt-2'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <div className="flex">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setRating(starValue)}
                                        className="focus:outline-none"
                                    >
                                        {starValue <= rating ? (
                                            <IoMdStar className="w-8 h-8 text-yellow-500 transition-colors" />
                                        ) : (
                                            <IoMdStarOutline className="w-8 h-8 text-gray-300 transition-colors" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                </div>
                
                {/* Footer (Tombol Kirim Laporan) */}
                <div className="p-6 pt-0">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-white text-black hover:text-black font-bold py-3 rounded-lg transition-colors text-lg shadow-md"
                    >
                        Kirim Laporan
                    </button>
                </div>

            </div>
        </div>
    );
};

// --- Komponen Utama InfoKeam ---

const InfoKeam = () => {
    // State untuk mengontrol Modal Laporan/Ulasan
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            
            {/* Navigasi Pencarian */}
            <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-6">
                <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
                    <IoSearchOutline className="text-xl text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Cari lokasi (contoh surabaya)"
                        className="flex-grow outline-none text-gray-700 placeholder-gray-500 text-sm"
                    />
                </div>
            </div>

            {/* Konten Utama */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12">
                
                {/* 1. Header Destinasi (Gambar, Judul, Rating) */}
                <header className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                    {/* Gunakan gambar lokal */}
                    <div 
                        className="w-full h-full bg-cover bg-center" 
                        style={{ backgroundImage: `url(${headerImage})` }} 
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h1 className="text-4xl font-bold">Taman Bungkul</h1>
                        <p className="text-lg font-medium opacity-90">Surabaya</p>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 px-4 text-gray-900 text-right">
                        <div className="text-3xl font-extrabold leading-none">4.5</div>
                        <div className="text-sm font-semibold">Sangat Aman</div>
                    </div>
                </header>

                {/* 2. Faktor Keamanan Destinasi */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Faktor Keamanan Destinasi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex flex-col items-center text-center">
                            <IoFlashOutline className="text-4xl text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-700 mb-2">Resiko Bencana Alam</h3>
                            <div className="w-full h-1 bg-gray-200 rounded-full">
                                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex flex-col items-center text-center">
                            <IoShieldOutline className="text-4xl text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-700 mb-2">Insiden Kriminal</h3>
                            <div className="w-full h-1 bg-gray-200 rounded-full">
                                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex flex-col items-center text-center">
                            <IoClipboardOutline className="text-4xl text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-700 mb-2">Kualitas Lingkungan</h3>
                            <div className="w-full h-1 bg-gray-200 rounded-full">
                                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. Ulasan Pengguna & Foto Terbaru */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Ulasan Pengguna & Foto Terbaru</h2>
                        
                        {/* Tombol yang Membuka Modal Internal */}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md flex items-center transition-colors"
                        >
                            <IoChatbubbleOutline className="mr-2" />
                            Lapor/Berikan Ulasan
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Kolom Kiri: Ulasan */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <div className="flex items-center text-sm text-gray-600">
                                        {[...Array(5)].map((_, i) => (
                                            <IoStar key={i} className="text-yellow-500 w-4 h-4" />
                                        ))}
                                        <span className="ml-1 font-semibold">({review.rating.toFixed(1)})</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                {review.text}
                            </p>

                            <div className="flex items-center text-sm text-gray-500">
                                <FaHeart className="text-red-500 w-4 h-4 mr-1" />
                                <span className="mr-4">{review.likes} Suka</span>
                                <span className="underline cursor-pointer">Lihat semua ulasan</span>
                            </div>
                        </div>

                        {/* Kolom Kanan: Galeri Foto dengan Gambar Lokal */}
                        <div className="lg:col-span-2">
                            <h4 className="font-bold text-lg mb-4 text-gray-900">Galeri Foto</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {photoGallery.map((photo) => (
                                    <div 
                                        key={photo.id} 
                                        className="relative w-full h-24 sm:h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md group"
                                    >
                                        {/* Gambar dari lokal */}
                                        <img 
                                            src={photo.src} 
                                            alt={photo.alt} 
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Overlay dengan label */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                            <p className="text-white text-xs font-medium truncate">{photo.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Info tambahan jika gambar tidak muncul */}
                            {/* <div className="mt-4 text-sm text-gray-500">
                                <p>Pastikan file gambar berada di folder <code>src/assets/</code> dengan nama yang sesuai:</p>
                                <ul className="list-disc ml-5 mt-1">
                                    <li>TB.webp (Header)</li>
                                    <li>TBA.webp (Taman Bermain)</li>
                                    <li>JS.webp (Jalan Setapak)</li>
                                    <li>PH.webp (Pemandangan Hijau)</li>
                                    <li>KI.webp (Kolam Ikan)</li>
                                    <li>AM.webp (Air Mancur)</li>
                                    <li>ALK.webp (Area Kuliner)</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </section>
                
            </div>

            {/* Modal Laporan/Ulasan */}
            <ReportReviewModalInternal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                locationName="Taman Bungkul" 
            />
            
        </div>
    );
};

export default InfoKeam;