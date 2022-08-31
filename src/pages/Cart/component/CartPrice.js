import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context";
import { useOrder } from "../../../context/order/orderContext";
import { ACTION_TYPE, getPriceDetails } from "../../../utils";

export function CartPrice({ setCouponModal }) {
  const { cart, address } = useData();
  const { couponValue, setCouponValue, dispatch } = useOrder();
  const navigate = useNavigate();

  const { price, discount } = getPriceDetails(cart);
  const coupon = price
    ? Math.abs((parseFloat(price - discount) / 100) * parseFloat(couponValue.value))
    : 0;
  const totalAmt = parseFloat(price - discount - coupon).toFixed(2);
  const totalDiscount = parseFloat(discount + coupon).toFixed(2);  

  const checkoutHandler = () => {
    dispatch({
      type: ACTION_TYPE.PRICE_DETAILS,
      payload: { price, discount, coupon, totalAmt, totalDiscount },
    });
    dispatch({
      type: ACTION_TYPE.ORDER_ADDRESS,
      payload: address[0],
    });
    navigate("/checkout");
  };

  return (
    <div className="price-detail">
      <ul className="coupons">
        <p className="apply-coupon-btn" onClick={() => setCouponModal(true)} >
          <i className="fa fa-tag" araia-hidden="true"></i>
          {" "}Apply Coupons
        </p>
      </ul>

      <h4 className="text-center">Price Details</h4>
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
            <p onClick={() => setCouponValue({ couponName: "", value: 0 })}
            ><button className="btn outlined-danger disc-btn">Remove</button></p>
          </li>
          )}
        </ul>
      </div>

      <ul className="price-totalAmt">
        <h4>Cart Amount</h4>
        <h4>₹{totalAmt}</h4>
      </ul>

      <p className="save-msg">You saved ₹ {totalDiscount} on this order!</p>
      <div className="text-center" 
        onClick={() => checkoutHandler()}
      ><button class="checkout-btn btn link-btn">Place Order</button></div>
      <div className="text-center" 
        onClick={() => navigate("/product")}
      ><button class="checkout-btn btn outlined-default">Continue Shopping</button></div>
    </div>
  );
}
