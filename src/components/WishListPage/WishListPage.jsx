import React from "react";
import { useWishListContext } from "../../context";
import WishListCard from "../WishListCard";
import DisplayMessage from "../DisplayMessage"
import { useDocumentTitle } from "../../utils";

export default function WishListPage() {

    const {wishList} = useWishListContext()

    useDocumentTitle('Wishlist')

    return (
        <main className="grand-main">
            <h1 className="wishlist-header">Wishlist</h1>
            <div className="wishlist-container w-75">
                {wishList.map((product)=>{
                    return (<WishListCard key={product.id} productData={product}/>)
                })}
                
                {wishList.length===0 && <DisplayMessage message={"Your Wishlist is Empty. Add some items to wishlist"}/>}
            </div>
        </main>
    );
}
