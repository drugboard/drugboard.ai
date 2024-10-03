import React from 'react'

const Onboarding = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <main className='rounded-3xl border border-white bg-white/70 backdrop-blur-xl p-4 flex w-[750px] h-[600px]'>
            <section className='relative w-[250px] h-full'>
                <img className='rounded-xl w-full h-full object-cover object-right' src="/macBgThree.jpg" alt="onboarding-carousel" />
                <div className='p-3 flex flex-col justify-evenly z-10 absolute inset-x-0 inset-y-0 bg-white/20 rounded-xl'>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>1</div>
                        <div className='flex flex-col items-start gap-1'>
                            <h4 className='uppercase font-thin text-sm'>Select</h4>
                            <h2 className='font-semibold'>Field of Interest</h2>
                        </div>
                    </article>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>2</div>
                        <div className='flex flex-col items-start gap-1'>
                            <h4 className='uppercase font-thin text-sm'>Fill</h4>
                            <h2 className='font-semibold'>Personal Info.</h2>
                        </div>
                    </article>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>3</div>
                        <div className='flex flex-col items-start gap-1'>
                            <h4 className='uppercase font-thin text-sm'>Customize</h4>
                            <h2 className='font-semibold'>Preferences</h2>
                        </div>
                    </article>
                </div>
            </section>
            <section>

            </section>
        </main>
    </div>
  )
}

export default Onboarding