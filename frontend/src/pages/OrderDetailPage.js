import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OrderDetails from '../components/orders/OrderDetails';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (loading || !order) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
          Order #{order.id}
        </h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8">
            <OrderDetails order={order} />
          </div>
          
          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {order.status}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {order.paymentMethod}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {order.paymentStatus}
                  </p>
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <address className="not-italic text-sm text-gray-700">
                {order.shippingAddress}
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;