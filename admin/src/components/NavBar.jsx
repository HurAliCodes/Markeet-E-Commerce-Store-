import React from 'react'
import { assets } from '../assets'

const NavBar = ({ setToken }) => {
  return (
    <div className='flex justify-between items-center px-4 py-2 sm:px-10 sm:py-5'>
      <div className='relative'>
        <img className='w-30 h-10 object-cover' src={assets.logo} alt="Logo" />
        <span className='text-black text-xs font-semibold absolute -bottom-1 left-0.5 tracking-[4.5px] text-nowrap'>admin panel</span>
      </div>
      <button className='border-2 border-shop_light_green px-5 py-2 sm:px-7 sm:py-2 rounded text-xs sm:text-sm text-shop_light_green hover:text-white hover:bg-shop_light_green hoverEffect font-semibold' onClick={() => setToken("")}>Log Out</button>
    </div>
  )
}

export default NavBar