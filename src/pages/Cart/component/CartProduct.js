import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../../context";
import { toast } from "react-toastify";
import { calcPercentage, isProductInWishlist } from "../../../utils/cartUtils";
import { addToWishlist, removeFromCart, updateQtyFromCart } from "../../../services";


export function CartProduct({ product }) {
  const { dataDispatch, wishlist } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = isProductInWishlist(wishlist, product._id);

  const cartClickHandler = (type) => updateQtyFromCart(product._id, dataDispatch, token, type);

  const moveToWishlistHandler = () => {
    addToWishlist(dataDispatch, product, token, toast);
    removeFromCart(product._id, dataDispatch, token, toast);
  };

  return (
    <div className="card horizontal-container">
        <div className="card horizontal-container">
            <div className="card-horizontal">
                <img className="card-image horizontal-image" src={product.img} alt={product.name}/> 
                <div className="card-info">
                    <div className="card-title">
                        <div>
                            <h3>{product.name}</h3>
                            <p className="card-description">{product.brand}</p>
                        </div>
                    </div>
                    <div className="price">
                        <p className="discount-price">₹{product.price}</p>
                        <p className="actual-price">₹{product.originalPrice}</p>
                        <p className="discount-percent">({product.percentageOff}% OFF)</p>
                    </div>
                    <div className="quantity">
                        <button className="minus"
                            onClick={() => product.qty > 1 && cartClickHandler("DEC_QTY")}
                            disabled={product.qty > 1 ? false : true}
                        >-</button>
                        <span className="quantity-count">{product.qty}</span>
                        <button className="plus"
                            onClick={() => cartClickHandler("INC_QTY")}
                        >+</button>
                    </div>
                </div>
            </div>
            <div className="horizontal-btn">
                <button className="remove-btn" 
                    onClick={() => {
                    removeFromCart(product._id, dataDispatch, token, toast);}}
                >REMOVE</button>
                <button className="wishlist-btn"
                   onClick={() => (isInWishlist ? navigate("/wishlist") : moveToWishlistHandler())} 
                >MOVE TO WISHLIST</button>
            </div>
        </div>                       
    </div>
  );
}
