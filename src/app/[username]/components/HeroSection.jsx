"use client";
import PrimaryButton from '@/components/global/PrimaryButton';
import { BadgeCheck } from 'lucide-react';
import { PhoneOutgoing } from 'lucide-react';
import ProfileHighlights from './ProfileHighlights';

const HeroSection = ({user}) => {
  return (
    <section className="p-3 py-6 flex items-start gap-3 w-full h-screen bg-white/85 border-2 border-white rounded-3xl">
        
        <div className="p-3 flex flex-col gap-3 items-center justify-center w-[30%] rounded-3xl">   
          <p className="text-center flex items-center justify-center border-2 border-[#7E22CE] px-6 font-semibold text-sm text-[#7E22CE] bg-[#F3E8FF] rounded-full">Medicinal Chemist</p>
          <img className="rounded-3xl object-contain" src="/Prasad.jpg" alt="" />

          <div className="flex flex-col gap-3 items-start">
            <h1 className="flex items-center gap-2 text-[#1E293B] line-clamp-1 text-3xl font-black">{user.displayName}
              <span>
                <BadgeCheck size={38} className='text-[#9333EA]'/>
              </span>
            </h1>
            <p className="text-[#1E293B] line-clamp-5 font-medium">
              As an Associate Principal Scientist at NanoVation Therapeutics, I am passionate about designing, synthesizing, and characterizing RNA drugs to advance scientific knowledge and improve human health. I have over 15 years of experience in organic and medicinal chemistry, with a Ph.D. from Université de Montréal and a postdoctoral fellowship at The University of British Columbia.

              My core competencies include research and development, HPLC-MS, NMR, organic synthesis, scientific writing, and presentation. I have contributed to multiple publications, patents, and book chapters in the field of peptide and peptidomimetic therapeutics. I also enjoy collaborating with multidisciplinary teams, mentoring junior colleagues, and participating in professional networks and conferences.
            </p>
          </div>
          
          <PrimaryButton className="text-lg" startContent={<PhoneOutgoing />} size='lg'>Book a Call</PrimaryButton>
        </div>

        <div className="w-[70%] h-full flex flex-col gap-3 p-3 rounded-3xl">

          <div className='flex gap-3 h-[50%] w-full'>
            {/* Profile Highlights ✨ */}
            <ProfileHighlights />

            {/*  */}
            <div className='h-full w-[50%] rounded-3xl border-2 border-[#A855F7] backdrop-blur-xl'>

            </div>
          </div>

          <div className='w-full h-[50%] border-2 border-[#EC4899] backdrop-blur-xl rounded-3xl'>

          </div>

        </div>
    </section>
  )
}

export default HeroSection;