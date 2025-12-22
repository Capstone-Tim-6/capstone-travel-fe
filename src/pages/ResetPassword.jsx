import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import ikon mata

// Assets (Pastikan path ini sudah benar)
import vectorImg from "../assets/vector1.png"; // Asumsi menggunakan vector1.png

import api from "../services/api";

const ResetPassword = () => {
    // State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [agreement, setAgreement] = useState(false);
    
    // State untuk mengontrol visibilitas password
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    // Asumsi: email dibawa dari halaman ForgotPassword
    const email = location.state?.email || 'user@example.com';
    const otp = location.state?.otp;

    // === VALIDASI FORM ===
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!newPassword) {
            newErrors.newPassword = "New password is required.";
            isValid = false;
        } else if (newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters.";
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        if (!agreement) {
            newErrors.agreement = "You must agree to the Terms and Privacy Policy.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // === HANDLE SUBMIT (RESET PASSWORD) ===
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            if (!otp) {
                setErrors({ general: "OTP tidak ditemukan. Silakan ulangi proses Forgot Password." });
                setLoading(false);
                return;
            }

            await api.post("/auth/reset-password", { email, otp, password: newPassword });

            // Jika berhasil
            alert("Password successfully reset! Redirecting to Login...");
            navigate("/login"); 

        } catch (error) {
            console.error("RESET FAILED:", error);
            setErrors({ general: error?.friendlyMessage || "Failed to reset password. Please try again." });
        }

        setLoading(false);
    };


    // Border Class Helper
    // Kita gunakan border abu muda (E0E0E0) seperti di Signup/Login untuk field password
    const newPasswordBorderClass = errors.newPassword
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#E0E0E0] focus-within:border-[#212121]";
    
    const confirmPasswordBorderClass = errors.confirmPassword
        ? "border-red-600 focus-within:border-red-600"
        : "border-[#E0E0E0] focus-within:border-[#212121]";

    return (
        // reset-wrapper
        <div className="w-full min-h-screen pt-4 pr-2 pb-4 pl-2 flex bg-white justify-center items-center overflow-hidden">
            
            {/* reset-container */}
            <div className="w-[976px] h-auto flex justify-center items-center gap-0 
                            lg:flex-row flex-col lg:max-w-none max-w-[650px] w-full">

                {/* LEFT FORM (reset-form-box) - W: 596px, H: 618px */}
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
                        Reset Password
                    </h1>
                    <p className="
                        text-center 
                        font-[Zen_Kaku_Gothic_Antique] text-[12.8px] 
                        font-normal 
                        text-[#757575] 
                        leading-tight 
                        mb-0
                    ">
                        Enter your new password for **{email}**.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                        
                        {/* NEW PASSWORD */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${newPasswordBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">NEW PASSWORD</label>
                            <div className="relative w-full">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="border-none outline-none text-sm w-full pr-8
                                                placeholder:text-[#757575] placeholder:text-base 
                                                placeholder:font-[Zen_Kaku_Gothic_Antique] placeholder:font-light 
                                                placeholder:leading-[28.16px]"
                                />
                                {/* Ikon Mata Sesuai Permintaan */}
                                <span
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-[#666] cursor-pointer pr-1 bg-white"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    role="button"
                                >
                                    {showNewPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                </span>
                            </div>
                            {errors.newPassword && (
                                <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                    <span role="img" aria-label="Warning">⚠</span>{errors.newPassword}
                                </p>
                            )}
                        </div>
                        
                        {/* CONFIRM PASSWORD */}
                        <div className={`
                            input-group 
                            w-full lg:w-[380px] h-[68px] 
                            flex flex-col p-3 gap-[6px] 
                            border hover:border-[#212121] 
                            ${confirmPasswordBorderClass}
                        `}>
                            <label className="mb-[2px] text-xs text-[#424242] text-left">CONFIRM PASSWORD</label>
                            <div className="relative w-full">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="border-none outline-none text-sm w-full pr-8
                                                placeholder:text-[#757575] placeholder:text-base 
                                                placeholder:font-[Zen_Kaku_Gothic_Antique] placeholder:font-light 
                                                placeholder:leading-[28.16px]"
                                />
                                {/* Ikon Mata Sesuai Permintaan */}
                                <span
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-[#666] cursor-pointer pr-1 bg-white"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    role="button"
                                >
                                    {showConfirmPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                </span>
                            </div>
                            {errors.confirmPassword && (
                                <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                    <span role="img" aria-label="Warning">⚠</span>{errors.confirmPassword}
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
                        
                        {/* GENERAL ERROR */}
                        {errors.general && (
                            <p className="error-text text-[#D32F2F] font-[Zen_Kaku_Gothic_Antique] text-sm font-light leading-snug mt-1 flex items-center gap-1">
                                <span role="img" aria-label="Warning">⚠</span>{errors.general}
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
                            {loading ? "Resetting..." : "DONE "}
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

export default ResetPassword;