import React from 'react'
import { assets } from '../assets'

const Hero = () => {
  return (
    <>
        <div className="flex flex-col sm:flex-row border border-gray-400">
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-10">
                <div className="text-light_Gray">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-0.5 bg-light_Gray"></p>
                        <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
                    </div>
                    <h1 className="text-3xl prata-regular lg:text-5xl leading-relaxed sm:py-1">Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className="font-semibold text-sm ms:text-base">SHOP NOW.</p>
                        <p className="w-8 md:w-11 h-0.5 bg-light_Gray"></p>
                    </div>
                </div>
            </div>

            {/* Hero Right Side */}
            <img src={assets.hero_img} alt="Hero Image" className="w-full sm:w-1/2 " />
        </div>
    </>
  )
}

export default Hero