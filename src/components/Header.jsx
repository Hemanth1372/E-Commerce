import { Link } from "react-router";
import "./Header.css";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Header({ cart , loadCart}) {
  const [paymentSummary, setPaymentSummary] = useState([]);
  useEffect(() => {
    const paymentData = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
      await loadCart();
    } 
    paymentData();
  }, [cart]);


    return (
      <>
        <div className="header">
          <div className="left-section">
            <Link to="/" className="header-link">
              <img className="logo" src="images/logo-white.png" />
              <img className="mobile-logo" src="images/mobile-logo-white.png" />
            </Link>
          </div>

          <div className="middle-section">
            <input className="search-bar" type="text" placeholder="Search" />

            <button className="search-button">
              <img className="search-icon" src="images/icons/search-icon.png" />
            </button>
          </div>

          <div className="right-section">
            <Link className="orders-link header-link" to="/orders">
              <span className="orders-text">Orders</span>
            </Link>

            <Link className="cart-link header-link" to="/checkout">
              <img className="cart-icon" src="images/icons/cart-icon.png" />
              <div className="cart-quantity">{paymentSummary.totalItems }</div>
              <div className="cart-text">Cart</div>
            </Link>
          </div>
        </div>
      </>
    );
}