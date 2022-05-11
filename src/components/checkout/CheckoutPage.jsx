import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { grandLogo } from "../../assets";
import { useAddress, useAuth, useCartContext, useOrders, useTheme } from "../../context";
import { errorToast, successToast } from "../../utils";
import "./checkout.css";
import OrderItemCard from "./OrderItemCard";

const calculateTotalPrice = (cart) => {
    let total = 0;
    let discountTotal = 0;
    cart.forEach((product) => {
        total = total + product.price.newPrice * product.qty;
        discountTotal = discountTotal + product.price.oldPrice * product.qty;
    });
    discountTotal = discountTotal - total;
    return [total, discountTotal];
};

const coupons = { FIRSTBUY: 200, CHESS15: (price) => Math.floor(price * 0.15) };

const applyCoupon = (coupon, price, setBoolean = () => {}) => {
    console.log(coupons[coupon]);
    if (coupons[coupon]) {
        console.log(typeof coupons[coupon]);
        setBoolean(coupon);
        if (typeof coupons[coupon] === "function") {
            console.log("inside if");
            const cb = coupons[coupon];
            return cb(price);
        } else {
            return coupons[coupon];
        }
    } else {
        setBoolean("");
        return 0;
    }
};

export default function CheckoutPage() {
    const [accordian, setAccordian] = useState("address");
    const [coupon, setCoupon] = useState({ couponCode: "", couponDiscount: 0 });
    const [couponInput, setCouponInput] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { addressList } = useAddress();
    const { cart } = useCartContext();
    const { auth } = useAuth();
    const { placeOrders } = useOrders()
    const navigate = useNavigate();

    const [totalPrice, discount] = calculateTotalPrice(cart);
    const deliveryCharge = totalPrice >= 500 || cart.length === 0 ? 0 : 49;

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript();
    }, []);

    const makePayment = async () => {
        if (!selectedAddress) {
            errorToast("Address not selected");
            return;
        }

        if (cart.length === 0) {
            errorToast("Add items to cart");
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            image: grandLogo,
            name: "Grand Store",
            description: "little bird-tee store",
            currency: "INR",
            amount: (totalPrice + deliveryCharge - coupon.couponDiscount) * 100,
            handler: function (response) {
                if (response && response.razorpay_payment_id) {
                    console.log(response);
                    const order = {
                        paymentId: response.razorpay_payment_id,
                        list: [...cart],
                        amount:
                            (totalPrice +
                                deliveryCharge -
                                coupon.couponDiscount) *
                            100,
                        address:selectedAddress,
                        currency: "INR",
                    }
                    placeOrders(order)
                }
            },
            prefill: {
                name: selectedAddress.fullName,
                email: auth.user.email,
                contact: selectedAddress.phoneNumber,
                //   method: "netbanking",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <main className="grand-main">
            <h1 className="text-align-center font-black">My Cart </h1>
            <div className="checkout-wrapper flex align-items-start justify-content-center p-y-2">
                <div className="checkout-details">
                    <button
                        className="accordian"
                        onClick={() => {
                            setAccordian((s) => (s === "order" ? "" : "order"));
                        }}
                    >
                        <span>Order Details</span>
                        <span className="material-icons">
                            {accordian === "order"
                                ? "expand_less"
                                : "expand_more"}
                        </span>
                    </button>
                    {accordian === "order" && (
                        <div className="accordian-order-list">
                            {cart.map((product) => {
                                return <OrderItemCard product={product} />;
                            })}
                        </div>
                    )}
                    <button
                        className="accordian"
                        onClick={() => {
                            setAccordian((s) =>
                                s === "address" ? "" : "address"
                            );
                        }}
                    >
                        <span>Address</span>
                        <span className="material-icons">
                            {accordian === "address"
                                ? "expand_less"
                                : "expand_more"}
                        </span>
                    </button>
                    {accordian === "address" && (
                        <>
                            <div className="accordian-address-list">
                                {addressList.map((address) => {
                                    return (
                                        <div
                                            className="accordian-address-item"
                                            onClick={() =>
                                                setSelectedAddress(address)
                                            }
                                        >
                                            <h3 className="p-y-1">
                                                {address.fullName}
                                            </h3>
                                            <p>{address.streetAddress}</p>
                                            <p>
                                                {address.city}, {address.state},{" "}
                                                {address.pinCode}
                                            </p>
                                            <p className="p-y-0_5">
                                                <span class="fw-600">
                                                    Phone Number:
                                                </span>{" "}
                                                {address.phoneNumber}
                                            </p>
                                            {selectedAddress?._id ===
                                                address._id && (
                                                <span className="material-icons accordian-check">
                                                    check
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    navigate("/profile/address");
                                }}
                            >
                                Add address
                            </button>
                        </>
                    )}
                </div>
                <div className="checkout-summary">
                    <div className="order-header">
                        <h2 className="fw-600 p-y-1 ">Order Summary</h2>
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
                        {coupon.couponCode && (
                            <li className="list-item order-item">
                                <p className="">Coupon Discount:</p>
                                <p className="fw-500">
                                    Rs {coupon.couponDiscount}
                                </p>
                            </li>
                        )}
                    </ul>
                    <div>
                        <div className="input-wrapper">
                            <label className="input-label">COUPON CODE:</label>
                            <input
                                type="text"
                                className="input-field input-color-success coupon"
                                onChange={(e) => setCouponInput(e.target.value)}
                            />
                            {coupon.couponCode && (
                                <div className="coupon-tag">
                                    {coupon.couponCode}
                                    <button
                                        className="coupon-cancel"
                                        onClick={() => {
                                            setCoupon({
                                                couponCode: "",
                                                couponDiscount: 0,
                                            });
                                        }}
                                    >
                                        <span class="material-icons font-normal">
                                            close
                                        </span>
                                    </button>
                                </div>
                            )}
                            <button
                                class="btn btn-primary"
                                onClick={() => {
                                    const resultPrice = applyCoupon(
                                        couponInput,
                                        totalPrice
                                    );
                                    if (resultPrice !== 0) {
                                        setCoupon((s) => ({
                                            ...s,
                                            couponCode: couponInput,
                                            couponDiscount: resultPrice,
                                        }));
                                    } else {
                                        console.log("wrong coupon");
                                    }
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                    <hr className="margin-2" />
                    <div className="order-item p-y-1">
                        <h3 className="fw-600">Total Amount</h3>
                        <h3 className="fw-600">
                            Rs{" "}
                            {totalPrice +
                                deliveryCharge -
                                coupon.couponDiscount}{" "}
                        </h3>
                    </div>
                    <div className="flex p-y-2_5">
                        <button
                            className="btn btn-primary flex-grow-1"
                            onClick={makePayment}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
