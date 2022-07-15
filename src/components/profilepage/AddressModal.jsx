import React from 'react'
import { useState } from 'react'
import { useAddress } from '../../context'

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

export default function AddressModal() {
    
    const [errors,setErrors] = useState(errorObject);
    const {addAddress,updateAddress,isModal,toggleModal,isUpdate,address,setAddress} = useAddress();

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
            console.log("adding")
            updateAddress(address)
        }else{
           addAddress(address)
        }
        toggleModal();
        setAddress(initialState)
    };

  return (
    <div className={`modal-container modal-center ${isModal?"modal-active":""}`}>
                <div className="card text-card address-form">
                    <div className="card-content-wrapper p-2">
                        <div className="card-content">
                            <h2 className="card-title"> Add address</h2>
                            <div className="card-description text-card-description p-1">
                                {namesArray.map((input)=>{
                                    return <div key={input[0]} className="input-wrapper input-width-100">
                                    <label htmlFor="name" className="input-label ">{input[1]}:</label>
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
  )
}
