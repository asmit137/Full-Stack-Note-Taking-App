import { useState } from "react";

const OTPInput = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState("");
  const verifyOtp = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  };
  return (
    <>
      <input
        type="text"
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded hover:bg-blue-700"
        onClick={verifyOtp}
      >
        Verify OTP
      </button>
      <button
        onClick={verifyOtp}
        className={`w-[399px] h-[54px] px-2 py-4 rounded-[10px] text-white mx-auto block bg-blue-600 hover:bg-blue-700`}
      >
        Verify OTP
      </button>
    </>
  );
};
export default OTPInput;
