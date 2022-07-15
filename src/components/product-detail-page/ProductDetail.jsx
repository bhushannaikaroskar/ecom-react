import { useNavigate, useParams } from "react-router-dom";
import "./productdetails.css";
import { useProductContext } from "../../context/productContext/ProductProvider";
import { calculatePercentage } from "../../utils";
import ProductCard from "../ProductCard";
import { useState } from "react";
import { useCartContext, useWishListContext } from "../../context";

const redColor = {
    color: "var(--COLOR-ERROR-DARK)",
};

export default function ProductDetail() {
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { wishList, wishListHandler } = useWishListContext();
    const { addToCart } = useCartContext();
    const { productData } = useProductContext();

    const navigate = useNavigate();

    const isPresent = wishList.find((p) => p._id === productId);

    const product = productData.find((prod) => prod._id === productId);
    const recommendedProducts = productData.filter(
        (prod) => prod.category === product.category && prod._id !== productId
    );
    const { title, inStock, rating, price, descriptionArray, reviews } =
        product ?? {};

    return product ? (
        <div className="grand-main">
            <div className="grid-col-2 p-1 w-100">
                <div className="img-container">
                    <img
                        className="img"
                        src={product.imageSrc}
                        alt="product-img"
                    />
                    <button
                        style={isPresent ? redColor : {}}
                        className="btn btn-icon btn-icon-red font-gray wishlist-button"
                        onClick={() => wishListHandler(product, setIsLoading)}
                        disabled={isLoading}
                    >
                        <span className="material-icons btn-icon-lg ">
                            favorite
                        </span>
                    </button>
                </div>
                <div className="element-2">
                    <h1 className="fw-600 p-y-2">{title}</h1>
                    <div className="rating-container">
                        <h2 className="star-rating">
                            {`${rating}`}{" "}
                            <span
                                style={{
                                    color: "var(--COLOR-WARNING-DARK)",
                                    fontSize: "3.2rem",
                                }}
                            >
                                ★
                            </span>{" "}
                        </h2>{" "}
                        <span className="font-normal font-gray">
                            {" "}
                            ({reviews} reviews)
                        </span>
                    </div>
                    <div className="price-container fw-500">
                        <div className="new-price">₹ {price.newPrice}</div>
                        {calculatePercentage(price) !== 0 && <div className="old-price">MRP {price.oldPrice}</div>}
                        {calculatePercentage(price) !== 0  && <div className="discount">
                            {calculatePercentage(price)}%
                        </div>}
                    </div>

                    <div className="font-primary p-y-0_5 font-large">
                        Inclusive of all taxes
                    </div>
                    <div className="font-large fw-600 p-y-0_5">
                        Availability :{" "}
                        <span className="font-large font-gray fw-500">
                            {inStock ? "Currently In Stock" : "Currently Out of Stock"}
                        </span>
                    </div>
                    <div className="font-large fw-600 p-y-0_5">
                        Description :
                    </div>
                    <div className="product-description p-y-0_5 font-gray fw-500 ">
                        <ul className="list">
                            {descriptionArray.map((desc) => {
                                return (
                                    <li className="list-item p-0 p-y-0_5">
                                        {desc}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="price-cta">
                        <button
                            className="btn btn-primary w-100 fw-700"
                            onClick={async () => {
                                await addToCart(product, setIsLoading);
                                navigate("/cart")
                            }}
                            disabled={isLoading}
                        >
                            BUY NOW
                        </button>
                        <button
                            className="btn btn-outline btn-outline-primary w-100 fw-700"
                            onClick={() => addToCart(product, setIsLoading)}
                            disabled={isLoading}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
            <h1 className="p-1">Similar Products</h1>
            <div className="similar-products p-1">
                {recommendedProducts.map((product) => {
                    return <ProductCard key={product._id} productData={product} />;
                })}
            </div>
        </div>
    ) : (
        <div>Product is loading</div>
    );
}
