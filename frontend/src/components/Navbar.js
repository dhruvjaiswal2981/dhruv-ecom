import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, UserIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                PrintMine
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-md' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-md' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Products
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-400 text-xs font-bold text-indigo-800">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                    aria-label="User profile"
                  >
                    <UserIcon className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                    aria-label="Logout"
                  >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                  </button>
                </div>
                <span className="hidden lg:inline-block text-sm font-medium text-white/90">
                  Hi, {user.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-1 p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Login"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                <span className="hidden lg:inline-block text-sm font-medium">
                  Login
                </span>
              </Link>
            )}
            
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;