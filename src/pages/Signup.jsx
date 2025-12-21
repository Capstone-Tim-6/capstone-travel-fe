import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Assets
import vectorImg from "../assets/vector1.png";

const Signup = () => {
    // STATE INPUT
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // STATE TAMBAHAN
    const [agreement, setAgreement] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(""); // Tambah state untuk error API

    const navigate = useNavigate();

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

    // === INTEGRASI API REGISTER YANG DIUPDATE ===
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // SIMULASI API CALL - GANTI DENGAN API ASLI
            console.log("Register attempt:", { firstName, email, password });

            // SIMULASI PROSES REGISTRASI (1.5 detik)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // SIMULASI KONDISI BERHASIL/ERROR
            if (email === "error@example.com") {
                // Simulasi error untuk email tertentu
                setApiError("Registration failed. Email might already be registered.");
                setLoading(false);
                return;
            }

            // ============================================
            // REGISTRASI BERHASIL - SIMULASI
            // ============================================
            
            // 1. Simpan data user di localStorage (opsional, untuk simulasi)
            const userData = {
                name: firstName,
                email: email,
                registeredAt: new Date().toISOString()
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // 2. Simpan token auth (dummy)
            localStorage.setItem('authToken', 'dummy-token-' + Date.now());
            
            // 3. Tampilkan pesan sukses
            alert("Registration successful! You are now being redirected to login.");
            
            // 4. REDIRECT LANGSUNG KE HOME PAGE
            navigate('/login'); // Arahkan ke login
            
            // Catatan: Tidak perlu setLoading(false) karena komponen akan di-unmount

        } catch (err) {
            console.error("REGISTER FAILED:", err);
            
            // Handle network errors
            setApiError("Unable to connect to the server. Please try again later.");
            setLoading(false);
        }
        
        // Jika menggunakan API asli, letakkan setLoading(false) di sini:
        // setLoading(false);
    };

    // === CONTOH INTEGRASI API ASLI (jika punya API endpoint) ===
    /*
    const handleSubmitRealAPI = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setApiError("");

        try {
            // Ganti dengan endpoint API sebenarnya
            const response = await fetch("https://api.anda.com/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: firstName,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setApiError(data.message || "Registration failed. Please try again.");
                setLoading(false);
                return;
            }

            // Registrasi berhasil
            // 1. Simpan token/auth data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            
            // 2. Redirect ke home page
            alert("Registration successful!");
            navigate('/home');
            
        } catch (err) {
            console.error("REGISTER ERROR:", err);
            setApiError("Network error. Please check your connection.");
            setLoading(false);
        }
    };
    */

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
        <div className="w-full min-h-screen pt-4 pr-2 pb-4 pl-2 flex bg-white justify-center items-center overflow-hidden">
            
            {/* signup-container */}
            <div className="w-[976px] h-auto flex justify-center items-center gap-0 
                            lg:flex-row flex-col lg:max-w-none max-w-[650px] w-full">

                {/* LEFT FORM (signup-form-box) */}
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
                        
                        {/* ERROR DARI API */}
                        {apiError && (
                            <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                <span role="img" aria-label="Warning">⚠</span>{apiError}
                            </p>
                        )}
                        
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

                    {/* Link ke Login (opsional) */}
                    {/* <div className="text-center mt-4">
                        <Link
                            to="/login"
                            className="text-sm font-[Zen_Kaku_Gothic_Antique] text-black underline"
                        >
                            Already have an account? Login here
                        </Link>
                    </div> */}
                </div>

                {/* PANEL KANAN (right-side) - Gambar */}
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