// src/components/PetKeam.jsx
import React, { useState } from 'react';
import { IoIosSearch, IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { FaHeart, FaRunning, FaChild, FaStore, FaMusic, FaChair, FaChurch, FaShoppingCart, FaRoad, FaPaw } from 'react-icons/fa';
import { MdLocationOn, MdMyLocation, MdSecurity, MdPeople, MdSportsSoccer } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix untuk ikon Leaflet di Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons dengan warna berbeda
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

// Komponen Popup Kustom untuk Semua Lokasi
const LocationPopup = ({ location, onClose }) => {
  // Get status color based on type
  const getStatusColor = (type) => {
    switch(type) {
      case 'safe': return 'bg-green-400 text-green-900';
      case 'warning': return 'bg-yellow-400 text-yellow-900';
      case 'danger': return 'bg-red-400 text-red-900';
      default: return 'bg-blue-400 text-blue-900';
    }
  };

  // Get icon based on location type
  const getLocationIcon = (name) => {
    switch(name) {
      case 'Sacred Heart': return <FaChurch className="text-2xl" />;
      case 'Lapangan Thor': return <MdSportsSoccer className="text-2xl" />;
      case 'Bungkul Park': return <FaChild className="text-2xl" />;
      case 'Surabaya Zoo': return <FaPaw className="text-2xl" />;
      case 'Marvell City Mall': return <FaShoppingCart className="text-2xl" />;
      case 'Jl. Ngagel': return <FaRoad className="text-2xl" />;
      default: return <MdLocationOn className="text-2xl" />;
    }
  };

  return (
    <div className="w-96 bg-blue-600 rounded-lg overflow-hidden shadow-2xl text-white p-6 relative">
      {/* Tombol Close */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl transition-colors z-20"
        aria-label="Tutup"
      >
        ✕
      </button>

      {/* Konten Utama */}
      <div className="flex flex-col">
        {/* Header dengan Icon dan Judul */}
        <div className="flex items-start mb-4">
          <div className="mr-4 p-2 bg-white/20 rounded-lg">
            {getLocationIcon(location.name)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-extrabold uppercase leading-tight pr-4">
                {location.name}
              </h1>
              {/* Tag Status */}
              <div className={`${getStatusColor(location.type)} font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap shadow-md mt-1`}>
                {location.type === 'safe' ? 'Aman' : 
                 location.type === 'warning' ? 'Waspada' : 
                 location.type === 'danger' ? 'Bahaya' : 'Normal'}
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="text-3xl font-extrabold leading-none">
                {location.rating.toFixed(1)}
              </div>
              <div className="ml-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(location.rating) ? (
                      <IoMdStar key={i} className="text-yellow-400 text-sm" />
                    ) : (
                      <IoMdStarOutline key={i} className="text-white/50 text-sm" />
                    )
                  ))}
                </div>
                <div className="text-sm font-semibold text-white/90 mt-1">
                  {location.rating >= 4.0 ? 'Sangat Aman' : 
                   location.rating >= 3.0 ? 'Cukup Aman' : 
                   'Perlu Kewaspadaan'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <p className="text-sm font-medium text-white/90 mb-6 leading-relaxed">
          {location.description}
        </p>

        {/* Fasilitas/Keterangan Tambahan */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-white mb-2">Informasi:</h3>
          <ul className="text-sm text-white/90 space-y-1">
            {location.features && location.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Jam Operasional/Keterangan */}
        {location.hours && (
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <MdPeople className="text-white/80" />
              <span className="text-sm font-medium">
                Ramai: <span className="font-bold">{location.crowd || 'Sedang'}</span>
              </span>
            </div>
            <div className="text-sm text-white/90">
              ⏰ {location.hours}
            </div>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition-colors">
            Lihat Detail
          </button>
          <button className="flex-1 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 rounded-lg transition-colors">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen Bungkul Park Popup Khusus (Lebih Detail)
const BungkulParkPopup = ({ onClose }) => {
  return (
    <div className="w-96 bg-blue-600 rounded-lg overflow-hidden shadow-2xl text-white p-6 relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl transition-colors z-20"
        aria-label="Tutup"
      >
        ✕
      </button>

      <div className="flex flex-col">
        <div className="flex items-start mb-4">
          <div className="mr-4 p-2 bg-white/20 rounded-lg">
            <FaChild className="text-2xl" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-extrabold uppercase leading-tight pr-4">
                TAMAN BUNGKUL
              </h1>
              <div className="bg-green-400 text-green-900 font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap shadow-md mt-1">
                Aman
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="text-3xl font-extrabold leading-none">
                4.5
              </div>
              <div className="ml-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    i < 4 ? (
                      <IoMdStar key={i} className="text-yellow-400 text-sm" />
                    ) : (
                      <IoMdStarOutline key={i} className="text-white/50 text-sm" />
                    )
                  ))}
                </div>
                <div className="text-sm font-semibold text-white/90 mt-1">
                  Sangat Aman
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium text-white/90 mb-6 leading-relaxed">
          Merupakan salah satu taman kota di Kota Surabaya yang berlokasi strategis pada pusat kota. 
          Sebagai ruang publik, Taman Bungkul dirancang untuk mengakomodasi beragam aktivitas masyarakat 
          melalui penyediaan fasilitas area bermain anak, fasilitas olahraga, area plaza (amfiteater), 
          sentra pedagang kaki lima.
        </p>

        {/* Fasilitas Grid */}
        <div className="mb-4">
          <h3 className="font-bold text-white mb-3">Fasilitas Tersedia:</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 p-2 bg-white/10 rounded">
              <FaChild className="text-blue-300" />
              <span className="text-sm">Area Bermain Anak</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-white/10 rounded">
              <FaRunning className="text-green-300" />
              <span className="text-sm">Fasilitas Olahraga</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-white/10 rounded">
              <FaMusic className="text-purple-300" />
              <span className="text-sm">Amfiteater</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-white/10 rounded">
              <FaStore className="text-orange-300" />
              <span className="text-sm">Pedagang Kaki Lima</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <MdPeople className="text-white/80" />
            <span className="text-sm font-medium">
              Ramai: <span className="font-bold">Sedang</span>
            </span>
          </div>
          <div className="text-sm text-white/90">
            ⏰ 06:00 - 22:00
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition-colors">
            Lihat Detail
          </button>
          <button className="flex-1 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 rounded-lg transition-colors">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

function LocationButton() {
  const map = useMap();

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], 15);
        },
        (error) => {
          alert('Tidak dapat mengakses lokasi Anda. Pastikan GPS diaktifkan.');
        }
      );
    }
  };

  return (
    <button
      onClick={handleLocationClick}
      className="absolute bottom-24 right-4 z-[1000] bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-300"
      title="Lokasi Saya"
    >
      <MdMyLocation className="text-blue-600 text-xl" />
    </button>
  );
}

