import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/api';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AdminProductCard from '../../components/admin/AdminProductCard';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your product inventory and listings
        </p>
      </div>
      <Link
        to="/admin/products/new"
        className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add New Product
      </Link>
    </div>

    {/* Products Table */}
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="col-span-5 md:col-span-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Product</span>
        </div>
        <div className="col-span-3 md:col-span-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Price</span>
        </div>
        <div className="col-span-2 text-center hidden md:block">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</span>
        </div>
        <div className="col-span-4 md:col-span-2 text-right">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</span>
        </div>
      </div>

      {/* Products List */}
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <AdminProductCard 
            key={product.id} 
            product={product} 
            onDelete={handleDelete} 
          />
        ))}
      </ul>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
          <div className="mt-6">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </Link>
          </div>
        </div>
      )}
    </div>

    {/* Pagination would go here */}
  </div>
</div>
  );
};

export default AdminProductsPage;