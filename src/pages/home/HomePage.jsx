import "./HomePage.css";
import Header from "../../components/Header.jsx";
import ProductGrid from "./ProductGrid.jsx";
import axios from "axios";
import { useState, useEffect } from "react"; 
function Homepage({ products, cart, loadCart}) {
  return (
    <>
      <Header cart={cart} loadCart={loadCart}/>
      <div className="home-page">
        <div className="products-grid">
          <ProductGrid products={products} cart={cart} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default Homepage;