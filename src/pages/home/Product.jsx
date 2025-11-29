import axios from "axios";
import { useState } from "react";
export default function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = async () => {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
      });
      await loadCart();
    };

    const selectQuantity = (event) => {
      const itemQuantiy = Number(event.target.value);
      setQuantity(itemQuantiy);
    };
    return (
      <>
        <div className="product-container" key={product.id}>
          <div className="product-image-container">
            <img className="product-image" src={product.image} />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

          <div className="product-rating-container">
            <img
              className="product-rating-stars"
              src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
            />
            <div className="product-rating-count link-primary">
              {product.rating.count}
            </div>
          </div>

          <div className="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div className="product-quantity-container">
                    <select value={quantity} onChange={selectQuantity}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="product-spacer"></div>

          <div className="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button
            className="add-to-cart-button button-primary"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </>
    );
}