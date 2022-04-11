
import { useParams } from "react-router-dom";
import "./productdetails.css"
import { useProductContext } from "../../context/productContext/ProductProvider";
import {calculatePercentage} from "../../utils"

export default function ProductDetail() {
    const { productId } = useParams();
    console.log(productId);
    const { productData } = useProductContext();

    const product = productData.find((prod) => prod._id === productId);
    const {title,description,rating,price} = product??{};

    return product ? (
        <div className="grand-main">
            <div className="grid-col-2 p-1 w-100">
                <div className="img-wrap w-75">
                    <img
                        className="img"
                        src={product.imageSrc}
                        alt="product-img"
                    />
                </div>
                <div className="element-2">
                    <h1 className="p-y-2">{title}</h1>
                    <h2 className="star-rating">★ {`${rating}`}</h2>
                    <div className="price-container">
                        <div className="new-price">₹ {price.newPrice}</div>
                        <div className="old-price">MRP {price.oldPrice}</div>
                        <div className="discount">{calculatePercentage(price)}%</div>
                    </div>
                    <h3>Description:</h3>
                    <div className="product-description p-y-1_5">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>Product is loading</div>
    );
}
