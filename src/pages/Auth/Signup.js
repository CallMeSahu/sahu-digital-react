import React, { useState, useEffect } from 'react';
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useData } from '../../context';

export function Signup() {

    const signUpFields = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    };

    const [signUpForm, setSignUpForm] = useState(signUpFields);
    const { token, signUpUser } = useAuth();
    const { setLoader, changeTitle } = useData();
    const navigate = useNavigate();

    const signUpHandler = () => {
        const { email, password, firstName, lastName } = signUpForm;
        if (email && password && firstName && lastName !== "") {
          (async () => {
            signUpUser(email, password, firstName, lastName);
          })();
        }
    };

    const fillFormValue = (event, fieldName) => {
        const { value } = event.target;
        setSignUpForm((prev) => ({ ...prev, [fieldName]: value }));
    };

    if (token) {
        setLoader(() => true);
        setTimeout(() => {
          navigate("/product");
          setLoader(false);
        }, 500);
    }

    useEffect(() => changeTitle("Sign Up"), []);

    return (
        <div className="auth-container flex-center">
            <div className="auth-main-container flex-center">
                <div className="auth-title">
                    <h2 className="text-center">Sign Up</h2>
                </div>

                <div className="auth-main">
                    <div className="first-last-wrapper">
                        <div className="auth-firstname">
                            <label htmlFor="firstname">First Name</label>
                            <input 
                            type="text" 
                            placeholder="Test" 
                            className="text-input"
                            value={signUpForm.firstName}
                            onChange={(e) => fillFormValue(e, "firstName")}
                            required
                            >
                            </input>
                        </div>
                        <div className="auth-lastname">
                            <label htmlFor="lastname">Last Name</label>
                            <input 
                            type="text" 
                            placeholder="Test" 
                            className="text-input"
                            value={signUpForm.lastName}
                            onChange={(e) => fillFormValue(e, "lastName")}
                            required
                            >
                            </input>
                        </div>
                    </div>    

                    <div className="auth-email">
                            <label htmlFor="email">E-Mail Address</label>
                            <input 
                            type="text" 
                            placeholder="test@gmail.com" 
                            className="input input-text" 
                            value={signUpForm.email}
                            onChange={(e) => fillFormValue(e, "email")}
                            required
                            ></input>
                        </div>
                        <div className="auth-pwd">
                            <label htmlFor="pwd">Password</label>
                            <input 
                            type="password" 
                            placeholder="*****" 
                            className="input input-password"
                            value={signUpForm.password}
                            onChange={(e) => fillFormValue(e, "password")}
                            required
                            ></input>
                        </div>
                        <div className="btn primary-btn text-center"
                            onClick={() => signUpHandler()}
                        >
                            <span className='btn link-btn'>Create New Account</span>
                        </div>
                        <Link to="/login">
                            <div className="auth-secondary-btn text-center">
                            Already Have an Account
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </div>
                        </Link>   
                    
                </div>
            </div>
        </div>
    )
}