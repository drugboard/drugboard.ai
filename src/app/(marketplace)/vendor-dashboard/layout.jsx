import VendorDashboardSidebar from "./components/VendorDashboardSidebar";

export const metadata = {
    title: "Vendor Dashboard ✨ Pharma Market · drugboard.ai",
    description: "Vendor Dashboard of Marketplace for Science People 🚀",
  };

const VendorDashboardLayout = ({children}) => {
    return (
        <div className="p-3 bg-light bg-cover bg-center bg-fixed h-screen w-full overflow-auto flex items-center gap-3 justify-center">
          <VendorDashboardSidebar />
            {children}
        </div>
      );
}

export default VendorDashboardLayout;