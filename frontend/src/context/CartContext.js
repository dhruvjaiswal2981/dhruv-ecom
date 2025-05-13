import { createContext, useContext, useEffect, useState } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../services/api';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await getCart();
    
    if (response && Array.isArray(response)) {
      // Ensure each item has the proper structure
      const formattedCart = response.map(item => ({
        id: item.id,
        quantity: item.quantity,
        customization: item.customization || null,
        Product: item.Product || null // Handle cases where Product might be null
      }));
      
      setCart(formattedCart);
    } else {
      throw new Error('Invalid cart data structure');
    }
  } catch (err) {
    console.error('Cart fetch error:', err);
    setError(err.response?.data?.message || 'Failed to load cart');
    setCart([]);
  } finally {
    setLoading(false);
  }
};

  const addToCart = async (productId, quantity = 1, customization = null) => {
    try {
      setLoading(true); // Add loading state during add to cart
      const response = await apiAddToCart({ 
        productId, 
        quantity, 
        customization 
      });
      
      if (response) {
        await fetchCart(); // Wait for the cart to refresh
        toast.success('Added to cart successfully!');
        return true;
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };


  const updateCartItem = async (id, updates) => {
    try {
      await apiUpdateCartItem(id, updates);
      await fetchCart(); // Refresh the entire cart
      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Update cart error:', error);
      toast.error('Failed to update cart item');
    }
  };

  const removeFromCart = async (id) => {
    try {
      await apiRemoveFromCart(id);
      await fetchCart(); // Refresh the entire cart
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();
      setCart([]);
      toast.success('Cart cleared successfully');
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Safely calculate totals
  const cartTotal = cart.reduce((total, item) => {
    const price = item.Product?.price || 0;
    const qty = item.quantity || 1;
    return total + (price * qty);
  }, 0);

  const cartCount = cart.reduce((count, item) => {
    return count + (item.quantity || 1);
  }, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      cartTotal,
      cartCount,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);