import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import error from "../../assets/error.svg";


export function Error(){
  const navigate = useNavigate();

  return (
    <div className="error-container flex-center">
      <h1>Page not Found! Checkout our other {" "}
        <span className="product-redirect"
          onClick={() => navigate("/product") }
        >Products</span>
      </h1>
      <img className="error-illustration" src={error} alt="" />
      <a href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>
  );
}