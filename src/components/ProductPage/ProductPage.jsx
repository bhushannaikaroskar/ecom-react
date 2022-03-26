import React from "react";
import { filterData, useProductContext } from "../../context/productContext/ProductProvider";
import { productData } from "../../data";
import ProductCard from "../ProductCard";
import ProductFilters from "./ProductFilter";

export default function ProductPage() {

    const {state,dispatch} = useProductContext()


    return (
        <>
            <ProductFilters />
            <main className="grand-main">
                <h2 className="font-black">Showing All Products</h2>
                <div className="products-list">
                    {filterData(state,productData).map((product) => {
                        return <ProductCard productData={product} />;
                    })}
                </div>
            </main>
        </>
    );
}
