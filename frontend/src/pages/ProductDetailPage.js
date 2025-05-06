import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductImageGallery from '../components/products/ProductImageGallery';
import ProductInfo from '../components/products/ProductInfo';
import CustomizationPanel from '../components/products/CustomizationPanel';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({
    text: '',
    color: '#000000',
    font: 'Arial'
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    const customData = product.customizable ? customization : null;
    addToCart(product.id, quantity, customData);
    toast.success('Added to cart!');
  };

  if (loading || !product) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mb-8 lg:mb-0">
            <ProductImageGallery product={product} />
          </div>
          
          <div>
            <ProductInfo 
              product={product} 
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
            />
            
            {product.customizable && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customize Your Product</h3>
                <CustomizationPanel 
                  customization={customization}
                  onChange={setCustomization}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
          <div className="mt-4 prose prose-sm text-gray-500" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;