import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify';
import Title from '../components/Title';
import apiClient from '../utils/apiClient';

const Orders = () => {

    const { products, currency, token } = useContext(ShopContext);
    const [ orders, setOrders ] = useState([]);

    const fetchOrders = async () => {
        try {
            if (!token) {
                setOrders([]);
                return;
            }
            const response = await apiClient.get('/api/order/user');
            if (response.data.success) {
                let allOrders = []
                response.data.orders.forEach(order => {
                    order.items.forEach(item => {
                        const product = products.find(product => product._id === item.productId);

                        if (product) {
                            allOrders.push({
                                ...product,
                                size: item.size,
                                quantity: item.quantity,
                                status: order.status,
                                date: order.date,
                                paymentMethod: order.paymentMethod,
                                amount: order.amount,
                            });
                        }
                    })
                })
                console.log('Fetched Orders:', allOrders);
                setOrders(allOrders);
            } else {
                toast.error('Failed to fetch orders: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('An error occurred while fetching orders. Please try again.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token, products]);

    const formatOrderDate = (dateValue) => {
        if (!dateValue) {
            return 'N/A';
        }

        return new Date(dateValue).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
        
    const getOrderColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'bg-yellow-500';
            case 'Order Shipped':
                return 'bg-blue-500';
            case 'Order Delivered':
                return 'bg-green-500';
            case 'Order Cancelled':
                return 'bg-red-500';
            case 'Out for Delivery':
                return 'bg-purple-500';
            case 'Payment Pending':
                return 'bg-orange-500';
            case 'Returned':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className='border-t pt-16'>

            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'}/>
            </div>

            <div>
                {
                    orders.map((item, index) => (
                    <div key={index} className='py-4 border my-5 px-5 rounded text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex items-start gap-6 text-sm'>
                            <img className='w-24' src={item.images?.[0]} alt="" />
                            <div>
                                <p className='sm:text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                    <p className='text-lg'>{currency}{item.amount}</p>
                                    <p>Quantity: <span className="font-bold">{item.quantity}</span></p>
                                    <p className='ml-3'>Size: <span className="font-bold">{item.size}</span></p>
                                </div>
                                <p className='mt-2'>Date: <span className='text-gray-400'>{formatOrderDate(item.date)}</span></p>
                                <p className='mt-1'>Payment: <span className='text-gray-400 uppercase'>{item.paymentMethod}</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'> 
                            <div className='flex items-center gap-2 ml-auto mr-5'>
                                <p className={`min-w-2 h-2 rounded-full ${getOrderColor(item.status)}`}></p>
                                <p className='text-sm md:text-base'>{item.status || 'Order Placed'}</p>
                            </div>
                            <button onClick={() => cancelOrder(item._id)} disabled={item.cancellable ===true ? true: false } className='bg-white px-4 py-2 rounded border-2 border-gray-300 text-gray-800 hover:bg-black hover:text-white transition'>Cancel Order</button>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders