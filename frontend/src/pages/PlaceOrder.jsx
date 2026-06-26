import { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/'
import { Link } from 'react-router-dom'

const PlaceOrder = () => {

  const [methods, setMethods] = useState('cod')

  return (
    <div className='flex flex-col sm:flex-row justsify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----------------- Left Side ------------------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>
        <div className='text-xl sm:text-2xl'>
          <Title text1='Delivery' text2='Information' />
        </div>
        <div className='flex gap-3'>
          <input type='text' placeholder='First Name' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
          <input type='text' placeholder='Last Name' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />   
        </div>
        <input type='email' placeholder='Email' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        <input type='text' placeholder='Address' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        <div className='flex gap-3'>
          <input type='text' placeholder='City' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
          <input type='text' placeholder='State' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <div className='flex gap-3'>
          <input type='text' placeholder='Zip Code' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
          <input type='text' placeholder='Country' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <input type='text' placeholder='Phone Number' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
      </div>

      {/* -------------- Right Side -------------- */}
      <div className='ml-auto sm:max-w-140 w-full'>
        <div className='min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1='Payment' text2='Method' />
          {/* ---------- Payment Method Selection ---------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={()=>setMethods('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`border-2 min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full ${methods === 'stripe' ? 'bg-shop_light_green' : 'border-gray-300'}`}></p>
                  <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
              </div>
              <div onClick={()=>setMethods('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`border-2 min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full ${methods === 'razorpay' ? 'bg-shop_light_green' : 'border-gray-300'}`}></p>
                  <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
              </div>
              <div onClick={()=>setMethods('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`border-2 min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full ${methods === 'cod' ? 'bg-shop_light_green' : 'border-gray-300'}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
          </div>

          <div className='mt-8 w-full'>
            <Link to='/orders' className='bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors w-full block text-center'>Place Order</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PlaceOrder