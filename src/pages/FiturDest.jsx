import React, { useState, useMemo } from 'react';
import { FaFilter, FaCircle } from 'react-icons/fa';
import { 
    IoAlertCircle, IoShieldCheckmark, IoLocationOutline, 
    IoRefreshOutline, IoClose 
} from 'react-icons/io5';

// --- DATA DUMMY INSIDEN KHUSUS SURABAYA (SBY) ---
const initialIncidentData = [
  { 
    id: 1, 
    type: 'Banjir', 
    area: 'Surabaya Pusat',
    location: 'Jl. Basuki Rahmat (Depan TP)', 
    time: '2 menit yang lalu', 
    severity: 'Tinggi', 
    description: 'Genangan air setinggi 40cm akibat luapan saluran drainase. Kendaraan roda dua diimbau menghindari jalur arah Embong Malang.',
    status: 'Aktif',
    // Gambar banjir Surabaya (Basuki Rahmat/Pusat)
    image: 'https://awsimages.detik.net.id/community/media/visual/2024/02/05/banjir-di-jalan-basuki-rahmat-surabaya-senin-522024_169.jpeg?w=700&q=90'
  },
  { 
    id: 2, 
    type: 'Copet', 
    area: 'Surabaya Selatan',
    location: 'Terminal Purabaya (Bungurasih)', 
    time: '15 menit yang lalu', 
    severity: 'Sedang', 
    description: 'Laporan kehilangan ponsel di kerumunan bus malam. Pelaku terlihat melarikan diri ke arah jalur keberangkatan antar kota.',
    status: 'Waspada',
    // Gambar keramaian Terminal Purabaya
    image: 'https://asset.kompas.com/crops/O_n8I_D0mBf8Ww6Hj_G-m0W-uX0=/0x0:1000x667/750x500/data/photo/2023/04/19/643f6630a9e7f.jpg'
  },
  { 
    id: 3, 
    type: 'Cuaca Ekstrem', 
    area: 'Surabaya Barat',
    location: 'Sekitar G-Walk Citraland', 
    time: '1 jam yang lalu', 
    severity: 'Rendah', 
    description: 'Hujan disertai angin kencang merobohkan beberapa dahan pohon di area kuliner. Tim kebersihan kota sedang menuju lokasi.',
    status: 'Pantauan',
    // Gambar suasana jalanan Surabaya Barat/Citraland saat badai
    image: 'https://infopublik.id/assets/upload/headline/IMG_20220107_174418.jpg'
  },
  { 
    id: 4, 
    type: 'Banjir', 
    area: 'Surabaya Timur',
    location: 'Kawasan Mulyorejo', 
    time: '3 jam yang lalu', 
    severity: 'Tinggi', 
    description: 'Pintu air Mulyorejo dibuka penuh karena debit air sungai meningkat drastis. Beberapa pemukiman warga tergenang air.',
    status: 'Penanganan',
    // Gambar banjir di perumahan Surabaya Timur
    image: 'https://awsimages.detik.net.id/community/media/visual/2022/11/02/banjir-surabaya-timur_169.jpeg?w=700&q=90'
  },
  { 
    id: 5, 
    type: 'Macet Total', 
    area: 'Surabaya Selatan',
    location: 'Bundaran Waru', 
    time: '5 jam yang lalu', 
    severity: 'Sedang', 
    description: 'Kepadatan luar biasa akibat perbaikan aspal di jalan utama arah masuk kota Surabaya. Antrean kendaraan mencapai 3 KM.',
    status: 'Waspada',
    // Gambar kemacetan ikonik Bundaran Waru SBY
    image: 'https://asset.kompas.com/crops/mO_X2R8_W-fMhN0Y_V_h8-XWp2U=/0x0:1000x667/750x500/data/photo/2021/07/05/60e2946c986c0.jpg'
  },
  { 
    id: 6, 
    type: 'Pohon Tumbang', 
    area: 'Surabaya Pusat',
    location: 'Jalan Tunjungan', 
    time: '6 jam yang lalu', 
    severity: 'Rendah', 
    description: 'Dahan pohon tumbang menghalangi jalur pedestrian dan parkir di Jl. Tunjungan. Arus lalu lintas tersendat namun lancar.',
    status: 'Aktif',
    // Gambar Jalan Tunjungan SBY
    image: 'https://bisnisjatim.id/wp-content/uploads/2024/01/Pohon-Tumbang-Tunjungan.jpg'
  }
];

const incidentTypes = ['Semua', 'Banjir', 'Longsor', 'Copet', 'Cuaca Ekstrem'];
const affectedAreas = ['Semua', 'Surabaya Pusat', 'Surabaya Barat', 'Surabaya Timur', 'Surabaya Selatan'];

