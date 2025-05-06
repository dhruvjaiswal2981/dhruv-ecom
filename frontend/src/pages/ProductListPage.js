import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts, getProductCategories } from '../services/api';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/products/ProductCard';
import Filters from '../components/products/Filters';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
    page: parseInt(searchParams.get('page')) || 1,
    limit: 12
  });

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await getProductCategories();
        setCategories(categoriesResponse.data);
        
        // Fetch products with filters
        const params = {
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search,
          sort: filters.sort,
          page: filters.page,
          limit: filters.limit
        };
        
        const productsResponse = await getProducts(params);
        setProducts(productsResponse.data);
        setTotalCount(productsResponse.totalCount || productsResponse.data.length);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
    setSearchParams({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    setSearchParams({ ...filters, page });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {filters.category || 'Our'} Products
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {filters.category 
              ? `Browse our ${filters.category} collection` 
              : 'Discover our premium collection'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              <Filters 
                categories={categories}
                filters={filters}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white rounded-xl shadow-sm p-4">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(filters.page - 1) * filters.limit + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(filters.page * filters.limit, totalCount)}</span> of{' '}
                  <span className="font-medium">{totalCount}</span> results
                </p>
              </div>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setFilters({
                        category: '',
                        minPrice: '',
                        maxPrice: '',
                        search: '',
                        sort: '',
                        page: 1,
                        limit: 12
                      });
                      setSearchParams({});
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-4">
                  <Pagination
                    currentPage={filters.page}
                    totalItems={totalCount}
                    itemsPerPage={filters.limit}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;