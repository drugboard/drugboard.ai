'use client';

import PrimaryButton from "@/components/global/PrimaryButton"
import { PackagePlus } from "lucide-react"

const CatalogPage = () => {
  return (
    <main className="flex flex-col h-full w-[85%] bg-white/80 border border-white rounded-3xl">
      <div className="w-full flex items-center justify-between p-3 border-b border-b-white ">
        <h2 className="">Catalog</h2>
        <PrimaryButton startContent={<PackagePlus />}>
          Add Product
        </PrimaryButton>
      </div>
    </main>
  )
}

export default CatalogPage