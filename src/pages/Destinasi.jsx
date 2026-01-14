import React, { useState, useEffect } from 'react';
import { getDestinations } from '../services/api'; 
import ProfileDest from './ProfileDest';
import FiturDest from './FiturDest';

const Destinasi = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ambil data dari API saat halaman pertama kali dibuka
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const response = await getDestinations();
                setDestinations(response.data); // Simpan hasil API ke state
                setLoading(false);
            } catch (err) {
                setError(err.friendlyMessage);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) return <div className="flex justify-center p-20 font-bold">Memuat data...</div>;
    if (error) return <div className="text-center p-20 text-red-500 font-bold">⚠️ {error}</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Kirim data index pertama ke ProfileDest */}
            <ProfileDest data={destinations[0]} />

            {/* Kirim seluruh list destinasi ke FiturDest */}
            <FiturDest list={destinations} /> 
        </div>
    );
};

export default Destinasi;