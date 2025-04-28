import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Find the Best Deals on Trendy Products</h1>
          <p>Shop from a wide range of categories at unbeatable prices!</p>
          <button className="shop-now">Shop Now</button>
        </div>
      </section>

      {/* Category Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          <div className="category">👕 Fashion</div>
          <div className="category">💻 Electronics</div>
          <div className="category">🏡 Home & Living</div>
          <div className="category">🎮 Gaming</div>
          <div className="category">📚 Books</div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="product-section">
        <h2>Featured Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
