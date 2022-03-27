import React from "react";
import { useProductContext } from "../../context";
import ProductCard from "../ProductCard";
import ProductFilters from "./ProductFilter";

export default function ProductPage() {

    const {filteredData} = useProductContext()

    return (
        <>
            <ProductFilters />
            <main className="grand-main">
                <h2 className="font-black">Showing All Products</h2>
                <div className="products-list">
                    {filteredData.map((product) => {
                        return <ProductCard productData={product} />;
                    })}
                </div>
            </main>
        </>
    );
}
