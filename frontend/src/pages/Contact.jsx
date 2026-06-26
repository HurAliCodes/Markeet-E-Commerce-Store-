import React from 'react';
import { assets } from '../assets'; 
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className='w-full border-t pt-10'>
      
      {/* Page Title */}
      <div className='text-4xl text-center mt-10'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Main Content: Image Left, Details Right */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        
        {/* Left Side: Image */}
        <img 
          className='w-full md:max-w-[450px] object-cover rounded-sm' 
          src={assets.contact_img} 
          alt="Contact Us" 
        />
        
        {/* Right Side: Information */}
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600 text-sm md:text-base md:w-2/5'>
          
          <div>
            <p className='font-semibold text-xl text-gray-800 mb-4'>Our Store</p>
            <p className='text-gray-500 leading-relaxed'>
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className='text-gray-500 leading-relaxed'>
              Tel: (415) 555-0132 <br /> Email: info@forever.com
            </p>
          </div>

          <div className='w-full border-t border-gray-200 pt-4'>
            <p className='font-semibold text-xl text-gray-800 mb-4'>Careers at Forever</p>
            <p className='text-gray-500 mb-4 leading-relaxed'>
              Learn more about our teams and job openings.
            </p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 active:bg-gray-800'>
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      <NewsletterBox />

    </div>
  );
};

export default Contact;