import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context";

export default function Checkout() {

    const {cart} = useCartContext()
    const navigate = useNavigate();

    const calculateTotalPrice = (cart)=>{
        let total = 0;
        let discountTotal = 0;
        cart.forEach((product)=>{
            total = total + (product.price.newPrice * product.qty)
            discountTotal = discountTotal + (product.price.oldPrice * product.qty)
        })
        discountTotal = discountTotal - total;
        return [total,discountTotal];
    }

    const [totalPrice,discount] = calculateTotalPrice(cart);
    const deliveryCharge = (totalPrice>=500 || cart.length===0)?0:49;

    return (
        <div className="order-checkout ">
            <div className="order-header">
                <h2 className="fw-600 p-y-1 ">Cart Summary</h2>
            </div>
            <hr />
            <ul className="list p-y-1">
                <li className="list-item order-item">
                    <p className="">Total Price</p>
                    <p className="fw-500">Rs {totalPrice}</p>
                </li>
                <li className="list-item order-item">
                    <p className="">Discount</p>
                    <p className="fw-500 font-primary">Rs {discount}</p>
                </li>
                <li className="list-item order-item">
                    <p className="">Delivery Charges</p>
                    <p className="fw-500">Rs {deliveryCharge}</p>
                </li>
            </ul>
            <hr className="margin-2" />
            <div className="order-item p-y-1">
                <h3 className="fw-600">Total Amount</h3>
                <h3 className="fw-600">Rs {totalPrice + deliveryCharge } </h3>
            </div>
            <div className="flex p-y-2_5">
                <button className="btn btn-primary flex-grow-1" onClick={()=>navigate("/checkout")}>
                    Checkout
                </button>
            </div>
        </div>
    );
}
