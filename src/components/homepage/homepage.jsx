import React from "react";
import CategoryCard from "../CategoryCard";
import { featuredData } from "../../data";
import { CarouselImage2 } from "../../assets";

import {
    CategoryChessPiece,
    CategoryChessBoard,
    CategoryChessSet,
    CategoryClock,
    CategoryBook,
    CategoryWearables
} from "../../assets";
import ProductCard from "../ProductCard";
import { NavLink } from "react-router-dom";
import { useDocumentTitle } from "../../utils";

export default function HomePage() {

    useDocumentTitle("Home")

    return (
        <main className="grand-main">
            <div className="carousel img-wrap w-100">
                <img
                    className="img"
                    loading="lazy"
                    src={CarouselImage2}
                    alt="product-img"
                />
                <div className="card-overlay">
                    <h2 className="font-xx-large">
                        Upto 30% OFF on Chess Products
                    </h2>
                    <h4>Limited Period</h4>
                    <div className="p-2"></div>
                    <NavLink
                        className="btn btn-primary fw-700 p-2 p-y-1 font-x-large"
                        to="/product"
                    >
                        Shop Now
                    </NavLink>
                </div>
            </div>
            <h1 className="text-align-center p-y-2">Top Categories</h1>
            <div className="category w-100 p-y-2">
                <CategoryCard title="Chess Set" imageLink={CategoryChessSet} categoryName="set"/>
                <CategoryCard title="Pieces" imageLink={CategoryChessPiece} categoryName="pieces"/>
                <CategoryCard
                    title="Chess Boards"
                    imageLink={CategoryChessBoard}
                    categoryName="board"
                />
                <CategoryCard
                    title="Chess Accessories"
                    imageLink={CategoryClock}
                    categoryName="accessories"
                />
                <CategoryCard
                    title="Chess Books"
                    imageLink={CategoryBook}
                    categoryName="books"
                />
                <CategoryCard
                    title="Wearables"
                    imageLink={CategoryWearables}
                    categoryName="clothing"
                />
            </div>
            <h1 className="text-align-center p-y-2">Featured Products</h1>
            <div className="trending">
                {featuredData.map((product) => {
                    return <ProductCard key={product._id} productData={product} />;
                })}
            </div>
        </main>
    );
}
