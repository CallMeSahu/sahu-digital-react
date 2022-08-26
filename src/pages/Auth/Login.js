import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import { useAuth, useData } from '../../context';

export function Login(){

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
      });
      const navigate = useNavigate();
      const { token, loginUser } = useAuth();
      const { setLoader, changeTitle } = useData();
      const location = useLocation();
    
      useEffect(() => {
        (async () => {
          loginUser(loginForm.email, loginForm.password);
        })();
      }, [loginForm.email, loginForm.password]);
    
      useEffect(() => changeTitle("Sign In"), []);
      if (token) {
        setLoader(true);
        setTimeout(() => {
          navigate(location?.state?.from || "/product", { replace: true });
          setLoader(false);
        }, 500);
      }
    
      function loginHandler() {
        setLoginForm((form) => ({
          ...form,
          email: "test@gmail.com",
          password: "admin",
        }));
      }
    return (
        <div className='auth-container flex-center'>
            <div className='auth-main-container flex-center'>
                <div className="auth-title">
                    <h2 className="text-center">Login</h2>
                </div>
                <div className="auth-main">
                    <div className="auth-email">
                        <label htmlFor="mail">E-Mail Address</label>
                        <input 
                        type="text" 
                        placeholder="test@gmail.com" 
                        className="input input-text" 
                        value={loginForm.email}
                        onChange={(e) => setLoginForm((form) => ({ ...form, email: e.target.value }))}
                        required
                        ></input>
                    </div>

                    <div className="auth-pwd">
                        <label htmlFor="pwd">Password</label>
                        <input 
                        type="password" 
                        placeholder="*****" 
                        className="input input-password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((form) => ({ ...form, password: e.target.value }))}
                        required
                        ></input>                        
                    </div>

                    <div className="btn primary-btn text-center"
                        onClick={() => loginHandler()}
                    >
                        <span className="btn link-btn">Login with Test Credentials</span>
                    </div>

                    <Link to="/signup">
                        <div className="auth-secondary-btn text-center">
                            Create an Account <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

