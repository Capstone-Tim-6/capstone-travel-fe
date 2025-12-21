import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Assets (Pastikan path ini sudah benar)
import vectorImg from "../assets/vector.png";
import googleIcon from "../assets/google.png";
import appleIcon from "../assets/apple.png";
import facebookIcon from "../assets/facebook.png";

const Login = () => {
    // Tambahkan useNavigate hook
    const navigate = useNavigate();
    
    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    // VALIDASI
    const validateForm = () => {
        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email cannot be empty";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format";
            }
        }

        if (!password.trim()) {
            newErrors.password = "Password cannot be empty";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // SUBMIT LOGIN - MODIFIED
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setApiError("");

        try {
            // Logika API call
            console.log("Login attempt:", { email, password, rememberMe });

            // SIMULASI API RESPONSE (3 detik)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulasi kondisi error
            if (email === "error@example.com") {
                setApiError("Login failed. Please check your credentials.");
                setLoading(false);
                return;
            }

            // SIMULASI LOGIN BERHASIL
            // Biasanya di sini Anda akan:
            // 1. Menyimpan token/auth data di localStorage/sessionStorage
            // 2. Mengupdate state global (jika menggunakan Redux/Context)
            // 3. Redirect ke halaman home
            
            // Contoh menyimpan data login
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }
            
            // Simpan token (dummy untuk contoh)
            localStorage.setItem('authToken', 'dummy-token-12345');
            localStorage.setItem('userEmail', email);
            
            // Tampilkan alert
            alert("Login successful! Redirecting to home page...");
            
            // REDIRECT KE HOMEPAGE
            navigate('/'); // Ganti '/home' dengan path HomePage Anda
            
        } catch (error) {
            console.error("NETWORK ERROR:", error);
            setApiError("Unable to connect to the server. Please try again later.");
            setLoading(false);
        }
        
        // Note: setLoading(false) tidak dipanggil di sini karena 
        // sudah di-handle dalam navigate (komponen akan unmount)
    };

    // Style untuk input Email (border hitam) dan Password (border abu muda)
    const emailBorderClass = errors.email
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#212121] focus-within:border-[#212121]";

    const passwordBorderClass = errors.password
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#E0E0E0] focus-within:border-[#212121]";

    return (
        // login-wrapper
        <div className="w-full min-h-screen pt-4 pr-2 pb-4 pl-2 flex bg-white justify-center items-center overflow-hidden">

            {/* login-container */}
            <div className="w-[976px] h-auto flex justify-center items-center gap-0 
                            lg:flex-row flex-col lg:max-w-none max-w-[650px] lg:w-auto w-full">

                {/* PANEL KIRI (left-side) */}
                <div className="
                    hidden lg:flex 
                    w-[632px] h-[618px] 
                    bg-[#76A4FA] 
                    rounded-none 
                    lg:rounded-r-[50px] 
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

                {/* PANEL KANAN (login-form-box) */}
                <div className="
                    w-full lg:w-[604px] h-auto lg:h-[618px] 
                    bg-white 
                    rounded-none lg:rounded-l-none
                    border border-[#E0E0E0]
                    p-[33px] lg:px-[95px] lg:py-[33px] px-8 py-7 
                    box-border 
                    shadow-[0_82px_40px_-14px_rgba(100,100,100,0.0784)]
                    flex flex-col gap-[26px]
                ">
                    <h1 className="
                        text-center 
                        font-[Zen_Kaku_Gothic_Antique] text-[31.25px] 
                        font-bold leading-[37.5px] 
                        text-black 
                        mb-0
                    ">
                        Masuk
                    </h1>
                    <p className="
                        text-center 
                        font-[Zen_Kaku_Gothic_Antique] text-[12.8px] 
                        font-normal 
                        text-[#424242] 
                        leading-tight 
                        mb-0
                    ">
                        Quick & Simple way to Automate your payment
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-0">

                        {/* EMAIL */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${emailBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242]">ALAMAT EMAIL</label>
                            <input
                                type="email"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-none outline-none text-sm w-full 
                                            placeholder:text-[#616161] placeholder:text-base 
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
                            <label className="mb-[2px] text-xs text-[#424242]">kATA SANDI</label>
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

                        {/* Remember Me */}
                        <div className="flex gap-2 items-center mt-[30px] mb-[10px] h-[22px]">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-[21.52px] h-[22px] border border-[#212121] accent-[#76A4FA] cursor-pointer"
                            />
                            <label htmlFor="remember" className="
                                font-[Zen_Kaku_Gothic_Antique] text-sm 
                                font-normal text-[#616161] 
                                leading-[22.53px] 
                                underline cursor-pointer"
                            >
                                Remember Me
                            </label>
                        </div>

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
                            {loading ? "Processing..." : "PROCEED"}
                        </button>
                    </form>
                    
                    <div className="text-center mt-4">
                        <Link
                            to="/signup"
                            className="text-sm font-[Zen_Kaku_Gothic_Antique] text-black underline"
                        >
                            Back to Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;