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
        className="w-full border py-2 rounded cursor-pointer hover:bg-gray-100"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    );
  };
  export default GoogleSignInButton;
  