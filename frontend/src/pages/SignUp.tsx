import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import OTPInput from "../components/OTPInput";

const API = import.meta.env.VITE_API_URL;

const inputClass =
  "w-full max-w-[343px] md:max-w-[399px] h-[52px] md:h-[54px] px-4 py-3 border border-gray-300 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email || !name || !dateOfBirth) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, dateOfBirth }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      alert(`OTP sent to ${email}`);
      setStep("otp");
    } catch {
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="pt-10 md:pt-20 px-4 flex flex-col gap-5 items-center w-full max-w-[527px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center md:justify-start items-center gap-2 w-full mb-6">
          <svg width="47" height="32" viewBox="0 0 47 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.6424 0.843087L24.4853 0L21.8248 9.89565L19.4228 0.961791L16.2656 1.80488L18.8608 11.4573L12.3967 5.01518L10.0855 7.31854L17.1758 14.3848L8.34596 12.0269L7.5 15.1733L17.1477 17.7496C17.0372 17.2748 16.9788 16.7801 16.9788 16.2717C16.9788 12.6737 19.9055 9.75685 23.5159 9.75685C27.1262 9.75685 30.0529 12.6737 30.0529 16.2717C30.0529 16.7768 29.9952 17.2685 29.8861 17.7405L38.6541 20.0818L39.5 16.9354L29.814 14.3489L38.6444 11.9908L37.7984 8.84437L28.1128 11.4308L34.5768 4.98873L32.2656 2.68538L25.2737 9.65357L27.6424 0.843087Z" fill="#367AFF" />
          </svg>
          <h1 className="text-xl font-bold">HD</h1>
        </div>

        {/* Headings */}
        <h1 className="text-3xl font-bold text-left w-full max-w-[399px]">Sign up</h1>
        <p className="text-sm text-gray-500 text-left w-full max-w-[399px]">
          Sign up to enjoy the feature of HD
        </p>

        {/* Form */}
        <div className="w-[343px] md:w-[399px] mx-auto flex flex-col gap-4">
          <div className="relative">
            <label htmlFor="name" className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={inputClass}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label htmlFor="dob" className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className={inputClass}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {step === "form" && (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full h-[54px] px-2 py-3 rounded-[10px] text-white text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
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

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
};

export default SignUp;
