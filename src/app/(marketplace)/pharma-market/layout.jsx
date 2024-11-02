export const metadata = {
    title: "Home ✨ Pharma Market · drugboard.ai",
    description: "Pharma Marketplace for Science People 🚀",
  };

const PharmaMarketLayout = ({children}) => {
    return (
        <div className="bg-devGarrageBGImage bg-cover bg-center bg-fixed h-screen w-full overflow-auto">
            {children}
        </div>
      );
}

export default PharmaMarketLayout;