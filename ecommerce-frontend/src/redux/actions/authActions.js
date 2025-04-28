import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Login failed', error);
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Signup failed', error);
  }
};
