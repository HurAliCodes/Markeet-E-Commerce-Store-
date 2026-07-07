import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import apiClient from '../utils/apiClient';

const Orders = () => {
const { products, currency, token } = useContext(ShopContext);

const [orders, setOrders] = useState([]);
const [activeTab, setActiveTab] = useState('active');

const fetchOrders = async () => {
    try {
        if (!token) {
            setOrders([]);
            return;
        }

        const response = await apiClient.get('/api/order/user');

        if (response.data.success) {
            const allOrders = [];

            response.data.orders.forEach((order) => {
                order.items.forEach((item) => {
                    const product = products.find(
                        (product) => product._id === item.productId
                    );

                    if (product) {
                        allOrders.push({
                            ...product,
                            orderId: order._id,
                            size: item.size,
                            quantity: item.quantity,
                            status: order.status,
                            date: order.date,
                            paymentMethod: order.paymentMethod,
                            amount: order.amount,
                            cancellable: order.cancellable,
                        });
                    }
                });
            });

            setOrders(allOrders);
        } else {
            toast.error(response.data.message || 'Failed to fetch orders');
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('An error occurred while fetching orders.');
    }
};

useEffect(() => {
    fetchOrders();
}, [token, products]);

const formatOrderDate = (dateValue) => {
    if (!dateValue) return 'N/A';

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

const cancelOrder = async (orderId) => {
    try {
        const response = await apiClient.post('/api/order/cancel', {
            orderId,
        });

        if (response.data.success) {
            toast.success('Order cancelled successfully');
            fetchOrders();
        } else {
            toast.error(response.data.message || 'Unable to cancel order');
        }
    } catch (error) {
        console.error('Cancel order error:', error);
        toast.error('Something went wrong while cancelling the order');
    }
};

const activeOrders = orders.filter(
    (item) =>
        item.status !== 'Order Delivered' &&
        item.status !== 'Order Cancelled' &&
        item.status !== 'Returned'
);

const completedOrders = orders.filter(
    (item) => item.status === 'Order Delivered'
);

const cancelledOrders = orders.filter(
    (item) =>
        item.status === 'Order Cancelled' ||
        item.status === 'Returned'
);

const getFilteredOrders = () => {
    if (activeTab === 'active') return activeOrders;
    if (activeTab === 'completed') return completedOrders;
    if (activeTab === 'cancelled') return cancelledOrders;

    return orders;
};

const displayedOrders = getFilteredOrders();

return (
    <div className="border-t pt-16">
        <div className="text-2xl">
            <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        <div className="flex flex-wrap gap-3 mt-8 border-b pb-4">
            <button
                onClick={() => setActiveTab('active')}
                className={`px-5 py-2 rounded transition ${
                    activeTab === 'active'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                Active Orders ({activeOrders.length})
            </button>

            <button
                onClick={() => setActiveTab('completed')}
                className={`px-5 py-2 rounded transition ${
                    activeTab === 'completed'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                Completed ({completedOrders.length})
            </button>

            <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-5 py-2 rounded transition ${
                    activeTab === 'cancelled'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                Cancelled / Returned ({cancelledOrders.length})
            </button>
        </div>

        <div>
            {displayedOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-12">
                    No orders found in this section.
                </p>
            ) : (
                displayedOrders.map((item, index) => (
                    <div
                        key={`${item.orderId}-${item._id}-${index}`}
                        className="py-4 border my-5 px-5 rounded text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        <div className="flex items-start gap-6 text-sm">
                            <img
                                className="w-24"
                                src={item.images?.[0]}
                                alt={item.name}
                            />

                            <div>
                                <p className="sm:text-base font-medium">
                                    {item.name}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                                    <p className="text-lg">
                                        {currency}
                                        {item.amount}
                                    </p>

                                    <p>
                                        Quantity:{' '}
                                        <span className="font-bold">
                                            {item.quantity}
                                        </span>
                                    </p>

                                    <p>
                                        Size:{' '}
                                        <span className="font-bold">
                                            {item.size}
                                        </span>
                                    </p>
                                </div>

                                <p className="mt-2">
                                    Date:{' '}
                                    <span className="text-gray-400">
                                        {formatOrderDate(item.date)}
                                    </span>
                                </p>

                                <p className="mt-1">
                                    Payment:{' '}
                                    <span className="text-gray-400 uppercase">
                                        {item.paymentMethod}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="md:w-1/2 flex justify-between items-center">
                            <div className="flex items-center gap-2 ml-auto mr-5">
                                <p
                                    className={`min-w-2 h-2 rounded-full ${getOrderColor(
                                        item.status
                                    )}`}
                                ></p>

                                <p className="text-sm md:text-base">
                                    {item.status || 'Order Placed'}
                                </p>
                            </div>

                            {item.status !== 'Order Delivered' &&
                                item.status !== 'Order Cancelled' &&
                                item.status !== 'Returned' && (
                                    <button
                                        onClick={() =>
                                            cancelOrder(item.orderId)
                                        }
                                        disabled={!item.cancellable}
                                        className="bg-white px-4 py-2 rounded border-2 border-gray-300 text-gray-800 hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);
};

export default Orders;
