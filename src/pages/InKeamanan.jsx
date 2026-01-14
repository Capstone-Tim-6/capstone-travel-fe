import React, { useState, useEffect } from 'react';
import { getDestinations, searchDestination } from '../services/api';
import InfoKeam from './InfoKeam';

const InKeamanan = () => {
  const [destData, setDestData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data awal saat halaman dibuka
  useEffect(() => {
    const loadDefault = async () => {
      try {
        setLoading(true);
        const res = await getDestinations();
        if (res.data.length > 0) setDestData(res.data[0]); 
      } catch (err) {
        console.error("Gagal ambil data", err);
      } finally {
        setLoading(false);
      }
    };
    loadDefault();
  }, []);

  // Fungsi untuk mencari lokasi baru
  const handleSearch = async (query) => {
    if (!query) return;
    try {
      setLoading(true);
      const res = await searchDestination(query);
      if (res.data && res.data.length > 0) {
        setDestData(res.data[0]);
      } else {
        alert("Lokasi tidak ditemukan");
      }
    } catch (err) {
      alert("Error saat mencari lokasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <InfoKeam 
        data={destData} 
        loading={loading} 
        onSearch={handleSearch} 
      />
    </div>
  );
};

export default InKeamanan;