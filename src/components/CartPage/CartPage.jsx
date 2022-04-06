import React from "react";
import { useCartContext } from "../../context";
import CartCard from "../CartCard";
import Checkout from "./Checkout";

export default function CartPage() {
    const { cart} = useCartContext();

    return (
        <main className="grand-main">
            <h1 className="text-align-center font-black">My Cart {cart.length>0?`(${cart.length})`:"" }</h1>
            <div className="cart-wrapper flex align-items-start justify-content-center p-y-2">
                <ul className="list">
                    {cart.map((product) => {
                        return <li key={product._id} className="list-item">
                            <CartCard productData={product}/>
                        </li>;
                    })}
                </ul>
                {cart.length>0 && <Checkout/>}
            </div>
        </main>
    );
}
