import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, addProduct } from '../redux/actions/productActions';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products); // Get products from the store
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    dispatch(getProducts()); // Fetch products on component mount
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0], // Set image file
    });
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('description', newProduct.description);
    formData.append('image', newProduct.image);

    await dispatch(addProduct(formData)); // Dispatch the action to add the product
    alert('New product added!');
    setNewProduct({ name: '', price: '', category: '', description: '', image: null }); // Reset form after adding
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name} - ${product.price}</h3>
                <p>{product.category}</p>
              </li>
            ))
          ) : (
            <p>No products available</p>
          )}
        </ul>
      </div>

      <div className="add-product">
        <h2>Add New Product</h2>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
        />
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          placeholder="Product Category"
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
