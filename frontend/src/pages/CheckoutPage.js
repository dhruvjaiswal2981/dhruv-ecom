import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const { cart, cartTotal, loading: cartLoading, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!cartLoading && cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, cartLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const fullAddress = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}, ${shippingAddress.country}`;
      
      const orderData = {
        shippingAddress: fullAddress,
        paymentMethod
      };
      
      await createOrder(orderData);
      await clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartLoading || authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Checkout</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <CheckoutForm
              user={user}
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
          
          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <OrderSummary cart={cart} cartTotal={cartTotal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;