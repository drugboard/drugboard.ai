import Header from "@/app/components/Header";

export const metadata = {
    title: "Pharma Market ✨ drugboard.ai",
    description: "Pharma Marketplace for Science People 🚀",
};

const PharmaMarketLayout = ({children}) => {
    return (
        <div className="flex flex-col gap-3 p-3 bg-light bg-cover bg-center bg-fixed h-screen w-full overflow-auto">
            <Header />
            {children}
        </div>
      );
}

export default PharmaMarketLayout;