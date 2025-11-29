import Homepage from './pages/home/HomePage'
import { Routes, Route } from 'react-router';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import TrackingPage from './pages/tracking/TrackingPage';
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const loadCart = async () => {
    let response = await axios.get("/api/products");
    setProducts(response.data);
    response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<Homepage products={products} cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App;
