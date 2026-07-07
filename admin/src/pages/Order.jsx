import { useState, useEffect, useMemo } from 'react'
import apiClient from '../utils/apiClient';
import { toast } from 'react-toastify';
import { orderStatusOptions } from '../constants/orderData.js';
import {
  ChevronDown,
  CheckCircle2,
  Eye,
  MapPin,
  Package,
  PencilLine,
  Truck,
  Wallet,
  CalendarDays,
  Search,
  X,
} from 'lucide-react';

const Order = () => {
  
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusValue, setStatusValue] = useState('');
  const [dialogMode, setDialogMode] = useState('view');
  const [activeTab, setActiveTab] = useState('active');
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/order/list');
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error('Failed to fetch orders:', response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(`An error occurred ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch products');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await apiClient.post('/api/order/status', {
        orderId,
        status,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );

        setSelectedOrder((prev) =>
          prev && prev._id === orderId ? { ...prev, status } : prev
        );

        setDialogMode('view');
        closeOrder();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update order status');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const baseOrders = orders.filter((order) => {
      const isCompleted = order.status === 'Order Delivered';

      if (activeTab === 'completed') {
        return isCompleted;
      }

      if (activeTab === 'active') {
        return !isCompleted;
      }

      return true;
    });

    if (!normalized) {
      return baseOrders;
    }

    return baseOrders.filter((order) => {
      const statusMatch = order.status?.toLowerCase().includes(normalized);
      const paymentMatch = order.paymentMethod?.toLowerCase().includes(normalized);
      const amountMatch = String(order.amount).includes(normalized);
      const addressMatch = Object.values(order.address || {})
        .join(' ')
        .toLowerCase()
        .includes(normalized);

      return statusMatch || paymentMatch || amountMatch || addressMatch;
    });
  }, [orders, query, activeTab]);

  const formatDate = (value) => {
    if (!value) return 'N/A';

    return new Date(value).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProductById = (productId) => products.find((product) => product._id === productId);

  const openOrder = (order) => {
    setSelectedOrder(order);
    setStatusValue(order.status || 'Order Placed');
    setDialogMode('view');
  };

  const openOrderForEdit = (order) => {
    setSelectedOrder(order);
    setStatusValue(order.status || 'Order Placed');
    setDialogMode('edit');
  };

  const closeOrder = () => {
    setSelectedOrder(null);
    setStatusValue('');
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

  const totalItems = orders.reduce((count, order) => count + (order.items?.length || 0), 0);
  const activeCount = orders.filter((order) => order.status !== 'Order Delivered').length;
  const completedCount = orders.filter((order) => order.status === 'Order Delivered').length;

  useEffect(() => {
    if (selectedOrder) {
      setStatusValue(selectedOrder.status || 'Order Placed');
    }
  }, [selectedOrder]);

  return (
    <div className="w-full p-4 md:p-6">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
            <p className="mt-1 text-sm text-gray-500">
              Review orders, inspect item details, and update statuses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm md:flex md:items-center">
            <div className="rounded-xl bg-gray-50 px-4 py-3 min-w-100">
              <p className="text-gray-500">Orders</p>
              <p className="text-lg font-semibold text-gray-900">{orders.length}</p>
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-3 min-w-100">
              <p className="text-gray-500">Items</p>
              <p className="text-lg font-semibold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex rounded-2xl bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('active')}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${activeTab === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                Active Orders ({activeCount})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${activeTab === 'completed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Completed Orders ({completedCount})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                All Orders ({orders.length})
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-shop_light_green focus-within:bg-white lg:min-w-90">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by status, payment, amount, or address"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
              <Package className="h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium text-gray-700">No orders found</p>
              <p className="max-w-md text-sm">
                Try a different search term or wait for new orders to come in.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-start gap-18 text-sm text-gray-700">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">Order</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          #{order._id.slice(0,10)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">Date</p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays className="h-4 w-4 text-gray-400" />
                          {formatDate(order.date)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">Amount</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          ${order.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">Status</p>
                        <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700">
                          <p className={`min-w-2 h-2 rounded-full ${getOrderColor(order.status)}`}></p>
                          {order.status || 'Order Placed'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openOrder(order)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>

                      <button
                        onClick={() => openOrderForEdit(order)}
                        className="inline-flex items-center gap-2 rounded-xl bg-shop_light_green px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                      >
                        <PencilLine className="h-4 w-4" />
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Order detail</p>
                <h2 className="text-2xl font-bold text-gray-900">#{selectedOrder._id?.slice(-6)}</h2>
              </div>

              <button
                onClick={closeOrder}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-6">
                <section className="rounded-2xl border border-gray-200 p-5">
                  <div className="mb-4 flex items-center gap-2 text-gray-900">
                    <Package className="h-5 w-5 text-shop_light_green" />
                    <h3 className="font-semibold">Items</h3>
                  </div>

                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, index) => {
                      const product = getProductById(item.productId);

                      return (
                        <div key={`${item.productId}-${item.size}-${index}`} className="flex gap-4 rounded-2xl bg-gray-50 p-4">
                          <img
                            src={product?.images?.[0]}
                            alt={product?.name || 'Product'}
                            className="h-20 w-16 rounded-xl object-cover"
                          />

                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {product?.name || item.productId}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Product ID: {item.productId}
                                </p>
                              </div>

                              <p className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700">
                                ${product?.price || '0'} each
                              </p>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="rounded-full bg-white px-3 py-1">Size: {item.size}</span>
                              <span className="rounded-full bg-white px-3 py-1">Qty: {item.quantity}</span>
                              <span className="rounded-full bg-white px-3 py-1">Line total: ${((product?.price || 0) * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-2xl border border-gray-200 p-5">
                  <div className="mb-4 flex items-center gap-2 text-gray-900">
                    <MapPin className="h-5 w-5 text-shop_light_green" />
                    <h3 className="font-semibold">Delivery Address</h3>
                  </div>

                  <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                    <p><span className="font-medium text-gray-900">Name:</span> {selectedOrder.address?.firstName} {selectedOrder.address?.lastName}</p>
                    <p><span className="font-medium text-gray-900">Email:</span> {selectedOrder.address?.email}</p>
                    <p><span className="font-medium text-gray-900">Phone:</span> {selectedOrder.address?.phoneNumber}</p>
                    <p><span className="font-medium text-gray-900">Country:</span> {selectedOrder.address?.country}</p>
                    <p className="sm:col-span-2"><span className="font-medium text-gray-900">Address:</span> {selectedOrder.address?.address}</p>
                    <p><span className="font-medium text-gray-900">City:</span> {selectedOrder.address?.city}</p>
                    <p><span className="font-medium text-gray-900">State:</span> {selectedOrder.address?.state}</p>
                    <p><span className="font-medium text-gray-900">Zip:</span> {selectedOrder.address?.zipCode}</p>
                  </div>
                </section>
              </div>

              <aside className="space-y-6">
                <section className="rounded-2xl border border-gray-200 p-5">
                  <div className="mb-4 flex items-center gap-2 text-gray-900">
                    <Wallet className="h-5 w-5 text-shop_light_green" />
                    <h3 className="font-semibold">Order Summary</h3>
                  </div>

                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center justify-between">
                      <span>Payment Method</span>
                      <span className="font-medium uppercase">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Status</span>
                      <span className={`font-medium ${selectedOrder.payment ? 'text-green-600' : 'text-amber-600'}`}>
                        {selectedOrder.payment ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Placed At</span>
                      <span className="font-medium">{formatDate(selectedOrder.date)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${selectedOrder.amount}</span>
                    </div>
                  </div>
                </section>

                {dialogMode === 'edit' && (
                  <section className="rounded-2xl border border-gray-200 p-5">
                    <div className="mb-4 flex items-center gap-2 text-gray-900">
                      <Truck className="h-5 w-5 text-shop_light_green" />
                      <h3 className="font-semibold">Update Status</h3>
                    </div>

                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Change order status
                    </label>

                    <select
                      value={statusValue}
                      onChange={(e) => setStatusValue(e.target.value)}
                      className="cursor-pointer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-shop_light_green"
                    >
                      {orderStatusOptions.map((option) => (
                        <option key={option} value={option} className={`cursor-pointer ${
                          option === 'Order Delivered' ? 'bg-green-600/30' :
                          option === 'Order Cancelled' ? 'bg-red-600/30' : ''
                        }`}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => updateOrderStatus(selectedOrder._id, statusValue)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-shop_light_green px-4 py-3 font-medium text-white transition hover:opacity-90"
                    >
                      <ChevronDown className="h-4 w-4 rotate-180" />
                      Save Status
                    </button>
                  </section>
                )}
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order