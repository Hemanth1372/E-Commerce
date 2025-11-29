import DeliveryOptions from "./DeliveyOptions";
import dayjs from "dayjs";
import axios from "axios";
export default function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }
              );
              
              const deleteCartItems = async () => {
                  await axios.delete(`/api/cart-items/${cartItem.productId}`);
                  await loadCart();
              };
            return (
              <div className="cart-item-container">
                <div className="delivery-date">
                  Delivery date:{" "}
                  {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D"
                  )}
                </div>

                <div className="cart-item-details-grid">
                  <img className="product-image" src={cartItem.product.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>
                    <div className="product-price">
                      ${(cartItem.product.priceCents / 100).toFixed(2)}
                    </div>
                    <div className="product-quantity">
                      <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>
                        <span className="update-quantity-link link-primary">
                        Update
                      </span>
                        <span className="delete-quantity-link link-primary" onClick={deleteCartItems}>
                        Delete
                      </span>
                    </div>
                  </div>

                  <div className="delivery-options">
                    <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} /> 
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
