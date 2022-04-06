import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/productContext/ProductProvider";

const style = {
    cursor: "pointer",
};

export default function CategoryCard({ title, imageLink, categoryName }) {
    const { dispatch } = useProductContext();
    const navigate = useNavigate();

    return (
        <div
            className="img-card"
            style={style}
            onClick={() => {
                dispatch({ type: "HOME_CATEGORY", payload: categoryName });
                navigate("/product");
            }}
        >
            <div className="img-wrap">
                <img className="img" src={imageLink} alt="product-img" />
            </div>
            <div className="card-overlay">
                <h2 className="font-xx-large">{title}</h2>
            </div>
        </div>
    );
}
