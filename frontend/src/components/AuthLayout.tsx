import authImage from '../assets/authimage.jpg';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex w-full h-screen">
  {/* Left section (form) */}
  <div className="w-full md:w-[527px] p-8">{children}</div>

  {/* Right section (image) */}
  <div className="hidden md:block flex-1 h-screen">
    <img
      src={authImage}
      alt="Auth"
      className="w-full h-full object-cover"
    />
  </div>
</div>
  );
};

export default AuthLayout;
