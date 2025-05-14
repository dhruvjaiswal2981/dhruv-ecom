import { useState, useEffect } from 'react';
import { getUserOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OrderCard from '../components/orders/OrderCard';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...'); // Debug log
      const response = await getUserOrders();
      console.log('Orders response:', response); // Debug log
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error); // Debug log
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet.
            </p>
            <div className="mt-6">
              <a
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Start Shopping
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;