import { useState } from "react";

const inputClass =
  "w-full max-w-[343px] md:max-w-[399px] h-[52px] md:h-[54px] px-4 py-3 border border-gray-300 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const OTPInput = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP.");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Verification failed");

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Failed to verify OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[343px] md:max-w-[399px]">
        <label htmlFor="otp" className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
          OTP
        </label>
        <input
          id="otp"
          type="text"
          className={inputClass}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        onClick={verifyOtp}
        disabled={loading}
        className="w-full max-w-[343px] md:max-w-[399px] h-[54px] px-2 py-3 rounded-[10px] text-white text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default OTPInput;
