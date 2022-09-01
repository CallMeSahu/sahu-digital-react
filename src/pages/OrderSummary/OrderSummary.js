import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context";
import { useOrder } from "../../context/order/orderContext";
import "./OrderSummary.css";
export function OrderSummary() {
  const {
    order: { amount, paymentId, delivery, products },
  } = useOrder();

  const navigate = useNavigate();
  const { changeTitle } = useData();
  useEffect(() => changeTitle("Order Summary"), []);
  return (
    <div className="summary-wrapper flex-center">
      {paymentId ? (
        <>
          <h1>🥳 Your Order has been Placed! 🥳 </h1>
          <div className="summary-container">
            <div className="summary-main">
              <div className="summary-left">
                <h4>
                  Payment Id : <span>{paymentId}</span>
                </h4>
                <h4>
                  Total Amount : <span>₹{amount}</span>
                </h4>
                <h4>Delivery Address</h4>
                <div className="delivery-add">                
                  <p>{delivery.name}</p>

                  <p className="paragraph-sm">
                    {delivery.street}, 
                  </p>
                  <p className="paragraph-sm">
                    {delivery.city}, {delivery.state} - {delivery.zipCode}
                  </p>
                  <p className="paragraph-sm">
                    {delivery.country}
                  </p>
                  <p className="paragraph-sm">Mobile Number : {delivery.mobile}</p>
                </div>
                <div className="countinue-btn flex-center" 
                onClick={() => navigate("/product")}
                ><button class="btn link-btn">Continue Shopping</button></div>
              </div>
              <div className="summary-right">
                {products.map(({ img, name, author, price, qty }) => (
                  <div className="card horizontal-container">
                    <div className="card-horizontal">
                      <img className="card-img horizontal-img" src={img} alt={name} />
                      <div className="card-info">
                        <div className="card-title">
                          <div>
                            <h4>{name}</h4>
                            <p className="card-description">{author}</p>
                          </div>
                        </div>
                        <div className="price">
                          <p>Total Quantity : {qty}</p>
                          <p>Price : ₹{price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Nothing was ordered! Checkout our {" "}
        <span className="product-redirect"
          onClick={() => navigate("/product") }
        >products</span>{" "}now.
      </h2>
        </>
      )}
    </div>
  );
}


