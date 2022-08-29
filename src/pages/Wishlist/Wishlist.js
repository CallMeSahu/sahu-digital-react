import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context";
import WishlistCard from "./component/WishlistCard";
import "./Wishlist.css";

export function Wishlist(){
  const { wishlist, cart, dataDispatch, changeTitle } = useData();
  const isWishlistHasItem = wishlist.length > 0;
  const navigate = useNavigate();

  useEffect(() => changeTitle("My Wishlist", []));

  return(
    <div className="wishlist-container">
      <div className="wishlist-main-container flex-center">
        <h2>My Wishlist {isWishlistHasItem && `(${wishlist.length})`}</h2>
        {isWishlistHasItem ? (
          <div className="wishlist-manage">
            <div className="wishlist">
              {wishlist.map((product) => (
                <WishlistCard
                  key={product._id}
                  product={product}
                  cart={cart}
                  dataDispatch={dataDispatch}
                />
              ))}
            </div>
          </div>
        ) : (
          <h2>Wishlist is empty! Explore {" "}
        <span className="product-redirect"
          onClick={() => navigate("/product") }
        >products</span>{" "}now.
      </h2>
        )}
      </div>
    </div>
  );
}