import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CartItem from '../components/cart/CartItem';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useEffect } from 'react';

const CartPage = () => {
  const { 
    cart, 
    cartTotal, 
    cartCount, 
    loading, 
    error,
    removeFromCart, 
    updateCartItem, 
    clearCart,
    fetchCart // Make sure this is available from your context
  } = useCart();
  
  const navigate = useNavigate();

  // Add this useEffect to log cart data for debugging
  useEffect(() => {
    console.log('Current cart:', cart);
    console.log('Cart count:', cartCount);
    console.log('Loading state:', loading);
  }, [cart, cartCount, loading]);

  const handleCheckout = () => {
    if (cartCount === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  // Show error message if there's an error
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-lg font-medium text-red-600">Error loading cart</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={fetchCart}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
        
        {cartCount === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-500">
              Start shopping to add items to your cart.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => {
                    // Add null check for item.Product
                    if (!item.Product) {
                      console.warn('Cart item missing Product data:', item);
                      return null;
                    }
                    
                    return (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={() => removeFromCart(item.id)}
                        onUpdate={(updates) => updateCartItem(item.id, updates)}
                      />
                    );
                  })}
                </ul>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Clear cart
                </button>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Checkout
                  </button>
                </div>
                
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{' '}
                    <Link
                      to="/products"
                      className="text-primary-600 font-medium hover:text-primary-500"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;