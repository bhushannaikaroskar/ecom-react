import React, { useState } from "react";
import { useAddress } from "../../context";

const initialState = {
    fullName:"",
    streetAddress:"",
    city:"",
    state:"",
    pinCode:"",
    phoneNumber:""
}

const errorObject = {
    fullName:false,
    streetAddress:false,
    city:false,
    state:false,
    pinCode:false,
    phoneNumber:false,
}

const errorMessage = {
    fullName:"Please enter your name",
    streetAddress:"Please enter address",
    city:"Please enter your city",
    state:"Please enter your State",
    pinCode:"Please enter proper zip code format",
    phoneNumber:"Please enter a valid phone number"
}

const dummyAddress = {
    fullName:"Kartik Sawant",
    streetAddress:"2RCP+GJ4, Vijay Manjrekar Rd, Chandrakant Dhuru Wadi, Dadar",
    city:"Mumbai",
    state:"Maharashtra",
    pinCode:"400023",
    phoneNumber:"8209234572"
}

const namesArray = [["fullName","Full Name"],["streetAddress","Street Address"],["city","City"],["state","State"],["pinCode","Zip Code"],["phoneNumber","Phone Number"]]

export default function Address() {
    const [address,setAddress] = useState(initialState);
    const [errors,setErrors] = useState(errorObject);
    const [isModal, setIsModal] = useState(false);
    let [isUpdate,setIsUpdate] = useState(false);
    const { addressList, addAddress,updateAddress, removeAddress } = useAddress();

    const toggleModal = () => {
        setIsModal((s) => !s);
    };

    const addDummyAddress = ()=>{
        setAddress(dummyAddress);
    }

    const addressHandler = () => {
        let isErrorPresent = false;
        for(let key in address){
            if(!address[key]){
                isErrorPresent = true;
                setErrors(s=>({...s,[key]:true}))
            }else{
                setErrors(s=>({...s,[key]:false}))
            }
        }

        if(address.pinCode.length !== 6){
            isErrorPresent = true;
            setErrors(s=>({...s,pinCode:true}))
        }

        if(address.phoneNumber.length !== 10 || !address.phoneNumber.match(/[7-9][0-9]{9}/)){
            isErrorPresent = true;
            setErrors(s=>({...s,phoneNumber:true}))
        }

        if(isErrorPresent){
            return
        }else{
            setErrors(errorObject)
        }

        if(isUpdate){
            updateAddress(address)
        }else{
           addAddress(address)
        }
        toggleModal();
        setAddress(initialState)
    };

    return (
        <div>
            <h2 >Address</h2>
            <div className="address-list">
            {addressList.map((address) => {
                return (
                    <div className="address-item">
                        <h3 className="p-y-1">{address.fullName}</h3>
                        <p>{address.streetAddress}</p>
                        <p>{address.city}, {address.state}</p> 
                        <p>Pin: {address.pinCode}</p> 
                        <p className="p-y-0_5"><span class="fw-600">Phone Number:</span> {address.phoneNumber}</p>
                        <div className="address-cta">
                            <button 
                                className="btn btn-link-primary" 
                                onClick={()=>{
                                    setIsUpdate(true);
                                    setAddress(address) 
                                    toggleModal();
                                }}
                            >
                                Change Address
                            </button>
                            <button className="btn btn-link-secondary" onClick={()=>removeAddress(address._id)}> remove</button>
                        </div>
                    </div>
                );
            })}
            </div>
            <button 
                className="btn btn-primary" 
                onClick={()=>{
                    setIsUpdate(false);
                    toggleModal()
                }}>Add address </button>
            <div className={`modal-container modal-center ${isModal?"modal-active":""}`}>
                <div className="card text-card address-form">
                    <div className="card-content-wrapper p-2">
                        <div className="card-content">
                            <h2 className="card-title"> Add address</h2>
                            <div className="card-description text-card-description p-1">
                                {namesArray.map((input)=>{
                                    return <div className="input-wrapper input-width-100">
                                    <label for="name" className="input-label ">{input[1]}:</label>
                                    <input
                                        id="name"
                                        value={address[input[0]]}
                                        type={(input[0]==="pinCode" || input[0]==="phoneNumber")?"number":"text" }
                                        className={"input-field address-input " + (errors[input[0]] ? "input-color-error" : "")}
                                        onChange={(e)=>{setAddress(s => ({...s,[input[0]]:e.target.value}))}}
                                    />
                                    {errors[input[0]] && <span className="input-message">{errorMessage[input[0]]}</span>}
                                </div>
                                })}
                            </div>
                        </div>
                        <div className="card-cta w-100">
                            <div className="card-buttons w-100 justify-content-center">
                                <button className="btn btn-primary card-btn" onClick={addressHandler}>Add</button>
                                <button
                                    className="btn btn-outline btn-outline-primary card-btn"
                                    onClick={addDummyAddress}
                                >
                                    Add dummy address
                                </button>
                                <button
                                    className="btn btn-outline btn-outline-primary card-btn"
                                    onClick={()=>{
                                        setAddress(initialState)
                                        toggleModal();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