// --- MODAL DETAIL (TRANSPARAN / TANPA BACKGROUND HITAM) ---
const DetailModal = ({ incident, onClose }) => {
    if (!incident) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" onClick={onClose}>
            {/* Shadow diperkuat agar modal tetap kontras meskipun background transparan */}
            <div 
                className="bg-white rounded-lg w-full max-w-lg shadow-[0_0_60px_rgba(0,0,0,0.3)] border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image */}
                <div className="relative h-56 w-full">
                    <img src={incident.image} alt={incident.type} className="w-full h-full object-cover" />
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-white/90 rounded-full p-1.5 text-gray-800 shadow-md hover:bg-white transition-all"
                    >
                        <IoClose size={22} />
                    </button>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded flex items-center shadow-lg uppercase">
                            <FaCircle className="mr-1 text-[5px] animate-pulse" /> LIVE UPDATE
                        </span>
                    </div>
                </div>

                {/* Content Modal */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight leading-none">{incident.type}</h2>
                            <p className="text-blue-600 text-[11px] font-black flex items-center mt-2 uppercase">
                                <IoLocationOutline className="mr-1 text-sm" /> {incident.location}
                            </p>
                        </div>
                        <span className={`text-[9px] font-bold px-3 py-1 rounded-full border ${
                            incident.severity === 'Tinggi' ? 'bg-red-50 text-red-600 border-red-200' : 
                            incident.severity === 'Sedang' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                            'bg-blue-50 text-blue-600 border-blue-200'
                        }`}>
                            BAHAYA {incident.severity}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-[11px] text-gray-600 leading-relaxed font-medium">"{incident.description}"</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">Waktu Update</p>
                                <p className="text-xs font-bold text-gray-800 uppercase">{incident.time}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1 tracking-widest">Status Penanganan</p>
                                <p className="text-xs font-bold text-green-600 uppercase">{incident.status}</p>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full mt-8 bg-gray-900 text-white font-bold py-3.5 rounded-lg hover:bg-black transition-all uppercase text-[10px] tracking-[0.2em]"
                    >
                        Tutup Laporan
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN KARTU ---
const IncidentCard = ({ incident, onDetail }) => {
  const severityColor = {
    'Tinggi': 'bg-red-100 text-red-600 border-red-200',
    'Sedang': 'bg-orange-100 text-orange-600 border-orange-200',
    'Rendah': 'bg-blue-100 text-blue-600 border-blue-200',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full group">
      <div className="h-44 w-full relative overflow-hidden">
        <img src={incident.image} alt={incident.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex space-x-2">
            <span className={`text-[9px] font-bold px-2 py-1 rounded shadow-sm border ${severityColor[incident.severity]}`}>
                {incident.severity}
            </span>
        </div>
        <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded flex items-center animate-pulse shadow-md">
            <FaCircle className="mr-1 text-[5px]" /> LIVE
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-gray-900 flex items-center uppercase tracking-tight text-sm">
            {incident.type}
          </h4>
          <span className="text-[9px] text-gray-300 font-bold uppercase">{incident.time}</span>
        </div>

        <p className="flex items-center text-[10px] text-blue-600 font-black mb-2 uppercase">
          <IoLocationOutline className="mr-1" /> {incident.location}
        </p>

        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 font-medium">
          {incident.description}
        </p>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Status: {incident.status}</span>
        <button 
            onClick={() => onDetail(incident)}
            className="text-blue-600 text-[10px] font-bold hover:underline uppercase tracking-wider"
        >
            Detail Laporan
        </button>
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const FiturDest = () => {
  const [filterType, setFilterType] = useState('Semua');
  const [filterArea, setFilterArea] = useState('Semua');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const filteredIncidents = useMemo(() => {
    return initialIncidentData.filter((item) => {
      const typeMatch = filterType === 'Semua' || item.type === filterType;
      const areaMatch = filterArea === 'Semua' || item.area === filterArea;
      return typeMatch && areaMatch;
    });
  }, [filterType, filterArea]);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-10 text-left border-l-4 border-blue-600 pl-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">Umpan Keamanan Real-time SBY</h1>
          <p className="text-gray-500 mt-1 text-sm max-w-2xl font-medium uppercase tracking-tight">
            Monitoring insiden terbaru di Kota Surabaya. Gunakan filter untuk mencari wilayah spesifik.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm sticky top-24 space-y-6">
              <h3 className="flex items-center text-xs font-black text-gray-800 border-b border-gray-50 pb-3 uppercase tracking-widest">
                <FaFilter className="mr-2 text-blue-600" /> Filter Laporan
              </h3>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Jenis Insiden</p>
                <div className="space-y-1">
                  {incidentTypes.map((t) => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={`w-full text-left px-3 py-2 rounded-md text-[11px] font-bold transition-all ${filterType === t ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Area Surabaya</p>
                <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-md py-2 px-3 text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                >
                  {affectedAreas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <button onClick={() => { setFilterType('Semua'); setFilterArea('Semua'); }}
                className="w-full py-2 flex items-center justify-center text-[10px] font-bold text-red-500 hover:bg-red-50 rounded-md transition-all border border-transparent hover:border-red-100 uppercase"
              >
                <IoRefreshOutline className="mr-1 text-sm" /> Reset Filter
              </button>
            </div>
          </aside>

          {/* Grid Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center">
                    <IoShieldCheckmark className="mr-2 text-green-500 text-base" /> Laporan Terverifikasi
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-200">
                    {filteredIncidents.length} Kejadian Ditemukan
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} onDetail={setSelectedIncident} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* MODAL RENDER (Transparent Backdrop) */}
      <DetailModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
    </div>
  );
};

export default FiturDest;