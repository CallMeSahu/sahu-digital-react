import React from "react";
import { useAuth, useData } from "../../../context";
import { addToAddress, updateFromAddress } from "../../../services";
import { toast } from "react-toastify";

export function AddressForm({
    addressForm,
    setAddForm,
    formDisplay,
    setFormDisplay,
    formValue,  
}){
    const { dataDispatch } = useData();
    const { token } = useAuth();

    const fillFormValue = (event, fieldName) => {
        const { value } = event.target;
        setAddForm((prev) => ({ ...prev, [fieldName]: value }));
    };

    const cancelForm = (e) => {
        e.preventDefault();
        setFormDisplay(false);
        setAddForm(formValue);
    };

    const fillFormValueWithDummy = (e) => {
        e.preventDefault();
        setAddForm((form) => ({
          ...form,
          name: "Siddhartha",
          street: "R14/6D, New Navy Nagar, Colaba",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          zipCode: "400005",
          mobile: "8317691805",
        }));
    };

    const saveHandler = (e) => {
        e.preventDefault();
        addressForm._id
          ? updateFromAddress(
              dataDispatch,
              addressForm,
              token,
              toast,
              setFormDisplay
            )
          : addToAddress(dataDispatch, addressForm, token, toast, setFormDisplay);
    };
    
    return (
        <div 
        className={`address-form-container ${
            !formDisplay ? "displayNone" : "displayFlex"
          }`}
        >
            <form action="" className="address-form" onSubmit={(e) => saveHandler(e)}>
            <h4>Add New Address</h4>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter your Name" 
                    className="input input-text address-form-input"
                    value={addressForm.name}
                    onChange={(e) => fillFormValue(e, "name")}
                    required/>
            </div>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter Flat No., Building & Area" 
                    className="input input-text address-form-input"
                    value={addressForm.street}
                    onChange={(e) => fillFormValue(e, "street")}
                    required/>
            </div>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter City" 
                    className="input input-text address-form-input"
                    value={addressForm.city}
                    onChange={(e) => fillFormValue(e, "city")}
                    required/>
            </div>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter State" 
                    className="input input-text address-form-input"
                    value={addressForm.state}
                    onChange={(e) => fillFormValue(e, "state")}
                    required/>
            </div>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter Country" 
                    className="input input-text address-form-input"
                    value={addressForm.country}
                    onChange={(e) => fillFormValue(e, "country")}
                    required/>
            </div>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter ZIP Code" 
                    className="input input-text address-form-input"
                    value={addressForm.zipCode}
                    onChange={(e) => fillFormValue(e, "zipCode")}
                    required/>
            </div>
            <div className="form-input">
                <input 
                    type="text" 
                    placeholder="Enter Mobile Number" 
                    className="input input-text address-form-input"
                    value={addressForm.mobile}
                    onChange={(e) => fillFormValue(e, "mobile")}
                    required/>
            </div>
            <div className="address-form-btn">
                <input type="submit" value="Save" className="btn link-btn address-save"/>                    
                <input type="reset" value="Cancel" className="btn outlined-danger address-cancel"
                onClick={(e) => cancelForm(e)}/>                    
                <input type="sumit" value="Fill Dummy Value" className="btn default address-cancel"
                onClick={(e) => fillFormValueWithDummy(e)} />                    
            </div>
            </form>
        </div>
    )

      
}