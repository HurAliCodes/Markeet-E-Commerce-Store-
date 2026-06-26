import React from 'react'
import { assets } from '../assets'
import NewsletterBox from '../components/NewsletterBox'
import Title from '../components/Title'

const About = () => {
  return (
    <div className='w-full'>
      <div className='mb-10 flex flex-col md:flex-row gap-16 mt-20'>
          <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
          <div className='flex flex-col gap-6  text-gray-600 text-justify'>
              <div className='text-4xl'>
                  <Title text1={'ABOUT'} text2={'US'} />
              </div>
              <p>Forever was born out of a passion for innovation and a desire to revolutionise. lore ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque vel earum libero mollitia aliquam adipisci dolore. Sed quidem veniam, delectus magni animi exercitationem vero modi dolorum sapiente impedit, maxime ipsam eveniet provident?</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at Forever is to empower customers with choice, convenience, and Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ullam voluptas fugit culpa vel labore, voluptatum, consequatur laboriosam laborum totam nesciunt. Quis aspernatur sequi nulla quam ipsa omnis doloremque cumque! A, sapiente.</p>
          </div>
      </div>


      <div className='mb-10 flex flex-col md:flex-row gap-16 mt-30'>
          <div className='flex flex-col gap-6 text-gray-600 text-justify'>
          <div className='text-4xl'>
              <Title text1={'WHY'} text2={'CHOOSE US'} />
          </div>
              <p>At Forever, we understand that our customers have unique needs and preferences. That's why we offer a wide range of products and services to cater to every individual. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
              <p>Our team of experts is dedicated to providing exceptional customer service and support. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
              <b className='text-gray-800'>Our Commitment</b>
              <p>We are committed to sustainability and ethical practices in all aspects of our business. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
          </div>
          <img className='w-full md:max-w-[450px] max-h-90 object-cover' src={assets.about_img} alt="" />
      </div>

    <div className='mt-40'>
      <NewsletterBox />
    </div>

    </div>
  )
}

export default About