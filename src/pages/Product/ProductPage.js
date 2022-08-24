import React, { useState, useEffect } from 'react';
import "./ProductPage.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useData } from '../../context';
import { addToCart, addToWishlist } from '../../services';
import { isProductInCart, isProductInWishlist } from '../../utils/cartUtils';
import { toast } from "react-toastify";

export function ProductPage(){

    const { productId } = useParams();
    const navigate = useNavigate();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnWishlistDisabled, setWishlistBtnDisabled] = useState(false);
    const { token } = useAuth();
    const { products, cart, dataDispatch, wishlist, setLoader, changeTitle } = useData();
    const product = products?.find((product) => {
        return product.id === productId;
    });

    const isInCart = isProductInCart(cart, product?._id);
    const isInWishlist = isProductInWishlist(wishlist, product?._id);

    const addToCartHandler = () => {
        token
          ? isInCart
            ? navigate("/cart")
            : addToCart(dataDispatch, product, token, toast, setBtnDisabled)
          : navigate("/login");
    };

    const addToWishlistHandler = () => {
        token
          ? isInWishlist
            ? navigate("/wishlist")
            : addToWishlist(dataDispatch, product, token, toast, setWishlistBtnDisabled)
          : navigate("/login");
    };

    useEffect(() => changeTitle(product?.name), []);

    if(product.length === 0){
        setLoader(() => true);
    }
    else{
        setLoader(() => false);
    }    

    return(
        <div className='single-card-container flex-center'>
            <div className="single-card flex-center">
                <div className="single-card-left">
                    <img className='single-card-img' src={product?.img} alt="" />
                    { product?.isBestSeller && <span className="card-badge">Best Seller</span> }
                </div>

                <div className="single-card-right">

                    <h3 className="single-card-title-header">{product?.name}</h3>
                    <p className="card-description">{product?.brand}</p>

                    <div className="star-rating">
                        {product?.rating}
                        <i className='fa fa-star'></i>
                    </div>

                    <div className="price">
                        <p className="discount-price">₹{product?.price}</p>
                        <p className="actual-price">₹{product?.originalPrice}</p>
                        <p className="discount-percent">({product.percentageOff}% OFF)</p>
                    </div>

                    <div className="other-info">
                    <h4><i className="fa fa-tag" aria-hidden="true"></i> Fastest Delivery</h4>
                    <h4><i className="fa fa-tag" aria-hidden="true"></i> COD Available</h4>
                    <h4><i className="fa fa-tag" aria-hidden="true"></i> Price Inclusive of All Taxes</h4>
                    
                </div>

                    <button
                        className='btn default cart-add'
                        onClick={() => addToCartHandler()}
                        disabled={btnDisabled}
                    >
                      {isInCart ? "Go to Cart" : "Add to Cart"}      
                    </button>

                    <button className='btn outlined-default wishlist-add'
                        onClick={() => addToWishlistHandler()}
                        disabled={btnWishlistDisabled}
                    >
                        {isInWishlist? "Go to Wishlist" : "Add to Wishlist"}
                    </button>
                </div>
            </div>
        </div>
    )
}