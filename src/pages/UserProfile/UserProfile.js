import { toast } from "react-toastify";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth, useData } from "../../context";
import { removeFromAddress } from "../../services";
import { ACTION_TYPE } from "../../utils";
import { AddressForm } from "./component/AddressForm";
import "./UserProfile.css";

export function UserProfile() {
  const navigate = useNavigate();
  const { user, setUser, token, setToken } = useAuth();
  const { setLoader, dataDispatch, address, changeTitle } = useData();
  const { firstName, lastName, email } = user;
  const [check, setChecked] = useState(true);
  const formValue = {
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    mobile: "",
  };
  const [formDisplay, setFormDisplay] = useState(false);
  const [addressForm, setAddForm] = useState(formValue);
  
    const logOutHandler = () => {
      dataDispatch({
        type: ACTION_TYPE.LOG_OUT,
      });
      localStorage.removeItem("login");
      localStorage.removeItem("user");
      localStorage.removeItem("signup");
  
      setUser();
      setToken("");
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 500);
      navigate("/");
    };

    const editAddress = (_id, name, street, city, state, country, zipCode, mobile) => {
      setFormDisplay(true);
      setAddForm((form) => ({
        ...form,
        _id,
        name,
        street,
        city,
        state,
        country,
        zipCode,
        mobile,
      }));
    };

    useEffect(() => changeTitle("My Profile"), [])  

    return (
        <div className="profile-container">
            <div className="profile-main-container">
                <h2>My Profile</h2>
                <div className="profile-main">
                    <div className="tabs">
                        <input type="radio" name="tabs" id="profile" 
                        checked={check}
                        onChange={() => setChecked(true)} />
                        <label htmlFor="profile">Profile</label>
                        <div className="tab">
                            <div className="profile-detail">
                                <h3 className="details-header">Profile Details</h3>
                                <div className="profile-detail-main">
                                    <div>
                                        <p className="paragraph-medium profile-heading">Full Name:</p>
                                        <p className="paragraph-medium profile-heading">E-Mail:</p>
                                    </div>
                                    <div>
                                    <p className="paragraph-medium">{`${firstName} ${lastName}`}</p>
                                    <p className="paragraph-medium">{email}</p>
                                    </div>
                                </div>
                                
                                <div className="account-setting-container">
                                      <button class="btn danger setting-logout"
                                      onClick={() => logOutHandler()}
                                      >Log Out</button>
                                </div>
                            </div>
                        </div>

                        <input type="radio" name="tabs" id="address" 
                        checked={!check}
                        onChange={() => setChecked(!check)} />
                        <label htmlFor="address">Address</label>
                        <div className="tab">                            
                                <h3 className="details-header">My Addresses</h3>
                                {address && address.map(({ _id, name, street, city, state, country, zipCode, mobile }) => (
                                    <div className="address-container">
                                        <p className="paragraph-medium profile-heading">{name}</p>
                                        <p className="paragraph-small">{street}</p>
                                        <p className="paragraph-small">{city}, {state} {zipCode}</p>
                                        <p className="paragraph-small">{country}</p>
                                        <p className="paragraph-small">Mobile Number: {mobile}</p>
                                        <div class="address-btn">
                                            <button className="btn outlined-default"
                                             onClick={() =>
                                                editAddress(_id, name, street, city, state, country, zipCode, mobile)}
                                            >Edit</button>
                                            <button className="btn outlined-danger" 
                                             onClick={() =>
                                                removeFromAddress(dataDispatch, _id, token, toast, setFormDisplay)}
                                            >Delete</button>
                                        </div>
                                    </div>
                                ))} 
                                <button
                                  onClick={() => {
                                    setFormDisplay(true);
                                    setAddForm(formValue);
                                  }}
                                  className={`btn default add-address ${formDisplay && "displayNone"}`}
                                >
                                  + Add New Address
                                </button>                                                        
                        </div>
                    </div>
                </div>
            </div>
            <AddressForm
            addressForm={addressForm}
            setAddForm={setAddForm}
            formDisplay={formDisplay}
            setFormDisplay={setFormDisplay}
            formValue={formValue}
            />
        </div>
    )
}