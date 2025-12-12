import React, { useState } from 'react';
import gmbImg from '../assets/gambar1.png';
import { FaFilter } from 'react-icons/fa';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';

// Data statis untuk filter dan destinasi
const incidentTypes = ['Banjir', 'Longsor', 'Copet'];
const affectedAreas = ['Surabaya Pusat', 'Surabaya Barat', 'Surabaya Timur', 'Surabaya Selatan'];
const severityLevels = ['Rendah', 'Sedang', 'Tinggi'];

const destinations = [
  { name: 'KBS', address: 'Jl. Raya Darmo, Surabaya', hours: '08.00 - 21.00', description: 'Kebun Binatang Surabaya adalah salah satu kebun binatang yang populer di Indonesia dan terletak di Surabaya.', image: gmbImg },
  { name: 'KBS', address: 'Jl. Raya Darmo, Surabaya', hours: '08.00 - 21.00', description: 'Kebun Binatang Surabaya adalah salah satu kebun binatang yang populer di Indonesia dan terletak di Surabaya.', image: gmbImg },
  { name: 'KBS', address: 'Jl. Raya Darmo, Surabaya', hours: '08.00 - 21.00', description: 'Kebun Binatang Surabaya adalah salah satu kebun binatang yang populer di Indonesia dan terletak di Surabaya.', image: gmbImg },
  { name: 'KBS', address: 'Jl. Raya Darmo, Surabaya', hours: '08.00 - 21.00', description: 'Kebun Binatang Surabaya adalah salah satu kebun binatang yang populer di Indonesia dan terletak di Surabaya.', image: gmbImg },
  { name: 'KBS', address: 'Jl. Raya Darmo, Surabaya', hours: '08.00 - 21.00', description: 'Kebun Binatang Surabaya adalah salah satu kebun binatang yang populer di Indonesia dan terletak di Surabaya.', image: gmbImg },
  { name: 'KBS', address: 'Jl. Raya Darmo, Surabaya', hours: '08.00 - 21.00', description: 'Kebun Binatang Surabaya adalah salah satu kebun binatang yang populer di Indonesia dan terletak di Surabaya.', image: gmbImg },
];

// --- Komponen Item Filter ---
const FilterItem = ({ title, items }) => (
  <div className="py-3 border-b border-gray-200">
    <p className="text-sm font-semibold text-gray-800 mb-2">{title}</p>
    <div className="space-y-1">
      {items.map((item, index) => (
        <label key={index} className="flex items-center text-sm cursor-pointer hover:text-blue-600">
          <input
            type={title.includes('Tingkat') ? 'radio' : 'checkbox'}
            name={title}
            value={item}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-600">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

// --- Komponen Sidebar Filter ---
const SidebarFilter = () => {
  const [selectedIncident, setSelectedIncident] = useState('Pilih Jenis Insiden');

  return (
    <div className="w-full md:w-64 bg-white p-4">
      <h3 className="flex items-center text-lg font-bold text-gray-800 mb-4">
        <FaFilter className="mr-2 text-xl" /> Filter Insiden
      </h3>

      {/* Jenis Insiden */}
      <FilterItem title="Jenis Insiden" items={incidentTypes} />

      {/* Area Terdampak */}
      <FilterItem title="Area Terdampak" items={affectedAreas} />

      {/* Tingkat Keparahan */}
      <FilterItem title="Tingkat Keparahan" items={severityLevels} />

      {/* Langganan Notifikasi */}
      <div className="pt-4 space-y-3">
        <p className="flex items-center text-sm font-semibold text-gray-800 mb-1">
          <IoMdNotificationsOutline className="mr-2 text-lg" />
          Langganan Notifikasi
        </p>
        {/* Input Zona */}
        <div>
          <label htmlFor="zona" className="block text-xs font-medium text-gray-700">Zona:</label>
          <input
            id="zona"
            type="text"
            placeholder="Contoh: Surabaya Pusat"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Dropdown Jenis Insiden */}
        <div>
          <label htmlFor="jenisInsiden" className="block text-xs font-medium text-gray-700">Jenis Insiden:</label>
          <div className="relative mt-1">
            <select
              id="jenisInsiden"
              value={selectedIncident}
              onChange={(e) => setSelectedIncident(e.target.value)}
              className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option disabled>Pilih Jenis Insiden</option>
              {incidentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Tombol Berlangganan */}
        <button className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-black bg-blue-600 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
          BERLANGGANAN NOTIFIKASI
        </button>
      </div>
    </div>
  );
};

// --- Komponen Kartu Destinasi ---
const DestinationCard = ({ destination }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
    <div className="h-40 bg-gray-200 relative overflow-hidden">
      <img
        src={destination.image} // MENGGUNAKAN PROPERTI IMAGE DARI DESTINATION
        alt={destination.name}
        className="w-full h-full object-cover" // Tambahkan styling Tailwind untuk gambar
      />

    </div>
    <div className="p-4 space-y-2">
      <h4 className="text-xl font-bold text-gray-900">
        {destination.name}
      </h4>
      <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block">
        Tinggi
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {destination.address}
        </p>
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {destination.hours}
        </p>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">
        {destination.description}
      </p>
    </div>
  </div>
);

// --- Komponen Utama ---
const FiturDest = () => {
  return (
    <div className="relative pt-20 pb-35 md:pt-70">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Bagian Kiri: Filter (Sidebar) */}
        <SidebarFilter />

        {/* Bagian Kanan: Daftar Destinasi */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <DestinationCard key={index} destination={dest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiturDest;