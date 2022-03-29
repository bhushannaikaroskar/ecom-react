import { createContext, useContext, useState } from "react";

const WishListContext = createContext();

export default function WishListProvider({ children }) {
    const [wishList,setWishList] = useState([])

    const wishListHandler = (product)=>{
        const isPresent = wishList.find((p)=> p.id === product.id)
        if(isPresent){
            setWishList( wishList.filter((p)=>p.id !== product.id))
        }else{
            setWishList((previousWishList)=>([...previousWishList,{...product}]))
        }
    }

    return (
        <WishListContext.Provider value={{ wishList, wishListHandler }}>
            {children}
        </WishListContext.Provider>
    );
}

export const useWishListContext = () => useContext(WishListContext);
