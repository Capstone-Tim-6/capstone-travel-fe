import React, { useState, useEffect } from 'react';
import { postReport } from '../services/api'; 
// Import Icons
import { 
    IoSearchOutline, IoFlashOutline, IoShieldOutline, IoClipboardOutline, 
    IoStar, IoChatbubbleOutline, IoAlertCircle, 
    IoInformationCircle, IoCameraOutline, IoClose, IoLocationOutline, IoCallOutline
} from 'react-icons/io5'; 
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { FaHeart, FaHospitalAlt, FaShieldAlt } from 'react-icons/fa'; 

// --- IMPORT GAMBAR LOKAL ---
import headerImage from "../assets/TB.webp";
import tg1 from "../assets/tg1.jpeg";
import tg2 from "../assets/tg2.jpeg";

// =========================================================
// DATABASE DUMMY (DITAMBAH DATA BARU)
// =========================================================
const INITIAL_MOCK_DB = {
    "taman bungkul": {
        name: "Taman Bungkul",
        location: "Wonokromo, Surabaya",
        image: headerImage,
        safety_score: "4.8",
        status: "Sangat Aman",
        factors: { disaster: 40, crime: 15, environment: 90 },
        nearby: { police: "Polsek Wonokromo", medical: "RS RKZ Surabaya" },
        reviews: [
            { id: 1, name: "Sarah Saraswati", rating: 5, text: "Sangat bersih dan aman untuk keluarga.", likes: 128 }
        ],
        gallery: [
            { id: 1, src: headerImage, alt: "Bungkul 1" },
            { id: 2, src: "https://awsimages.detik.net.id/community/media/visual/2021/04/13/taman-bungkul-surabaya_169.jpeg", alt: "Bungkul 2" },
        ]
    },
    "tugu pahlawan": {
        name: "Tugu Pahlawan",
        location: "Bubutan, Surabaya",
        image: tg1, 
        safety_score: "4.6",
        status: "Sangat Aman",
        factors: { disaster: 20, crime: 10, environment: 85 },
        nearby: { police: "Polres Tabes Surabaya", medical: "RSUD Dr. Soetomo" },
        reviews: [
            { id: 1, name: "Andi Wijaya", rating: 4, text: "Area bersejarah yang sangat terawat dan aman.", likes: 56 }
        ],
        gallery: [
            { id: 1, src: tg1, alt: "Tugu 1" },
            { id: 2, src: tg2, alt: "Tugu 2" },
        ]
    }
};

