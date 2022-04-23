import React from "react";
import { useProductContext } from "../../context";
import ProductCard from "../ProductCard";
import ProductFilters from "./ProductFilter";
import DisplayMessage from "../DisplayMessage"
import { useDocumentTitle } from "../../utils";

export default function ProductPage() {

    const {filteredData,searchValue} = useProductContext()
    useDocumentTitle("Products")

    return (
        <>
            <ProductFilters />
            <main className="grand-main">
                
                <h2 className="font-black">{searchValue !== "" ?`Search Results for "${searchValue}"`:"Showing All Products"}</h2>
                <div className="products-list">
                    {filteredData.map((product) => {
                        return <ProductCard key={product._id} productData={product} />;
                    })}
                </div>
                {filteredData.length===0 && <DisplayMessage message={"No products found"}/>}
            </main>
        </>
    );
}
