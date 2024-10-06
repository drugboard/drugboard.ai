import React from 'react'

const Onboarding = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <main className='bg-white/70 rounded-3xl bg-transparent backdrop-blur-xl p-3 flex items-stretch gap-3 w-[750px] h-[600px]'>
            <section className='relative w-[250px] h-full '>
                <img className='rounded-xl w-full h-full object-cover object-right' src="/macBgThree.jpg" alt="onboarding-carousel" />
                <div className='p-3 flex flex-col justify-evenly z-10 absolute inset-x-0 inset-y-0 bg-white/20 backdrop-blur-lg rounded-xl'>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>1</div>
                        <div className='flex flex-col items-start'>
                            <h4 className='uppercase text-sm'>Choose</h4>
                            <h2 className='font-bold'>Field of Interest</h2>
                        </div>
                    </article>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>2</div>
                        <div className='flex flex-col items-start'>
                            <h4 className='uppercase text-sm'>Fill</h4>
                            <h2 className='font-bold'>Personal Info.</h2>
                        </div>
                    </article>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>3</div>
                        <div className='flex flex-col items-start'>
                            <h4 className='uppercase text-sm'>Customize</h4>
                            <h2 className='font-bold'>Preferences</h2>
                        </div>
                    </article>
                    <article className='rounded-full p-2 bg-white flex items-center gap-3'>
                        <div className='h-[50px] w-[50px] bg-black rounded-full flex items-center justify-center font-bold text-white'>3</div>
                        <div className='flex flex-col items-start'>
                            <h4 className='uppercase text-sm'>Be a PRO User</h4>
                            <h2 className='font-bold'>Subscriptions</h2>
                        </div>
                    </article>
                </div>
            </section>
            <section className='w-[500px] flex flex-col gap-8 items-stretch'>
                <div>
                    <img src="./drugboardLogo.png" alt="" className='h-[100px] object-contain'/>
                </div>

                <form className='flex flex-col gap-2'>
                    <div className="flex flex-col items-stretch gap-1">
                        <p className="text-sm font-bold uppercase text-gray-600">Think & Fill a unique <strong>username</strong> for yourself!</p>
                        <div className='flex items-stretch gap-3 bg-white border-2 border-pink-500 rounded-lg w-full p-3'>
                            <span className='text-[#E879F9] text-5xl font-bold flex items-center justify-center'>@</span>
                            <input type="text" placeholder="USERNAME..." className='flex-1 text-5xl bg-transparent text-[#E879F9] w-full outline-0 font-bold' />
                        </div>
                    </div>
                </form>
            </section>


        </main>
    </div>
  )
}

export default Onboarding