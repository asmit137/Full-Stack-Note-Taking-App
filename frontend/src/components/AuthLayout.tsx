interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left: Form section */}
      <div className="flex flex-col justify-center items-center px-8">
        {children}
      </div>

      {/* Right: Image section (only on medium+ screens) */}
      <div className="hidden md:block">
        <img
          src="https://wallpapershq.com/wallpapers/1829_graphics-3d-modeling/800x1280"
          alt="Auth visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