// --- 1. KOMPONEN MODAL LAPORAN (TAMBAHAN: Preview Gambar) ---
const ReportReviewModalInternal = ({ isOpen, onClose, locationName, onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [reportType, setReportType] = useState('peringatan'); 
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Membuat preview lokal
        }
    };

    const handleSubmit = async () => {
        if (!description || rating === 0) {
            alert("Harap isi deskripsi dan rating!");
            return;
        }
        try {
            setLoading(true);
            const newReview = {
                id: Date.now(),
                name: "Pengguna Baru",
                rating: rating,
                text: description,
                likes: 0
            };
            onAddReview(newReview);
            alert("Laporan berhasil terkirim!");
            setRating(0); setDescription(''); setSelectedFile(null); setPreviewUrl(null);
            onClose();
        } catch (err) {
            alert("Gagal mengirim laporan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 backdrop-blur-sm bg-black/10" onClick={onClose}>
            <div className="bg-white rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-5 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Laporan Keamanan</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><IoClose size={24} /></button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex space-x-3">
                        <button onClick={() => setReportType('peringatan')} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${reportType === 'peringatan' ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent text-gray-400 bg-gray-50'}`}>Peringatan</button>
                        <button onClick={() => setReportType('info')} className={`flex-1 py-3 rounded-xl font-bold transition-all ${reportType === 'info' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-400'}`}>Info</button>
                    </div>

                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Contoh: Lampu taman mati di sisi utara..." className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />

                    <div>
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
                            {previewUrl ? (
                                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <IoCameraOutline className="text-2xl text-gray-400 mb-1" />
                                    <p className="text-[10px] text-gray-500">Klik untuk upload foto</p>
                                </div>
                            )}
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div className="text-center">
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Rating Lokasi</p>
                        <div className="flex justify-center">
                            {[...Array(5)].map((_, i) => (
                                <button key={i} onClick={() => setRating(i + 1)}>
                                    {i + 1 <= rating ? <IoMdStar className="w-10 h-10 text-yellow-500" /> : <IoMdStarOutline className="w-10 h-10 text-gray-200" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 disabled:bg-gray-400 transition-all">
                        {loading ? "Sabar ya..." : "KIRIM LAPORAN SEKARANG"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- 2. KOMPONEN UTAMA ---
const InfoKeam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [fullDb, setFullDb] = useState(INITIAL_MOCK_DB);
    const [activeKey, setActiveKey] = useState("taman bungkul");
    const [isSearching, setIsSearching] = useState(false);

    const currentData = fullDb[activeKey];

    const handleInternalSearch = (key) => {
        const query = key || searchVal.toLowerCase().trim();
        setIsSearching(true);
        
        // Simulasi loading 1 detik agar UX lebih terasa
        setTimeout(() => {
            if (fullDb[query]) {
                setActiveKey(query);
                setSearchVal("");
            } else {
                alert("Lokasi '" + query + "' belum tersedia di database.");
            }
            setIsSearching(false);
        }, 800);
    };

    const handleAddReview = (newReview) => {
        setFullDb(prevDb => ({
            ...prevDb,
            [activeKey]: {
                ...prevDb[activeKey],
                reviews: [newReview, ...prevDb[activeKey].reviews]
            }
        }));
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
            {/* Search Bar Section */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className={`flex items-center bg-white border border-gray-200 rounded-2xl p-3 shadow-sm transition-all ${isSearching ? 'ring-2 ring-blue-500 opacity-70' : ''}`}>
                    <IoSearchOutline className="text-2xl text-gray-400 mx-2" />
                    <input 
                        type="text" value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleInternalSearch()}
                        placeholder="Cari destinasi Surabaya..." 
                        className="flex-grow outline-none text-sm font-medium" 
                    />
                </div>
                {/* TAMBAHAN: Sugest Lokasi (Chips) */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                    {Object.keys(fullDb).map(key => (
                        <button key={key} onClick={() => handleInternalSearch(key)} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase text-gray-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm whitespace-nowrap">
                            # {key}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`max-w-7xl mx-auto px-4 py-8 space-y-10 transition-all duration-500 ${isSearching ? 'blur-sm scale-95' : 'blur-0 scale-100'}`}>
                
                {/* Header Hero */}
                <header className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl group">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: `url(${currentData.image})` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-lg">Verified Safety</span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{currentData.name}</h1>
                        <p className="flex items-center text-sm opacity-80 mt-1">
                            <IoLocationOutline className="mr-1" /> {currentData.location}
                        </p>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-2xl text-center min-w-[100px]">
                        <div className="text-4xl font-black text-blue-600 leading-none">{currentData.safety_score}</div>
                        <div className="text-[10px] font-black uppercase text-gray-400 mt-1">Safety Score</div>
                        <div className="mt-2 text-[9px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">{currentData.status}</div>
                    </div>
                </header>

                {/* Factors & Emergency Info */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <h2 className="text-xl font-black text-gray-800 flex items-center">
                            <IoShieldOutline className="mr-2 text-blue-600" /> ANALISIS KEAMANAN
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { icon: <IoFlashOutline />, label: "Resiko Bencana", val: currentData.factors.disaster, color: "bg-orange-500" },
                                { icon: <IoShieldOutline />, label: "Kriminalitas", val: currentData.factors.crime, color: "bg-red-500" },
                                { icon: <IoClipboardOutline />, label: "Kualitas Lingkungan", val: currentData.factors.environment, color: "bg-green-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="text-2xl text-blue-600 mb-4">{item.icon}</div>
                                    <h3 className="font-bold text-gray-500 text-xs uppercase mb-3">{item.label}</h3>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold mt-2">{item.val}% Tingkat Kerawanan</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TAMBAHAN: Emergency Contacts */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-black text-gray-800">BANTUAN</h2>
                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                            <div className="flex items-center mb-4">
                                <FaShieldAlt className="mr-3" />
                                <div>
                                    <p className="text-[10px] font-bold opacity-70 uppercase">Polisi Terdekat</p>
                                    <p className="text-xs font-bold">{currentData.nearby.police}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaHospitalAlt className="mr-3" />
                                <div>
                                    <p className="text-[10px] font-bold opacity-70 uppercase">RS Terdekat</p>
                                    <p className="text-xs font-bold">{currentData.nearby.medical}</p>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-white/20 hover:bg-white/30 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center">
                                <IoCallOutline className="mr-2" /> Panggil Darurat
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews & Gallery */}
                <section className="space-y-8">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-4">
                        <h2 className="text-2xl font-black text-gray-800">ULASAN & MOMEN</h2>
                        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-black py-3 px-6 rounded-2xl shadow-xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center text-xs uppercase tracking-tighter">
                            <IoChatbubbleOutline className="mr-2 text-lg" /> Beri Laporan
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            {currentData.reviews.map((rev) => (
                                <div key={rev.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl mr-3 flex items-center justify-center font-black text-white shadow-lg">
                                            {rev.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                                            <div className="flex text-yellow-500 text-[10px]">
                                                {[...Array(rev.rating)].map((_, i) => <IoStar key={i} />)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs italic leading-relaxed mb-4">"{rev.text}"</p>
                                    <div className="flex items-center text-[10px] text-gray-400 font-bold">
                                        <FaHeart className="text-red-500 mr-1" /> {rev.likes} REAKSI
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {currentData.gallery.map((photo) => (
                                <div key={photo.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition duration-500 group-hover:scale-125" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-[10px] font-black uppercase tracking-widest">{photo.alt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <ReportReviewModalInternal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                locationName={currentData.name} 
                onAddReview={handleAddReview}
            />
        </div>
    );
};

export default InfoKeam;