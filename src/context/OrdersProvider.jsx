import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils";
import { useAuth } from "./authContext/AuthProvider";
import { useCartContext } from "./cartContext/CartProvider";
import { useTheme } from "./themeContext/ThemeProvider";

const OrdersContext = createContext();

export default function OrdersProvider({children}) {

    const [orders,setOrders] = useState([]);
    const {auth} = useAuth();
    const {theme} = useTheme();
    const {fetchCart} = useCartContext()
    const navigate = useNavigate()

    const placeOrders = (order) => {
        if(auth.isAuthenticated){
            axios.request({
                method: "post",
                url: `/api/user/orders`,
                headers: { authorization:auth.authToken},
                data: {
                    order
                },
            }).then(res => {
                console.log(res)
                setOrders([...res.data.orders])
                fetchCart()
                navigate("/profile/orders")

            }).catch(err=>{
                errorToast("Failed to add orders",theme)
            })
        }
        successToast("Order placed successfully")
    }

    const getOrders = () => {
        if(auth.isAuthenticated){
            axios.request({
                method: "get",
                url: `/api/user/orders`,
                headers: { authorization:auth.authToken},
                data: {
                },
            }).then(res => {
                console.log(res)
                setOrders([...res.data.orders])
            }).catch(err=>{
                errorToast("Failed to add orders",theme)
            })
        }
    }

    useEffect(()=>{
        getOrders()
    },[auth])

    return <OrdersContext.Provider value={{orders,placeOrders}}>
        {children}
    </OrdersContext.Provider>;
}

export const useOrders = () => useContext(OrdersContext);
