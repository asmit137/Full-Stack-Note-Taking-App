const GoogleSignInButton = () => {
    const handleGoogleLogin = async () => {
      const tokenId = (window as any).googleUser.getAuthResponse().id_token;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId }),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    };
    return (
     
      <button
      onClick={handleGoogleLogin}
      className="w-full max-w-[343px] md:max-w-[399px] h-[54px] bg-blue-600 text-white text-sm rounded-[10px] hover:bg-blue-700"
    >
      Sign in with Google
    </button>
    );
  };
  export default GoogleSignInButton;
  