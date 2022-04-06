import { useState } from "react";
import { useCartContext, useWishListContext } from "../context";
import { IncrementIcon, DecrementIcon, TrashIcon } from "../icons/icons";
import { calculatePercentage } from "../utils";

export default function CartCard({ productData }) {
    const { title, price, imageSrc, qty } = productData;
    const [isLoading, setIsLoading] = useState(false);
    const { incrementCount, decrementQuantity, removeFromCart } =
        useCartContext();
    const { addToWishList } = useWishListContext();

    return (
        <div className="card card-horizontal width-45">
            <div className="card-img-wrapper">
                <img className="card-img" src={imageSrc} alt="card-img" />
            </div>
            <div className="card-content-wrapper">
                <div className="card-content">
                    <h2 className="card-title">{title}</h2>
                </div>
                <div className="card-cta">
                    <div className="card-price">
                        <span className="card-discount-price">
                            {price.newPrice}
                        </span>
                        <div className="card-price-details">
                            <span className="card-original-price">
                                {" "}
                                {price.oldPrice}
                            </span>
                            <span className="card-discount-percentage">
                                {" "}
                                {calculatePercentage(price)}%
                            </span>
                        </div>
                    </div>
                    <div className="quantity-wrapper fw-600">
                        <p>Quantity</p>
                        <div className="quantity-cta-wrapper flex align-items-center">
                            <button
                                className="btn btn-icon button-round p-0 p-x-0_5"
                                onClick={() =>
                                    decrementQuantity(productData, setIsLoading)
                                }
                                disabled={isLoading}
                            >
                                {qty === 1 ? <TrashIcon /> : <DecrementIcon />}
                            </button>
                            <span className="quantity-display fw-600 font-large">
                                {qty}
                            </span>
                            <button
                                className="btn btn-icon button-round p-0 p-x-0_5"
                                onClick={() =>
                                    incrementCount(productData, setIsLoading)
                                }
                                disabled={isLoading}
                            >
                                <IncrementIcon />
                            </button>
                        </div>
                    </div>
                    <div className="card-buttons flex-column">
                        <button
                            className="btn btn-outline card-btn flex-grow-1"
                            onClick={() => {
                                removeFromCart(productData, setIsLoading);
                                delete productData.qty;
                                addToWishList(productData);
                            }}
                            disabled={isLoading}
                        >
                            Move to WishList
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
