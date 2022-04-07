import React from "react";
import "./error.css";
import image from "../../assets/error-page/error-page-3.png";
import { useDocumentTitle } from "../../utils";

export default function ErrorPage() {

    useDocumentTitle("Page Not Found")

    return (
        <div className="grand-main error-page">
            <div className="img-wrap ">
                <img className="img" src={image} alt="product-image" />
            </div>
            <h1 className="font-primary p-2">Page Not Found</h1>
        </div>
    );
}
