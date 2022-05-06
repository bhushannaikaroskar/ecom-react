import React from "react";

export default function OrderItemCard({product}) {
    return (
        <div className="order-card">
            <img src={product.imageSrc} alt="" className="order-card-img" />
            <div className="card-content-wrapper">
                <div className="order-content">
                    <h4 className="order-title">{product.title}</h4>
                    <span className="font-normal">Quantity: {product.qty}</span>
                </div>
            </div>
            <div className="order-price">₹ {product.price.newPrice}</div>
        </div>
    );
}
