import React, { useState, useEffect } from "react";
import { useData } from "../../context";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { CartPrice } from "./component/CartPrice";
import { CartProduct } from "./component/CartProduct";
import { CouponModal } from "./component/CouponModal";

export function Cart() {
  const { cart, changeTitle } = useData();
  const ifCartHasItems = cart.length > 0;
  const [couponModal, setCouponModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => changeTitle("My Cart"), []);

  return (
   <div className="cart-container">
    <div className="cart-main-container flex-center">
      <h2>My Cart {ifCartHasItems && ` (${cart.length})`}</h2>
      <div className="cart-manage">
        <div className="cart-manage-item">
          <div className="horizontal-container">
          {ifCartHasItems? (cart.map((product) => <CartProduct key={product.id} product={product} />)) : (<h2>Cart is empty! Add {" "}
        <span className="product-redirect"
          onClick={() => navigate("/product") }
        >products</span>{" "}now.
      </h2>)}
          </div>
        </div>
        {ifCartHasItems && <CartPrice setCouponModal={setCouponModal} />}
      </div>
      {couponModal && <CouponModal setCouponModal={setCouponModal} />}
    </div>
   </div>
  );
}
