import React from 'react'
import MonacoCodeEditor from '../components/MonacoCodeEditor';

const IndianDevGarrage = () => {
  return (
    <main className='flex items-center gap-3 w-full p-3 h-full'>
      <section className='w-[20%] h-full flex flex-col gap-3 overflow-y-auto'>
        <div className='w-full h-[52%] bg-[#0F172A]/85 backdrop-blur-3xl rounded-3xl border-1 border-[#0F172A]'>
          <div className='p-3 w-full border-b-1 border-[#0F172A]'>
            <h1 className='text-white font-bold font-cursive'>File System</h1>
          </div>
        </div>

        <div className='flex items-center h-[8%] rounded-3xl p-3 w-full bg-[#0F172A]/85 backdrop-blur-3xl border-1 border-[#0F172A]'>
            <h1 className='text-white font-bold font-cursive'>Collaborators</h1>
        </div>

        <div className='w-full h-[40%] flex flex-wrap gap-3'>
          <div className='h-[47.7%] w-[47.5%] bg-[#0F172A]/85 backdrop-blur-3xl border-1 border-[#0F172A] rounded-3xl p-2'>
            <img src="/Krishna.jpg" alt="Shree Krishna" className='h-full w-full object-cover object-top rounded-xl' />
          </div>
          <div className='h-[47.7%] w-[47.5%] bg-[#0F172A]/85 backdrop-blur-3xl border-1 border-[#0F172A] rounded-3xl p-2'>
            <img src="/Jesus.jpg" alt="Jesus Christ" className='h-full w-full object-cover object-top rounded-xl' />
          </div>
          <div className='h-[47.7%] w-[47.5%] bg-[#0F172A]/85 backdrop-blur-3xl border-1 border-[#0F172A] rounded-3xl p-2'>
            <img src="/Hanuman.jpg" alt="Hanuman Jii" className='h-full w-full object-cover object-top rounded-xl' />
          </div>
          <div className='h-[47.7%] w-[47.5%] bg-[#0F172A]/85 backdrop-blur-3xl border-1 border-[#0F172A] rounded-3xl p-2'>
            <img src="/Mary.jpg" alt="Mary Maatha" className='h-full w-full object-cover object-top rounded-xl' />
          </div>
        </div>
      </section>

      {/* Monacco Code Editor Stuff here... */}
      <section className='w-[50%] h-full flex items-center justify-center p-3 bg-[#0F172A]/85 backdrop-blur-3xl rounded-3xl border-1 border-[#0F172A]'><MonacoCodeEditor /></section>

      {/* Web Viewer && Terminal, Console */}
      <section className='w-[40%] h-full flex flex-col items-stretch justify-center bg-[#0F172A]/85 backdrop-blur-3xl rounded-3xl border-1 border-[#0F172A]'>
        <div className='border-b-1 border-[#0F172A] w-full h-[50%]'>
          <div className='p-3 w-full border-b-1 border-[#0F172A]'>
            <h1 className='text-white font-bold font-cursive'>Web View</h1>
          </div>
        </div>
        <div className='border-t-1 border-[#0F172A] w-full h-[50%]'>
          <div className='p-3 w-full border-b-1 border-[#0F172A]'>
            <h1 className='text-white font-bold font-cursive'>Terminal & Console</h1>
          </div>
        </div>
      </section>
    </main>
  )
}

export default IndianDevGarrage;