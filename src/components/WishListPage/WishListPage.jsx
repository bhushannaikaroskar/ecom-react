import React from "react";
import { useWishListContext } from "../../context";
import WishListCard from "../WishListCard";

export default function WishListPage() {

    const {wishList} = useWishListContext()

    return (
        <main className="grand-main">
            <h1 className="wishlist-header">Wishlist</h1>
            <div className="wishlist-container w-75">
                {wishList.map((product)=>{
                    return (<WishListCard productData={product}/>)
                })}
            </div>
        </main>
    );
}
