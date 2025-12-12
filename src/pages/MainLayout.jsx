// File: src/pages/MainLayout.jsx

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Komponen ini menerima 'children' (konten) sebagai prop
const MainLayout = ({ children }) => {
    return (
        <div className="App">
            <Navbar />
            <main>{children}</main> {/* Konten rute akan diletakkan di sini */}
            <Footer />
        </div>
    );
};

export default MainLayout;