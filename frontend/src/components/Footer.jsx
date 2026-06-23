import React from 'react'
import { assets } from '../assets'
import { Copyright } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm p-4 border-t border-gray-300 pt-10'>
        <div>
          <div className="max-h-15 flex justify-start items-start w-full overflow-hidden"><img src={assets.logo} alt="Logo" className="mb-5 w-42  relative bottom-16" /></div>
          <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque. lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.</p>
        </div>
        
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+123 456 789</li>
            <li>contact@company.com</li>
          </ul>
        </div>
      </div>
        <div>
            <hr className="border-gray-300"/>
            <p className="py-3 text-xs font-light px-4 text-center">Copyright <Copyright className='inline text-xs scale-70'/> 2025 Markeet. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer