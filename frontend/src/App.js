import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductForm from './components/admin/ProductForm';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                
                <Route path="/checkout" element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                } />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                
                <Route path="/orders" element={
                  <PrivateRoute>
                    <OrdersPage />
                  </PrivateRoute>
                } />
                
                <Route path="/orders/:id" element={
                  <PrivateRoute>
                    <OrderDetailPage />
                  </PrivateRoute>
                } />
                
                <Route path="/admin/products" element={
                  <AdminRoute>
                    <AdminProductsPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/products/new" element={
                  <AdminRoute>
                    <AdminProductForm />
                  </AdminRoute>
                } />
                
                <Route path="/admin/products/edit/:id" element={
                  <AdminRoute>
                    <AdminProductForm />
                  </AdminRoute>
                } />
                
                <Route path="/admin/orders" element={
                  <AdminRoute>
                    <AdminOrdersPage />
                  </AdminRoute>
                } />
                
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;