const PetKeam = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [markers] = useState([
    {
      id: 1,
      name: 'Sacred Heart',
      position: [-7.2855, 112.7342],
      type: 'warning',
      color: 'orange',
      description: 'Gereja bersejarah dengan arsitektur khas Eropa. Area parkir terbatas dan sering digunakan untuk acara keagamaan.',
      rating: 3.8,
      features: [
        'Parkir terbatas',
        'Area keagamaan',
        'Arsitektur bersejarah',
        'Toilet umum tersedia'
      ],
      hours: '05:00 - 21:00',
      crowd: 'Rendah'
    },
    {
      id: 2,
      name: 'Lapangan Thor',
      position: [-7.2900, 112.7400],
      type: 'safe',
      color: 'green',
      description: 'Lapangan olahraga multifungsi dengan pencahayaan LED terbaik di kota. Sering digunakan untuk pertandingan lokal dan latihan.',
      rating: 4.2,
      features: [
        'Pencahayaan LED',
        'Tribun penonton',
        'Toilet dan kamar mandi',
        'Area parkir luas'
      ],
      hours: '06:00 - 22:00',
      crowd: 'Tinggi'
    },
    {
      id: 3,
      name: 'Bungkul Park',
      position: [-7.2870, 112.7360],
      type: 'safe',
      color: 'green',
      description: 'Taman kota dengan berbagai fasilitas rekreasi keluarga. Lokasi strategis di pusat kota dengan keamanan 24 jam.',
      rating: 4.5,
      features: [
        'Area bermain anak',
        'Jogging track',
        'Food court',
        'Free WiFi zone',
        'Toilet bersih'
      ],
      hours: '06:00 - 22:00',
      crowd: 'Sedang'
    },
    {
      id: 4,
      name: 'Surabaya Zoo',
      position: [-7.2950, 112.7375],
      type: 'safe',
      color: 'green',
      description: 'Kebun binatang terbesar di Jawa Timur dengan koleksi satwa langka. Dilengkapi petugas keamanan di setiap area.',
      rating: 4.0,
      features: [
        'Satwa langka',
        'Area edukasi anak',
        'Food court',
        'Parkir luas',
        'Petugas keamanan 24 jam'
      ],
      hours: '08:00 - 17:00',
      crowd: 'Tinggi'
    },
    {
      id: 5,
      name: 'Marvell City Mall',
      position: [-7.2835, 112.7380],
      type: 'safe',
      color: 'green',
      description: 'Mall modern dengan sistem keamanan CCTV terintegrasi dan petugas patroli 24 jam. Area food court dan hiburan keluarga.',
      rating: 4.3,
      features: [
        'CCTV 24 jam',
        'Petugas keamanan',
        'Area parkir bawah tanah',
        'Food court luas',
        'Cinema 21'
      ],
      hours: '10:00 - 22:00',
      crowd: 'Tinggi'
    },
    {
      id: 6,
      name: 'Jl. Ngagel',
      position: [-7.2920, 112.7320],
      type: 'warning',
      color: 'orange',
      description: 'Jalan utama dengan lalu lintas padat dan area komersial. Perlu kewaspadaan ekstra terhadap kendaraan dan pedestrian.',
      rating: 3.5,
      features: [
        'Lalu lintas padat',
        'Area komersial',
        'Penerangan jalan',
        'Zebra cross'
      ],
      hours: '24 jam',
      crowd: 'Sangat Tinggi'
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementasi pencarian lokasi
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-zen">
      <main className="relative h-screen pt-16">
        {/* Search Bar */}
        <div className="absolute top-5 left-15 right-4 md:right-auto md:w-2/10 z-[1000]">
          <form onSubmit={handleSearch} className="flex items-center bg-white p-1 rounded-lg shadow-xl border border-gray-300">
            <IoIosSearch className="text-xl text-gray-500 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lokasi di Surabaya"
              className="flex-grow outline-none text-gray-700 placeholder-gray-500 font-zen"
            />
            <button
              type="submit"
              className="ml-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-zen"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Map Container */}
        <div className="absolute inset-0">
          <MapContainer
            center={[-7.2875, 112.7375]}
            zoom={14}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={createCustomIcon(marker.color)}
                eventHandlers={{
                  click: () => setSelectedMarker(marker),
                }}
              >
                <Popup closeButton={false}>
                  {marker.name === 'Bungkul Park' ? (
                    <BungkulParkPopup onClose={() => setSelectedMarker(null)} />
                  ) : (
                    <LocationPopup 
                      location={marker}
                      onClose={() => setSelectedMarker(null)} 
                    />
                  )}
                </Popup>
              </Marker>
            ))}
            
            <LocationButton />
          </MapContainer>
        </div>

        {/* Legend/Info Panel */}
        <div className="absolute bottom-15 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000] max-w-xs border border-gray-200">
          <h3 className="font-bold text-lg mb-3 font-zen border-b pb-2">Legenda Keamanan</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <span className="font-medium text-sm">Aman</span>
                <p className="text-xs text-gray-500">Area dengan keamanan baik</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div>
                <span className="font-medium text-sm">Waspada</span>
                <p className="text-xs text-gray-500">Perlu kewaspadaan ekstra</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div>
                <span className="font-medium text-sm">Bahaya</span>
                <p className="text-xs text-gray-500">Hindari jika memungkinkan</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetKeam;