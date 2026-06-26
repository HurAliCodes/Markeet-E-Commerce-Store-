import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { Currency } from 'lucide-react'

const CartTotal = () => {

  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'Cart'} text2={'Totals'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Delivery Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr />
        <div className='flex justify-between font-bold'>
          <p>Total</p>
          <p>{currency} {(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee)}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal