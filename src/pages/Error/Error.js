import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import error from "../../assets/error.svg";


export function Error(){
  const navigate = useNavigate();

  return (
    <div className="error-container flex-center">
      <h2>Page not found! Checkout our other {" "}
        <span className="product-redirect"
          onClick={() => navigate("/product") }
        >products</span>.
      </h2>
      <img className="error-illustration" src={error} alt="" />
      <a href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>
  );
}