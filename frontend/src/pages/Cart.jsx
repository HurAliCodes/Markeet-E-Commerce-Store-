import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Minus, Plus } from 'lucide-react';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, getUserCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const data = [];
    if (!products || !cartItems) {
      setCartData([]);
      return;
    }
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const product = products.find(p => p._id === productId);
        if (cartItems[productId][size] > 0 && product) {
          data.push({
            ...product,
            size: size,
            quantity: cartItems[productId][size]
          });
        }
      }
    }
    setCartData(data);
  }, [cartItems, products]);



  return (
    <div className='border-t pt-14'>

      <div>
        {cartData.length === 0 ? (
          <>
            <ShoppingCart className='mx-auto text-shop_light_green/50 mt-24 mb-2 right-2 relative' size={120} />
            <div className='text-center text-lg'>Your cart is empty.</div>
            <Link to="/collection" className='bg-shop_light_green text-white py-2 px-4 rounded-md hover:bg-shop_dark_green hoverEffect mx-auto block max-w-xs text-center mt-5'>Continue Shopping</Link>
          </>
        ) : (
          <>
            <div className="grid lg:grid-cols-[2fr_1fr] gap-10 my-10">

              {/* Left Side - Cart Items */}
              <div>
                <div className='text-2xl mb-3'>
                  <Title text1={'Cart'} text2={'Items'} />
                </div>

                <div>
                  {
                    cartData.map((item, index) => {
                      

                      return (
                        <div
                          key={index}
                          className='py-4 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-[4fr_2fr_0.5fr] items-start sm:items-center gap-4'
                        >
                          <div className='flex items-start gap-6'>
                            <img
                              src={item.images?.[0]}
                              alt=""
                              className='w-16 sm:w-20'
                            />

                            <div>
                              <p className='font-semibold sm:text-lg text-sm'>
                                {item.name}
                              </p>

                              <div className='flex items-center gap-5 mt-2'>
                                <p>
                                  {currency}
                                  {item.price.toFixed(2)}
                                </p>

                                <p className='text-sm text-gray-500'>
                                  Size: <b>{item.size}</b>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className='flex border rounded overflow-hidden w-full sm:w-fit justify-start'>
                            <button
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                item.quantity > 1 &&
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className={`px-3 py-2 bg-gray-100 hover:bg-black hover:text-white hoverEffect border-gray-400 ${
                                item.quantity <= 1
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }`}
                            >
                              <Minus size={16} />
                            </button>

                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  parseInt(e.target.value)
                                )
                              }
                              onFocus={e=>
                              //  select all text in the input when focused
                              e.target.select()
                              }
                              className='px-0 py-2 min-w-10 w-full text-center border-l border-r border-gray-400 no-arrows'
                            />

                            <button
                              disabled={item.quantity >= 10}
                              onClick={() =>
                                item.quantity < 10 &&
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className={`px-3 py-2 bg-gray-100 hover:bg-black hover:text-white hoverEffect border-gray-400 ${
                                item.quantity >= 10
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <Trash2
                            onClick={() =>
                              updateQuantity(item._id, item.size, 0)
                            }
                            className='w-4 sm:w-5 text-gray-500 cursor-pointer hoverEffect hover:text-red-500 justify-self-start sm:justify-self-auto hidden sm:block'
                            size={20}
                          />

                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.size, 0)
                            }
                            className='sm:hidden bg-red-700 hover:bg-red-900 text-white py-2 px-3 rounded-md'
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              {/* Right Side - Cart Total */}
              <div className='lg:sticky lg:top-24 h-fit'>
                <CartTotal />

                <div className='w-full mt-4'>
                  <Link
                    to="/place-order"
                    className='bg-black hoverEffect text-white py-2 px-4 hover:bg-black/90 block text-center'
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>

            </div>
          </>
        )
        }
      </div>


    </div>
  )
}

export default Cart