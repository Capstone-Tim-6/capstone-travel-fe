import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Assets (Pastikan path ini sudah benar)
import vectorImg from "../assets/vector1.png"; // Asumsi menggunakan vector1.png

import api from "../services/api";

// CONSTANT UNTUK TIMER OTP
const RESEND_TIMER_SECONDS = 60;

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    // State untuk Timer dan Status OTP
    const [otpSent, setOtpSent] = useState(false); 
    const [resendTimer, setResendTimer] = useState(0); 

    const navigate = useNavigate();

    // ======================================
    // LOGIC TIMER RESEND OTP
    // ======================================
    useEffect(() => {
        let timerId;
        if (resendTimer > 0) {
            timerId = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0 && otpSent) {
            // Setelah timer habis, beri kesempatan user untuk Resend
            setOtpSent(false); 
        }

        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [resendTimer, otpSent]);


    // ======================================
    // VALIDASI FORM
    // ======================================
    const validateForm = (isVerification = false) => {
        const newErrors = {};
        let isValid = true;

        // Validasi Email
        if (!email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Email format is not valid.";
                isValid = false;
            }
        }

        // Validasi OTP (Hanya saat verifikasi)
        if (isVerification) {
            if (!otp.trim()) {
                newErrors.otp = "OTP code is required.";
                isValid = false;
            } else if (otp.trim().length !== 6) { 
                newErrors.otp = "OTP must be 6 digits.";
                isValid = false;
            }
        }

        // Validasi Agreement
        if (!agreement) {
            newErrors.agreement = "You must agree to the Terms and Privacy Policy.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    // ======================================
    // HANDLE SEND/RESEND OTP
    // ======================================
    const handleSendOTP = async (e) => {
        e.preventDefault();

        // Validasi Email dan Agreement (tanpa OTP)
        if (!validateForm(false)) return; 

        setLoading(true);
        setErrors({});

        try {
            await api.post("/auth/forgot-password", { email });
            
            // Jika berhasil:
            setOtpSent(true); 
            setResendTimer(RESEND_TIMER_SECONDS); // Mulai hitungan mundur
            
            alert(`OTP successfully sent to ${email}. Check your inbox!`);

        } catch (err) {
            console.error("SEND OTP FAILED:", err);
            setErrors({ general: err?.friendlyMessage || "Failed to send OTP. Please try again." });
        }
        setLoading(false);
    };


    // ======================================
    // HANDLE NEXT (SUBMIT VERIFIKASI)
    // ======================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi Email, OTP, dan Agreement
        if (!validateForm(true)) return; 

        setLoading(true);

        try {
            await api.post("/auth/verify-otp", { email, otp });

            // Jika berhasil, navigasi ke halaman reset password
            alert("OTP Verified! Redirecting to Reset Password...");
            navigate("/reset-password", { state: { email, otp } }); 

        } catch (err) {
            console.error("VERIFY FAILED:", err);
            setErrors({ otp: err?.friendlyMessage || "Invalid or expired OTP. Please try again." });
        }
        setLoading(false);
    };


    // Border Class Helper
    const emailBorderClass = errors.email 
        ? "border-red-600 focus-within:border-red-600" 
        : "border-[#E0E0E0] focus-within:border-[#212121]";
    
    const otpBorderClass = errors.otp
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#E0E0E0] focus-within:border-[#212121]";


    return (
        // forgot-wrapper
        <div className="w-full min-h-screen pt-4 pr-2 pb-4 pl-2 flex bg-white justify-center items-center overflow-hidden">
            
            {/* forgot-container */}
            <div className="w-[976px] h-auto flex justify-center items-center gap-0 
                            lg:flex-row flex-col lg:max-w-none max-w-[650px] w-full">

                {/* LEFT FORM (forgot-form-box) */}
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
                        Forgot Password
                    </h1>
                    <p className="
                        text-center 
                        font-[Zen_Kaku_Gothic_Antique] text-[12.8px] 
                        font-normal 
                        text-[#757575] 
                        leading-tight 
                        mb-0
                    ">
                        Enter your email address to reset your password.
                    </p>

                    {/* FORM CONTAINER: flex-col gap-0 meniadakan jarak antara input group */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                        
                        {/* EMAIL */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${emailBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-none outline-none text-sm w-full bg-transparent
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
                        
                        {/* OTP + BUTTON SEND/RESEND */}
                        <div className="relative w-full lg:w-[380px]">
                        <div className={`
                            input-group 
                            w-full h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${otpBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">OTP CODE</label>
                            
                            <div className="relative"> {/* Container untuk input + tombol */}
                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="border-none outline-none text-sm w-full pr-16 
                                            placeholder:text-[#757575] placeholder:text-base 
                                            placeholder:font-[Zen_Kaku_Gothic_Antique] placeholder:font-light 
                                            placeholder:leading-[28.16px]"
                            />

                            {/* Tombol OTP di dalam input box */}
                            <button
                                type="button" 
                                className="
                                absolute right-2 transform -translate-y-1/2 
                                bg-[#212121] text-white font-bold text-xs tracking-widest uppercase px-4 py-4
                                rounded-lg hover:bg-[#424242] 
                                disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed
                                transition duration-150
                                "
                                onClick={handleSendOTP}
                                disabled={loading || resendTimer > 0}
                            >
                                {resendTimer > 0 ? `RESEND (${resendTimer}s)` : (otpSent ? 'RESEND' : 'OTP')}
                            </button>
                            </div>

                            {errors.otp && (
                            <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                <span role="img" aria-label="Warning">⚠️</span>{errors.otp}
                            </p>
                            )}
                        </div>
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

                        {/* GENERAL ERROR */}
                        {errors.general && (
                            <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                <span role="img" aria-label="Warning">⚠</span>{errors.general}
                            </p>
                        )}


                        {/* BUTTON NEXT (SUBMIT) */}
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
                            {loading ? "Verifying..." : "NEXT"}
                        </button>
                        
                    </form>

                    {/* Link Kembali ke Login */}
                    {/* <div className="text-center mt-4">
                        <Link 
                            to="/login" 
                            className="text-sm font-[Zen_Kaku_Gothic_Antique] text-[#76A4FA] hover:text-[#5c85d6] underline"
                        >
                            Back to Login
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

export default ForgotPassword;