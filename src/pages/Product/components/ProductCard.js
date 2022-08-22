/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useData } from '../../../context';
import { addToCart, addToWishlist, removeFromWishlist } from '../../../services';
import { calcPercentage, isProductInCart, isProductInWishlist } from "../../../utils/cartUtils";
import "./ProductCard.css";
import { toast } from 'react-toastify'; 

export function ProductCard({product}){
    const { dataDispatch, cart, wishlist, drawer } = useData();
    const [btnDisabled, setBtnDisabled] = useState(false);

    const navigate = useNavigate();
    const { token } = useAuth();

    const {
        _id: id,
        img, 
        name,
        brand,
        price,
        originalPrice,
        isBestSeller,
        rating,
        percentageOff,
    } = product;

    const isInCart = isProductInCart(cart, id);
    const isInWishlist = isProductInWishlist(wishlist, id);

    const addToCartHandler = () => {
        token
        ? isInCart
          ? navigate("/cart")
          : addToCart(dataDispatch, product, token, toast, setBtnDisabled)
        : navigate("/login");    
    };

    const wishlistHandler = () => {
        token
         ? isInWishlist
           ? removeFromWishlist(id, dataDispatch, token, toast)
           : addToWishlist(dataDispatch, product, token, toast)
         : navigate("/login");  
    };

    return(
        <div className="card">
            <img className='card-image' src={img} alt={name}
            onClick={() => navigate(`/product/${product.id}`)}/>
            {isBestSeller && <span className='card-badge'>Best Seller</span>}
            <div className="card-star">
                <p>{rating}</p>
                <i className="fa fa-star"></i>        
            </div>
            <div className="card-info">
                <div className="card-title">
                    <div>
                        <h3 className='card-title-header' title={name}>{name}</h3>
                        <p className="card-description">{brand}</p>
                    </div>
                    <span
                    role="button"
                    className={`wishlist-icon ${isInWishlist ? `wishlist-toggle` : ``}`}
                    onClick={() => wishlistHandler()}
                    disabled={true}
                    >
                    <i className="fa fa-heart-o wishlist-icon" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="price">
                    <p className="discount-price">₹{price}</p>
                    <p className="actual-price">₹{originalPrice}</p>
                    <p className="discount-percent">({percentageOff}% OFF)</p>
                </div>
            </div>
            <button className="btn default add-cart"
                onClick={() => addToCartHandler()}
                disabled={btnDisabled}
            >{isInCart ? "Go to Cart" : "Add to Cart"}               
            </button>       
        </div>
    );
}