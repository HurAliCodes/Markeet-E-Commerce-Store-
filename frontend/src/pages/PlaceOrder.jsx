import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import apiClient from '../utils/apiClient'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { assets } from '../assets/'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { cartItems, setCartItems, getCartAmount, delivery_fee } = useContext(ShopContext);  

  const [methods, setMethods] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  } 

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try{
      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          orderItems.push({
            productId: productId,
            size: size,
            quantity: cartItems[productId][size]
          });
        }
      }

      if (orderItems.length === 0) {
        throw new Error('Cart is empty');
      }
      
      const orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: methods,
        address: formData,
        payment: false,
        Date: Date.now(),
      }

      const response = await apiClient.post(`api/order/place/${methods}`, orderData);
      console.log('Order placed successfully:', response.data);
      toast.success('Order placed successfully!');
      setCartItems({});
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
      });
      navigate('/orders'); 

    } catch(error){
      
      console.error('Error placing order:', error);
      toast.error(`Failed to place order: ${error.response?.data?.message || error.message}`);
    
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justsify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----------------- Left Side ------------------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>
        <div className='text-xl sm:text-2xl'>
          <Title text1='Delivery' text2='Information' />
        </div>
        <div className='flex gap-3'>
          <input required type='text' onChange={onChangeHandler} name='firstName' placeholder='First Name' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
          <input required type='text' onChange={onChangeHandler} name='lastName' placeholder='Last Name' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />   
        </div>
        <input required type='email' onChange={onChangeHandler} name='email' placeholder='Email' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        <input required type='text' onChange={onChangeHandler} name='address' placeholder='Address' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        <div className='flex gap-3'>
          <input required type='text' onChange={onChangeHandler} name='city' placeholder='City' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
          <input required type='text' onChange={onChangeHandler} name='state' placeholder='State' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <div className='flex gap-3'>
          <input required type='text' onChange={onChangeHandler} name='zipCode' placeholder='Zip Code' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
          <input required type='text' onChange={onChangeHandler} name='country' placeholder='Country' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <input required type='text' onChange={onChangeHandler} name='phoneNumber' placeholder='Phone Number' className='w-full border border-gray-300 rounded py-1.5 px-3.5' />
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
              <div onClick={()=>setMethods('safepay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`border-2 min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full ${methods === 'safepay' ? 'bg-shop_light_green' : 'border-gray-300'}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>SAFE PAY</p>
              </div>
              <div onClick={()=>setMethods('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`border-2 min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full ${methods === 'cod' ? 'bg-shop_light_green' : 'border-gray-300'}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
          </div>

          <div className='mt-8 w-full'>
            <button className='bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors w-full block text-center'>
              Place Order
            </button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder