import React, { useEffect, useState } from "react";
import { useData } from "../../context";
import { CheckoutPrice } from "./CheckoutPrice";
import "./Checkout.css";
import { useOrder } from "../../context/order/orderContext";
import { ACTION_TYPE, popper } from "../../utils";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const { address, cart, changeTitle } = useData();
  const { dispatch, orderAddress } = useOrder();
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();

  const placedHandler = () => {
    popper();
    setTimeout(() => {
      navigate("/order_summary");
    }, 1500);
  };
  useEffect(() => {
    cart.length === 0 && navigate("/product");
    changeTitle("Checkout");
  }, []);
  
  return (
    <>
      <div className="checkout-container">
       {msg ? (
          <h1 className="checkout-main-container flex-center  text-center">
            🥂 You order has successfully placed !{placedHandler()}
          </h1>
        ) : (
          <div className="checkout-main-container flex-center">
          <h2>Checkout Order</h2>
          <div className="checkout-manage">
            <div className="checkout-manage-item">
              {address &&
                  address.map(({ _id, name, street, city, state, country, zipCode, mobile }) => (
                    <div key={_id} className="address-checkout-container ">
                      <label className="select-address select-input">
                        <input
                          type="radio"
                          name="radio"
                          className="radio-input-address"
                          checked={orderAddress._id === _id}
                          onChange={() =>
                            dispatch({
                              type: ACTION_TYPE.ORDER_ADDRESS,
                              payload: {
                                _id,
                                name,
                                street,
                                city,
                                state,
                                country,
                                zipCode,
                                mobile,
                              },
                            })
                          }
                        />
                        <h4>{name}</h4>
                      </label>
                      <div className="address-details-checkout">
                        <p>
                          {street}, 
                        </p>
                        <p>
                          {city}, {state} - {zipCode}
                        </p>
                        <p>{country}.</p>
                        <p>Mobile Number : {mobile}</p>
                      </div>
                    </div>
                  ))}
            </div>
            <CheckoutPrice setMsg={setMsg} />
          </div>
        </div>
        )} 
      </div>
    </>
  );
}
