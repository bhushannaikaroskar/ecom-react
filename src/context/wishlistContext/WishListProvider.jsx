import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/custom-hooks/useAxios";
import { useAuth } from "../authContext/AuthProvider";

const WishListContext = createContext();

export default function WishListProvider({ children }) {
    const [wishList, setWishList] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { fetchData } = useAxios();

    const fetchWishList = (product) => {
        fetchData({
            method: "get",
            url: "/api/user/wishlist",
            headers: { authorization: auth.authToken },
            data: {},
        }).then((res) => {
            console.log(res);
            setWishList(res.data.wishlist);
        });
    };

    const addToWishList = async (product) => {
        const isPresent = wishList.find((p) => p.id === product.id);
        let isError = false;
        if(isPresent){
            return;
        }
        await fetchData({
            method: "post",
            url: "/api/user/wishlist",
            headers: { authorization: auth.authToken },
            data: {
                product: product,
            },
        }).then((res) => {
            console.log("add to wishlist called",res)
            if (res.status !== 404 && res.status !== 500) {
                setWishList(res.data.wishlist);
            } else {
                isError = true;
            }
        })
        if(isError){
            navigate("/login");
        }
    };

    const removeFromWishlist = async (product) => {
        let isError = false;
        await fetchData({
            method: "DELETE",
            url: `/api/user/wishlist/${product._id}`,
            headers: { authorization: auth.authToken },
            data: {},
        }).then((res) => {
            if (res.status !== 404 && res.status !== 500) {
                setWishList(res.data.wishlist);
            } else {
                isError = true;
            }
        })

        
        if(isError){
            navigate("/login");
        }
    };

    const wishListHandler = async (product, setLoader = () => {}) => {
        setLoader(true);
        const isPresent = wishList.find((p) => p.id === product.id);
        if (isPresent) {
            await removeFromWishlist(product);
        } else {
            await addToWishList(product);
        }
        setLoader(false);
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            console.log("wishlist is available");
            fetchWishList();
        } else {
            console.log("not available wishlist");
            setWishList([]);
        }
    }, [auth]);

    return (
        <WishListContext.Provider
            value={{ wishList, wishListHandler, addToWishList }}
        >
            {children}
        </WishListContext.Provider>
    );
}

export const useWishListContext = () => useContext(WishListContext);
