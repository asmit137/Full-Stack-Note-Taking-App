import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import OTPInput from "../components/OTPInput";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Navbar from "../components/Navbar";

const API = import.meta.env.VITE_API_URL;

const inputClass = "w-full h-[52px] border border-gray-300 rounded-[10px] px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email.");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("OTP failed");
      alert(`OTP has been sent to ${email}`);
      setStep("otp");
    } catch (err) {
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[527px] h-[928px] px-[64px] py-10 flex flex-col gap-8">
        <Navbar />
        <h1 className="text-2xl font-bold">Sign in</h1>

        <div className="w-[343px] h-[340px] md:w-[399px] md:h-[370px] mx-auto flex flex-col gap-5">
          <div className="relative">
            <label htmlFor="email" className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder="jonas_kahnwald@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {step === "form" && (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-[399px] h-[54px] px-2 py-4 rounded-[10px] text-white mx-auto block ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {step === "otp" && (
            <>
              <OTPInput email={email} />
              <p className="text-xs text-center text-gray-500">
                Didn’t receive it?{" "}
                <button onClick={handleSendOtp} className="text-blue-600 hover:underline" disabled={loading}>
                  Resend OTP
                </button>
              </p>
            </>
          )}
        </div>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        <