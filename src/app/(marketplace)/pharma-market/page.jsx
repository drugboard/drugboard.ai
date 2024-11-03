"use client";
import Header from "@/app/components/Header";
import { useState } from "react";

const PharmaMarketPage = () => {

  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`flex flex-col gap-3 p-3 ${isDarkMode ? "bg-dark" : "bg-light"} bg-cover bg-center bg-fixed h-screen w-full overflow-auto`}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <main className="min-h-screen w-full p-3 flex flex-col gap-3 bg-white/80 border border-white rounded-3xl">

        </main>
    </div>
  )
}

export default PharmaMarketPage;