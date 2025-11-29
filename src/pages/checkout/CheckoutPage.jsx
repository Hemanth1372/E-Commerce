import "./CheckoutPage.css";
import "./checkout-header.css";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

function CheckoutPage({ cart , products, loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);
  useEffect(() => {
    const checkoutPage = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime "
      );
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    }

    checkoutPage();
  }, [cart]);

    return (
      <>
        <title>Checkout Page</title>
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <a href="/">
                <img className="logo" src="images/logo.png" />
                <img className="mobile-logo" src="images/mobile-logo.png" />
              </a>
            </div>

            <div className="checkout-header-middle-section">
              Checkout (
              <a className="return-to-home-link" href="/">
                {paymentSummary.totalItems} items
              </a>
              )
            </div>

            <div className="checkout-header-right-section">
              <img src="images/icons/checkout-lock-icon.png" />
            </div>
          </div>
        </div>

        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />

            <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
          </div>
        </div>
      </>
    );
}

export default CheckoutPage;