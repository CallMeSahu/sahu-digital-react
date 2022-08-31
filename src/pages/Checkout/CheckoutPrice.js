import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { useOrder } from "../../context/order/orderContext";
import { toast } from "react-toastify";
import { clearCart } from "../../services/cart/cartServices";
import { ACTION_TYPE } from "../../utils";

export function CheckoutPrice({ setMsg }) {
  const navigate = useNavigate();
  const { cart, dataDispatch, address } = useData();
  const { couponValue, priceDetails, orderAddress, dispatch, order, setOrder } = useOrder();
  const {
    user: { firstName, lastName, email },
    token,
  } = useAuth();
  const { price, discount, coupon, totalAmt } = priceDetails;

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load, check you connection");
      return;
    }

    const options = {
      key: "rzp_test_DStey0rrcXUE2r",
      amount: totalAmt*100,
      currency: "INR",
      name: "Sahu Digital",
      description: "Thank You for your Purchase!",
      image: "https://raw.githubusercontent.com/CallMeSahu/sahu-digital/dev/images/main-favicon.png",
      handler: function (response) {
        const orderData = {
          products: [...cart],
          amount: totalAmt,
          paymentId: response.razorpay_payment_id,
          delivery: orderAddress,
        };
        setOrder({ ...orderData });
        clearCart(dataDispatch, cart, token);
        dispatch({ type: ACTION_TYPE.RESET_PRICE });
        setMsg(true);
        console.log("Sahu Success");
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: email,
        contact: "8317691805",
      },
      theme: {
        color: "#1f1d1d",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const confirmOrderHandler = () => {
    if (address.length === 0) {
      toast.error("Please Add Address");
      setTimeout(() => {
        navigate("/user_profile");
      }, 1500);
    } else {
      !orderAddress.name ? toast.error("Please Select Address") : displayRazorpay();
    }
  };

  return (
    <div className="checkout-details">
      <h4 className="text-center border-header">Order Details</h4>
      <div className="ordered-items">
        <ul>
          <li>
            <h4>Items</h4>
            <h4>Qty.</h4>
          </li>
          {cart.map(({ _id, name, qty }) => (
            <li key={_id}>
              <p>{name}</p>
              <p>{qty}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <h4 className="text-center border-header">Price Details</h4>
      <div className="price-calculate">
        <ul>
          <li>
            <p>Total Price ({cart.length} items)</p>
            <p>₹ {price}</p>
          </li>
          <li>
            <p>Discount</p>
            <p>-₹ {discount}</p>
          </li>
          <li>
            <p>Delivery Charge</p>
            <p>FREE</p>
          </li>
          <li>
            <p>Coupon Discount</p>
            <p>{coupon !== 0 && "-"}₹ {coupon.toFixed(2)}</p>
          </li>
          {coupon !==0 &&(
          <li>
            <p><i className="fa fa-tag" araia-hidden="true"></i> {couponValue.couponName}</p>
          </li>
          )}
          <li>
            <h4>Total Amount</h4>
            <h4>₹{totalAmt}</h4>
          </li>
        </ul>
      </div>

      <h4 className="text-center border-header">Delivery Details</h4>
      {orderAddress.name && (
        <div className="deliver-container">
          <div>
            <h4 className="address-name">{orderAddress.name}</h4>
            <p>
              {orderAddress.street}
            </p>
            <p>
              {orderAddress.city} , {orderAddress.state} - {orderAddress.zipCode}
            </p>
            <p>
              {orderAddress.country}
            </p>
            <p>Phone Number : {orderAddress.mobile}</p>
          </div>
        </div>
      )}
      <div className="text-center" 
        onClick={() => confirmOrderHandler()}
      ><button class="checkout-btn btn link-btn">Confirm Order</button></div>
      <div className="text-center" 
        onClick={() => navigate("/cart")}
      ><button class="checkout-btn btn outlined-default">Go Back to Cart</button></div>
    </div>
  );
}
