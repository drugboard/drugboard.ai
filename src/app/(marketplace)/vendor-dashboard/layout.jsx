export const metadata = {
    title: "Vendor Dashboard ✨ Pharma Market · drugboard.ai",
    description: "Vendor Dashboard of Marketplace for Science People 🚀",
  };

const VendorDashboardLayout = ({children}) => {
    return (
        <div className="bg-devGarrageBGImage bg-cover bg-center bg-fixed h-screen w-full overflow-auto flex items-center justify-center">
            {children}
        </div>
      );
}

export default VendorDashboardLayout;