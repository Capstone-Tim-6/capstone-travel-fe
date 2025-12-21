import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Assets (Pastikan path ini sudah benar)
import vectorImg from "../assets/vector1.png"; // Asumsi menggunakan vector1.png
import googleIcon from "../assets/google.png";
import appleIcon from "../assets/apple.png";
import facebookIcon from "../assets/facebook.png";

import api from "../services/api";


const Signup = () => {

    // STATE INPUT
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // STATE TAMBAHAN UNTUK INTEGRASI API
    const [agreement, setAgreement] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // WARNA UTAMA: --primary-blue: #76A4FA;

    // === HANDLE FIRSTNAME ===
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        if (errors.firstName) {
            setErrors((prev) => ({ ...prev, firstName: null }));
        }
    };


    // === VALIDASI SIMPLE ===
    const validateForm = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            newErrors.email = "Email is not valid.";
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!agreement) {
            newErrors.agreement = "You must agree to the Terms.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // === INTEGRASI API REGISTER ===
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Backend: POST /api/auth/signup
            const { data } = await api.post("/auth/signup", {
                first_name: firstName,
                last_name: "",
                email,
                password,
            });

            console.log("REGISTER SUCCESS:", data);

            // Redirect ke halaman Login
            navigate("/login"); 

        } catch (err) {
            console.error("REGISTER FAILED:", err);

            setErrors((prev) => ({
                ...prev,
                general: err?.friendlyMessage || "Unable to connect to the server. Please try again later."
            }));
        }

        setLoading(false);
    };


    // Border Class Helper
    const firstNameBorderClass = errors.firstName 
        ? "border-red-600 focus-within:border-red-600" 
        : "border-[#212121] focus-within:border-[#212121]";
    
    const emailBorderClass = errors.email
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#E0E0E0] focus-within:border-[#212121]";

    const passwordBorderClass = errors.password
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#E0E0E0] focus-within:border-[#212121]";


    return (
        // signup-wrapper
        <div className="w-full min-h-screen pt-4 pr-2 pb-4 pl-2 flex bg-white justify-center items-center overflow-hidden">
            
            {/* signup-container */}
            <div className="w-[976px] h-auto flex justify-center items-center gap-0 
                            lg:flex-row flex-col lg:max-w-none max-w-[650px] w-full">

                {/* LEFT FORM (signup-form-box) - W: 596px, H: 618px */}
                <div className="
                    w-full lg:w-[596px] h-auto lg:h-[618px] 
                    bg-white 
                    rounded-none lg:rounded-r-none
                    border border-[#E0E0E0]
                    p-[33px] lg:px-[95px] lg:py-[33px] px-8 py-7 
                    box-border 
                    shadow-[0_82px_40px_-14px_rgba(100,100,100,0.0784)]
                    flex flex-col gap-[18px]
                ">
                    <h1 className="
                        text-center 
                        font-[Zen_Kaku_Gothic_Antique] text-[31.25px] 
                        font-bold leading-[37.5px] 
                        text-[#212121] 
                        tracking-[-0.5px]
                        mb-0
                    ">
                        Daftar
                    </h1>
                    <p className="
                        text-center 
                        font-[Zen_Kaku_Gothic_Antique] text-[12.8px] 
                        font-normal 
                        text-[#757575] 
                        leading-tight 
                        mb-0
                    ">
                        Quick & Simple way to Automate your payment
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                        
                        {/* FIRST NAME */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${firstNameBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">NAMA DEPAN</label>
                            <input
                                type="text"
                                placeholder="John"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                required
                                className="border-none outline-none text-sm w-full 
                                            placeholder:text-[#616161] placeholder:text-base 
                                            placeholder:font-[Zen_Kaku_Gothic_Antique] placeholder:font-normal 
                                            placeholder:leading-[28.16px]"
                            />
                            {errors.firstName && (
                                <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                    <span role="img" aria-label="Warning">⚠</span>{errors.firstName}
                                </p>
                            )}
                        </div>
                        
                        {/* EMAIL */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${emailBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">ALAMAT EMAIL</label>
                            <input
                                type="email"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-none outline-none text-sm w-full 
                                            placeholder:text-[#757575] placeholder:text-base 
                                            placeholder:font-[Zen_Kaku_Gothic_Antique] placeholder:font-normal 
                                            placeholder:leading-[28.16px]"
                            />
                            {errors.email && (
                                <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                    <span role="img" aria-label="Warning">⚠</span>{errors.email}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${passwordBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">KATA SANDI</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border-none outline-none text-sm w-full pr-8
                                                placeholder:text-[#757575] placeholder:text-base 
                                                placeholder:font-[Zen_Kaku_Gothic_Antique] placeholder:font-light 
                                                placeholder:leading-[28.16px]"
                                />

                                <span
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-[#666] cursor-pointer pr-1 bg-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                    role="button"
                                >
                                    {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                    <span role="img" aria-label="Warning">⚠</span>{errors.password}
                                </p>
                            )}
                        </div>
                        
                        {/* AGREEMENT */}
                        <div className="flex gap-2 items-center mt-[30px] mb-[10px] h-[22px]">
                            <input
                                type="checkbox"
                                id="agreement"
                                checked={agreement}
                                onChange={(e) => setAgreement(e.target.checked)}
                                className="w-[21.52px] h-[22px] border border-[#212121] accent-[#76A4FA] cursor-pointer"
                            />
                            <label htmlFor="agreement" className="
                                font-[Zen_Kaku_Gothic_Antique] text-sm 
                                font-normal text-[#616161] 
                                leading-[22.53px] 
                                underline cursor-pointer"
                            > 
                                I agree to the Terms of Service and Privacy Policy.
                            </label>
                        </div>
                        {errors.agreement && (
                            <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                <span role="img" aria-label="Warning">⚠</span>{errors.agreement}
                            </p>
                        )}


                        {/* BUTTON */}
                        <button 
                            type="submit" 
                            className="
                                 w-full lg:w-[380px] h-[64px] 
        bg-[#212121] hover:bg-white 
        border-none 
        font-[Zen_Kaku_Gothic_Antique] text-base 
        font-normal text-white hover:text-[#212121] 
        leading-[28.16px] text-center 
        cursor-pointer 
        transition duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
                            " 
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "MEMBUAT AKUN"}
                        </button>
                    </form>

                    {/* <div className="text-center relative mt-[1px]">
                        <span className="
                            font-[Zen_Kaku_Gothic_Antique] text-[12.8px] 
                            font-normal text-black 
                            leading-[22.53px]"
                        >
                            OR
                        </span>
                    </div>

                    <div className="w-[170px] h-10 mx-auto flex gap-[25px] items-center">
                        <img src={googleIcon} alt="Google" className="w-10 h-10 cursor-pointer border border-[#EEEEEE]" />
                        <img src={appleIcon} alt="Apple" className="w-10 h-10 cursor-pointer border border-[#EEEEEE]" />
                        <img src={facebookIcon} alt="Facebook" className="w-10 h-10 cursor-pointer border border-[#EEEEEE]" />
                    </div> */}
                </div>


                {/* PANEL KANAN (right-side) - Gambar */}
                {/* W: 632px, H: 618px, Radius: 50px di kiri, Background: #76A4FA */}
                <div className="
                    hidden lg:flex 
                    w-[632px] h-[618px] 
                    bg-[#76A4FA] 
                    rounded-none 
                    lg:rounded-l-[50px] 
                    justify-center items-center 
                    overflow-hidden 
                    shadow-[0_82px_40px_-14px_rgba(100,100,100,0.0784)]
                ">
                    {/* Gambar vector-img */}
                    <img 
                        src={vectorImg} 
                        alt="Travel Vector" 
                        className="
                            w-[487px] h-auto object-contain 
                            max-w-[80%]
                        " 
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;