import React from 'react'
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';

const SynergyFinder = () => {
  return (
    <section className='w-1/2 h-[50vh] bg-white/60 backdrop-blur-3xl rounded-md border-2 border-white'>
        <div className="px-3 py-2 flex items-center justify-between border-b-2 border-white">
            <div className="flex items-center gap-2 text-black">
                <Diversity3RoundedIcon />
                <h1 className="font-bold font-cursive text-lg">Synergy Finder</h1>
            </div>
        </div>
    </section>
  )
}

export default SynergyFinder