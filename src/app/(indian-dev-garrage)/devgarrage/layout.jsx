export const metadata = {
  title: "Indian Dev Garrage",
  description: "AI Powered Cloud IDE 🚀",
};

export default function DevGarrageLayout({ children }) {
  return (
    <div className="bg-devGarrageBGImage bg-cover bg-center bg-fixed h-screen w-full overflow-auto">
        {children}
    </div>
  );
}
