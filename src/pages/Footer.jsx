import React from 'react';
import logoImg from "../assets/logoo.png";
import { FiTwitter, FiInstagram, FiFacebook, FiYoutube, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white py-10 md:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Kolom 1: Logo dan Slogan (TELAH DIPERBAIKI) */}
<div className="col-span-2 md:col-span-1 flex flex-col items-start">
  
  {/* Menggunakan mb-0 dan memastikan img adalah block untuk kontrol penuh */}
  <div className="mb-0"> 
    <img 
      src={logoImg} 
      alt="TravSecure Logo" 
      // Menggunakan w-52 h-40 sesuai permintaan (w-52 = 208px, sangat dekat dengan 205px)
      className="w-42 h-38 block" // <-- Ditambahkan 'block' untuk menghilangkan spasi bawah bawaan img
    />
  </div>
  
  {/* Menghapus mt- dan menambahkan leading-none untuk menghilangkan jarak vertikal bawaan pada teks */}
  {/* <p className="text-sm text-gray-600 leading-none mt-0 pt-0"> 
    Enhancing Traveler Safety
  </p> */}
</div>

        {/* Kolom 2: Quick Links (Tidak Berubah) */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="/about" className="text-base text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out">
                About Us
              </a>
            </li>
            <li>
              <a href="/layanan" className="text-base text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out">
                Layanan
              </a>
            </li>
            <li>
              <a href="/agenda" className="text-base text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out">
                Agenda
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Contact Us (Tidak Berubah) */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <FiMail className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              <a href="mailto:greengrow@gmail.com" className="text-base text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out break-words">
                greengrow@gmail.com
              </a>
            </li>
            <li className="flex items-start">
              <FiMapPin className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-1" />
              <span className="text-base text-gray-600">
                LinkonCity
              </span>
            </li>
            <li className="flex items-center">
              <FiPhone className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              <a href="tel:+6202094665723" className="text-base text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out">
                +02 094665723
              </a>
            </li>
          </ul>
        </div>
        
        {/* Kolom 4: Follow Us (Tidak Berubah) */}
        <div className="col-span-2 md:col-span-1 md:justify-self-end">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
              <FiTwitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
              <FiInstagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
              <FiFacebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-indigo-600 transition duration-150 ease-in-out">
              <FiYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;