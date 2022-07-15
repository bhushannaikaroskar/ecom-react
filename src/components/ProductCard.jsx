import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useCartContext, useWishListContext } from "../context";
import { FavoriteIconFilled } from "../icons/icons";
import { calculatePercentage } from "../utils";

const starColor = {
    color: "var(--COLOR-WARNING-DARK)"
}

export default function ProductCard({ productData }) {
    const { _id, title,rating, description, price, imageSrc } = productData;
    const [isLoading, setIsLoading] = useState(false);
    const { wishList, wishListHandler } = useWishListContext();
    const { addToCart } = useCartContext();
    const {auth} = useAuth();
    const navigate = useNavigate();

    const isPresent = wishList.find((p) => p._id === _id);

    const redColor = {
        color: "var(--COLOR-ERROR-DARK)",
    };

    return (
        <div className="card">
            <div className="card-img-wrapper">
                <button
                    className={`btn btn-icon btn-icon-red card-favorite`}
                    style={isPresent ? redColor : {}}
                    onClick={() => wishListHandler(productData, setIsLoading)}
                    disabled={isLoading}
                >
                    <FavoriteIconFilled />
                </button>
                <div className="card-rating">{rating.toFixed(1)} <span style={starColor}>★</span></div>
                <img className="card-img" src={imageSrc} alt="card-img" />
            </div>
            <div className="card-content-wrapper">
                <div className="card-content">
                    <h2 className="card-title" onClick={()=>navigate(`/product/${_id}`)} title={title}>{title}</h2>
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
                            onClick={async () => {
                                await addToCart(productData, setIsLoading);
                                if(auth.isAuthenticated){
                                    navigate("/cart");
                                }
                            }}
                            disabled={isLoading}
                        >
                            Buy Now
                        </button>
                        <button
                            className="btn btn-outline card-btn"
                            onClick={() => addToCart(productData, setIsLoading)}
                            disabled={isLoading}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
