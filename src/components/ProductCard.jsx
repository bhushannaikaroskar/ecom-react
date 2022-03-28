import { useCartContext, useWishListContext } from "../context";
import { FavoriteIconFilled } from "../icons/icons";
import { calculatePercentage } from "../utils";

export default function ProductCard({ productData }) {
    const { id, title, description, price, imageSrc } = productData;
    const { wishList, wishListHandler } = useWishListContext();
    const { dispatchCart } = useCartContext();

    const isPresent = wishList.find((p) => p.id === id);

    const redColor = {
        color: "var(--COLOR-ERROR-DARK)",
    };

    return (
        <div className="card">
            <div className="card-img-wrapper">
                <button
                    className={`btn btn-icon btn-icon-red card-favorite`}
                    style={isPresent ? redColor : {}}
                    onClick={() => wishListHandler(productData)}
                >
                    <FavoriteIconFilled />
                </button>
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
                        <button className="btn btn-default card-btn">
                            Buy Now
                        </button>
                        <button
                            className="btn btn-outline card-btn"
                            onClick={() =>
                                dispatchCart({
                                    type: "ADD_TO_CART",
                                    payload: productData,
                                })
                            }
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
