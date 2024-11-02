export const metadata = {
    title: "Authentication ✨ Pharma Market",
    description: "Authentication for a Vendor to enter into Pharma Marketplace for Science People 🚀",
  };

const VendorAuthenticationLayout = ({children}) => {
    return (
        <div className="bg-devGarrageBGImage bg-cover bg-center bg-fixed h-screen w-full overflow-auto">
            {children}
        </div>
      );
}

export default VendorAuthenticationLayout;