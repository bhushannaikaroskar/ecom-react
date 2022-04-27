import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../../utils/custom-hooks/useAxios";
import { useAuth } from "../authContext/AuthProvider";

const AddressContext = createContext();



export default function AddressProvider({ children }) {

    const [addressList,setAddressList] = useState([])
    const {fetchData} = useAxios();
    const {auth} = useAuth()

    // const buttonHandler = ()=>{
    //     fetchData({
    //         method: "get",
    //         url: `/api/user/address`,
    //         headers: { authorization: auth.authToken },
    //         data: {
    //         },
    //     }).then(res => setAddressList(res.data.address))
    // }

    const addAddress = ()=>{
        axios.request({
            method: "post",
            url: `/api/user/address`,
            headers: { authorization: auth.authToken },
            data: {
                address:{
                    name:"dmmy anme",
                    city:"Mumbai",
                    State:"Maharashtra"
                }
            }
        }).then(res => setAddressList(res.data.address))
    }

    const removeAddress = (addressId) =>{
        axios.request({
            method: "delete",
            url: `/api/user/address/${addressId}`,
            headers: { authorization: auth.authToken },
            data: {
            }
        }).then(res => setAddressList(res.data.address))
    }

    useEffect(()=>{
        if(auth.isAuthenticated){
            axios.request({
                method: "get",
                url: `/api/user/address`,
                headers: { authorization: auth.authToken },
                data: {
                },
            }).then(res => console.log(res))
        }
    },[])

    return (
        <AddressContext.Provider value={{addressList,removeAddress,addAddress}}>{children}</AddressContext.Provider>
    );
}


export const useAddress = () => useContext(AddressContext);

