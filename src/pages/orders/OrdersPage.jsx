import "./OrdersPage.css"
import Header from "../../components/Header";
import axios from "axios";  
import { useState, useEffect } from "react";
import dayjs from "dayjs";
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orderItems = async () => {
      let response = await axios.get("/api/orders?expand=products");
      console.log(response.data);
      setOrders(response.data);
    }
    orderItems();
  }, []);
    return (
      <>
        <title>Orders</title>
        <Header />
        <div className="orders-page">
          <div className="page-title">Your Orders</div>

          <div className="orders-grid">
            {orders.map((order) => {
              return (
                <div className="order-container">
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>
                          {dayjs(order.orderTimeMs).format("dddd, MMMM D")}
                        </div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>

                  <div className="order-details-grid"> 
                    {
                      order.products.map((product) => {
                      return (
                        <>
                          <div className="product-image-container">
                            <img src={product.product.image} />
                          </div>
                          <div className="product-details">
                            <div className="product-name">{product.product.name}</div>
                            <div className="product-delivery-date">
                              Arriving on:{" "}
                              {dayjs(product.estimatedDeliveryTimeMs).format(
                                "dddd, MMMM D"
                              )}
                            </div>
                            <div className="product-quantity">
                              Quantity: {product.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img
                                className="buy-again-icon"
                                src="images/icons/buy-again.png"
                              />
                              <span className="buy-again-message">
                                Add to Cart
                              </span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a href="/tracking">
                              <button className="track-package-button button-secondary">
                                Track package
                              </button>
                            </a>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
}

export default OrdersPage;

