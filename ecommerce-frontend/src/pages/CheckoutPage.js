import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CheckoutPage.css"; // Importing CSS for styles

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handleCheckout = () => {
    // Proceed to payment or order submission
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1>Checkout</h1>
        <div className="shipping-details">
          <h2>Shipping Details</h2>
          <input
            type="text"
            name="name"
            value={shippingDetails.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="input-field"
          />
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            value={shippingDetails.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="input-field"
          />
        </div>

        <div className="payment-method">
          <h2>Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="select-field"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span> - <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <p>
            Total: <strong>${cartItems.reduce((acc, item) => acc + item.price, 0)}</strong>
          </p>
        </div>

        <button onClick={handleCheckout} className="checkout-btn">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
