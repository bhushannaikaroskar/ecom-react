import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/AuthProvider";
import { errorToast} from "../../utils";
import { useTheme } from "../themeContext/ThemeProvider";

const AddressContext = createContext();



export default function AddressProvider({ children }) {

    const [addressList,setAddressList] = useState([])
    const {auth} = useAuth()
    const {theme} = useTheme();

    const addAddress = (address)=>{
        axios.request({
            method: "post",
            url: `/api/user/address`,
            headers: { authorization: auth.authToken },
            data: {
                address
            }
        }).then(res => {
            setAddressList(res.data.address)
        }).catch(err=>{
            errorToast("Failed to add address",theme)
        })
    }

    const removeAddress = (addressId) =>{
        axios.request({
            method: "delete",
            url: `/api/user/address/${addressId}`,
            headers: { authorization: auth.authToken },
            data: {
            }
        }).then(res => {
            setAddressList(res.data.address)
        }).catch(err=>{
            errorToast("Failed to remove address",theme)
        })
    }

    useEffect(()=>{
        if(auth.isAuthenticated){
            axios.request({
                method: "get",
                url: `/api/user/address`,
                headers: { authorization: auth.authToken },
                data: {
                },
            }).then(res => {
                setAddressList(res.data.address)
            }).catch(err=>{
                errorToast("Failed to fetch address",theme)
            })
        }
    },[auth])

    return (
        <AddressContext.Provider value={{addressList,removeAddress,addAddress}}>{children}</AddressContext.Provider>
    );
}


export const useAddress = () => useContext(AddressContext);

