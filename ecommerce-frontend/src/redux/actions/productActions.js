import axios from "axios";

// Fetch products action
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/products'); // Assuming backend API for fetching products
    dispatch({
      type: 'SET_PRODUCTS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

// Add new product action
export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data', // For image file support
      },
    });
    dispatch({
      type: 'ADD_PRODUCT',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding product', error);
  }
};
