import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Dhruv E-Com</Link>
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart <FaShoppingCart />
        </Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/login">
          Login <FaUser />
        </Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Header;
