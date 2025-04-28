import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const ProductListPage = () => {
  const dispatch = useDispatch();

  // Dummy product data
  const products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7BN1iuwwV167pwBZ7oUXxigIqDRooFw68X0ON7DScvjKjvOCL7bGceaxOfN8W0abxJO92nIR974p6ySl-c6M6FwzqHuA0JsfwRuSQKtgq9j84_yfcqkIKqw' },
    { id: 2, name: 'T-Shirt', price: 19.99, category: 'Clothing', imageUrl: 'https://img.freepik.com/premium-psd/t-shirt-front-back_303714-1883.jpg' },
    { id: 3, name: 'Sofa', price: 299, category: 'Home', imageUrl: 'https://mysleepyhead.com/media/catalog/product/4/t/4thaug_2ndhalf5934_green.jpg' },
    { id: 4, name: 'Smartphone', price: 799, category: 'Electronics', imageUrl: 'https://www.trustedreviews.com/wp-content/uploads/sites/54/2024/11/Best-smartphone-2024-920x518.jpg'},
    { id: 5, name: 'Jacket', price: 49.99, category: 'Clothing', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25JE2B6b5g86bIq2AHaQz6AQ_AqYa3t25UQ&s' },
    { id: 6, name: 'Dining Table', price: 150, category: 'Home', imageUrl: 'https://rukminim3.flixcart.com/image/850/1000/k47cgi80/dining-set/f/g/k/8-seater-brown-rosewood-sheesham-hhfk-17-hariom-handicraft-original-imafn66rskcnv96g.jpeg?q=90&crop=false' },
  ];

  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    // Normally you would dispatch a getProducts action, but for now, we use the dummy data
    dispatch({ type: 'GET_PRODUCTS', payload: products });
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
  };

  const filteredProducts = products.filter((product) =>
    categoryFilter ? product.category === categoryFilter : true
  );

  return (
    <div className="product-list-page">
      <FilterSidebar categories={['Electronics', 'Clothing', 'Home']} onCategorySelect={handleCategorySelect} />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
