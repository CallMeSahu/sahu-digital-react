/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { ACTION_TYPE } from "../../utils";
import "./Navbar.css";
import mainLogo from "../../assets/main-logo.png"



export default function Navbar(){
    const { token } = useAuth();
    const { cart, wishlist, dataDispatch, setLoader, drawer, setDrawer} = useData();
    const navigate = useNavigate();
    let timer = useRef();
    const [input, setInput] = useState("");

    useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          dataDispatch({
            type: ACTION_TYPE.SEARCH,
            payload: input,
          });
          setLoader(true);
          setTimeout(() => setLoader(false), 500);
          if (input.trim().length > 0) {
            navigate("/product");
          }
        }, 500);
      }, [input]);
    return(
        <div className="nav-header">
            <ul className="navbar">
                <div className="navbar-main">
                    <div className="navbar-left">
                        {window.location.href.includes("product") && (
                            <i
                            className="fa fa-bars drawer-hamberg-btn"
                            aria-hidden="true"
                            onClick={() => setDrawer(!drawer)}
                            />
                        )}
                        <Link to="/">
                            {/* <h2>Sahu Digital</h2> */}
                            <img src={mainLogo} alt=""></img>
                        </Link>
                    </div>
                    <div className="search-container">
                    <input type="search" name="search" id="" class="search-bar" placeholder="Search product, brand & more..." 
                    onChange={(event) => setInput(event.target.value)} />
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <ul className="navbar-right">
                        <li onClick={() => navigate("/wishlist")}>
                            <div className="badge">
                                <div className="icon cart-badge">
                                    <i className="fa fa-heart-o fa-2x" title="Wishlist"></i>
                                    {wishlist && wishlist.length > 0 && (
                                        <div className="notification-icon flex-center">
                                            <span>{wishlist.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                        <li className="nav-cart" onClick={() => navigate("/cart")}>
                            <div className="badge">
                                <div className="icon cart-badge">
                                    <i className="fa fa-shopping-cart fa-2x" title="Cart"></i>
                                    {cart && cart.length > 0 && (
                                        <div className="notification-icon flex-center">
                                            <span>{cart.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>{" "}
                        <li onClick={() => navigate("/user_profile")}>
                             <div className="badge">
                                <div className="icon cart-badge">
                                <i className="fa fa-user " title={token ? "User Profile" : "Sign In"}></i>
                                </div>        
                            </div>           
                        </li>
                    </ul>
                </div>

                <div className="search-container search-mob"
                onKeyDown={(event) => setInput(event.target.value)}>
                    <input
                    type="search"
                    name="search"
                    className="search-bar"
                    placeholder="Search product, brand & more..."
                    id=""
                    /> 
                    <i className="fa fa-search" aria-hidden="true"></i>                  
                </div>
            </ul>
        </div>
    )
}