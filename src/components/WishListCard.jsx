import React, { useState } from "react";
import { useCartContext, useWishListContext } from "../context";

export default function WishListCard({ productData }) {
    const { title, description, price, imageSrc } = productData;
    const [isLoading, setIsLoading] = useState(false);
    const { wishListHandler } = useWishListContext();
    const { addToCart } = useCartContext();

    const calculatePercentage = (price) => {
        const percentage =
            ((price.oldPrice - price.newPrice) * 100) / price.oldPrice;
        return Math.round(percentage);
    };

    return (
        <div className="card">
            <div className="card-img-wrapper">
                <img className="card-img" src={imageSrc} alt="card-img" />
            </div>
            <div className="card-content-wrapper">
                <div className="card-content">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-description">{description}</div>
                </div>
                <div className="card-cta">
                    <div className="card-price">
                        <span className="card-discount-price">
                            Rs {price.newPrice}
                        </span>
                        <div className="card-price-details">
                            <span className="card-original-price">
                                Rs {price.oldPrice}
                            </span>
                            <span className="card-discount-percentage">
                                {calculatePercentage(price)}% off
                            </span>
                        </div>
                    </div>
                    <div className="card-buttons flex-stretch">
                        <button
                            className="btn btn-default card-btn"
                            onClick={() => {
                                addToCart(productData, setIsLoading);
                                wishListHandler(productData, setIsLoading);
                            }}
                            disabled={isLoading}
                        >
                            Move to Cart
                        </button>
                        <button
                            className="btn btn-outline card-btn"
                            onClick={() => wishListHandler(productData,setIsLoading)}
                            disabled={isLoading}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
