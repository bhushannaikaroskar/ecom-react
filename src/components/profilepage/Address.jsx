import React from "react";
import { useAddress } from "../../context";

export default function Address() {
    const { addressList, removeAddress,setIsUpdate,toggleModal,setAddress } = useAddress();

    return (
        <div>
            <h2 >Address</h2>
            <div className="address-list">
            {addressList.map((address) => {
                return (
                    <div key={address._id} className="address-item">
                        <h3 className="p-y-1">{address.fullName}</h3>
                        <p>{address.streetAddress}</p>
                        <p>{address.city}, {address.state}</p> 
                        <p>Pin: {address.pinCode}</p> 
                        <p className="p-y-0_5"><span className="fw-600">Phone Number:</span> {address.phoneNumber}</p>
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
        </div>
    );
}
