import React from 'react'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import {GraduationCap} from 'lucide-react';
import ProgressCard from '@/components/ui/KnowledgePathways/ProgressCard';

const KnowledgePathways = () => {
  const [user, setUser] = React.useState(null);

 
  return (
    <section className='w-1/2 h-[50vh] flex flex-col items-stretch bg-white/60 backdrop-blur-3xl rounded-md border-2 border-white'>
        <div className="w-full px-3 py-2 flex items-center justify-between border-b-2 border-white">
            <div className="flex items-center gap-2 text-black">
                <GraduationCap />
                <h1 className="font-bold font-cursive text-lg">Knowledge Pathways</h1>
            </div>
       </div>

       <div className='w-full flex-1 flex items-center justify-between'>
        <div className='flex-1'>
          
        </div>
        <div className='flex-1'>
            <ProgressCard />
        </div>
       </div>
    </section>
  )
}

export default KnowledgePathways