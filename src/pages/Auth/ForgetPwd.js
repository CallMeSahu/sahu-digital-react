/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useData } from "../../context";
import "./Auth.css";

export function ForgetPwd() {
    const { changeTitle } = useData();

    useEffect(() => changeTitle("Forget Password"), []);

    return (
        <div className="auth-container flex-center">
            <div className="auth-main-container flex-center">
                <div className="auth-title">
                    <h2 className="text-center">Forgot Password</h2>
                </div>
                <div className="auth-main">
                    <div className="auth-email">
                        <label htmlFor="mail">E-Mail Address</label>
                        <input 
                        type="text" 
                        placeholder="test@gmail.com" 
                        className="input input-text"
                        ></input>
                    </div>
                    <div className="btn primary-btn text-center">
                        <a href="#" target="_blank" className="btn link-btn">Reset Password</a>
                    </div>
                    <div className="auth-secondary-btn text-center">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        <a href="./login.html">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}