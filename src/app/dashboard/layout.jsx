import DashboardSidebar from "./components/DashboardSidebar";

export const metadata = {
  title: "Dashboard · drugboard.ai",
  description: "AI Assitant Application for Life Sciences Students and Professionals",
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    ]
  }
};


export default function DashboardLayout({ children }) {
  return (
    <div className="bg-light bg-cover bg-center bg-fixed h-screen w-full overflow-auto flex items-center justify-center gap-3 p-3">
        <DashboardSidebar />
        <div className="p-3 h-full bg-white/80 border-2 border-white w-[85%] rounded-3xl">
            {children}
        </div>
    </div>
  );
}
