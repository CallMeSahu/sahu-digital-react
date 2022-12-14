import React from "react";
import { useState } from "react";
import { useOrder } from "../../../context/order/orderContext";
import "./CouponModal.css";

const COUPONS = [
  { couponName: "FREEDOM_SALE", value: 35 },
  { couponName: "DIWALI_SALE", value: 25 },
];

export function CouponModal({ setCouponModal }) {
  const { couponValue, setCouponValue } = useOrder();
  const [input, setInput] = useState(couponValue);

  return (
    <div className="modal-wrapper flex-center">
      <div className="modal">
        <div className="modal-header">
          <h3>Apply Coupon</h3>
          <i className="fa fa-times" aria-hidden="true" onClick={() => setCouponModal(false)} />
        </div>

        <div className="modal-main">
          {COUPONS.map(({ couponName, value }) => (
            <div className="coupon-option" key={couponName}>
              <label className="select-input">
                <input
                  type="radio"
                  name="radio"
                  className="radio-input"
                  onChange={() =>
                    setInput({
                      ...couponValue,
                      value: value,
                      couponName: couponName,
                    })
                  }
                  checked={value === input.value ? true : false}
                />
                <span className="text">
                  {" "}{value}% OFF:{" "}{couponName}
                </span>
              </label>
            </div>
          ))}
        </div>
        <button
          className="btn link-btn "
          onClick={() => {
            setCouponModal(false);
            setCouponValue(input);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
