import React from "react";
import { useWishListContext } from "../../context";
import WishListCard from "../WishListCard";

export default function WishListPage() {

    const {wishList} = useWishListContext()

    return (
        <main class="grand-main">
            <h1 class="wishlist-header">Wishlist</h1>
            <div class="wishlist-container w-75">
                {wishList.map((product)=>{
                    return (<WishListCard productData={product}/>)
                })}
            </div>
        </main>
    );
}
