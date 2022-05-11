import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils";
import useAxios from "../../utils/custom-hooks/useAxios";
import { useAuth } from "../authContext/AuthProvider";
import { useTheme } from "../themeContext/ThemeProvider";

const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const { auth } = useAuth();
    const {theme} = useTheme();
    const navigate = useNavigate();
    const { loading, fetchData } = useAxios();

    const incrementCount = async (product, setLoader = () => {}) => {
        setLoader(true);
        let isError = false;
        console.log("incrementCount called");
        await fetchData({
            method: "post",
            url: `/api/user/cart/${product.id}`,
            headers: { authorization: auth.authToken },
            data: {
                action: {
                    type: "increment",
                },
            },
        }).then((res) => {
                if (res.status !== 404 && res.status !== 500) {
                    setCart(res.data.cart);
                } else {
                    isError = true;
                }
            })
            .catch((err) => console.log(err.response));
        setLoader(false);
        if (isError) {
            navigate("/login");
            errorToast("Login first to use Cart",theme)
        }
    };

    const addToCart = async (product, setLoader = () => {}) => {
        const isPresent = cart.findIndex((prod) => prod._id === product._id);
        setLoader(true);
        let isError = false;
        if (isPresent === -1) {
            await fetchData({
                method: "post",
                url: "/api/user/cart",
                headers: { authorization: auth.authToken },
                data: {
                    product,
                },
            }).then((res) => {
                console.log(res);
                if (res.status !== 404 && res.status !== 500) {
                    setCart(res.data.cart);
                    successToast("Item added to cart",theme)
                } else {
                    isError = true;
                }
            });
        } else {
            await incrementCount(product);
        }
        setLoader(false);
        if (isError) {
            navigate("/login");
            errorToast("Login first to use Cart",theme)
        }
    };

    const removeFromCart = async (product, setLoader = () => {}) => {
        setLoader(true);
        let isError = false;
        await fetchData({
            method: "delete",
            url: `/api/user/cart/${product.id}`,
            headers: { authorization: auth.authToken },
            data: {},
        }).then((res) => {
                if (res.status !== 404 && res.status !== 500) {
                    setCart(res.data.cart);
                    successToast("Item removed from cart",theme)
                } else {
                    isError = true;
                }
            })
            .catch((err) => console.log(err.response));

        setLoader(false);
        if (isError) {
            navigate("/login");
        }
    };

    const decrementQuantity = async (product, setLoader = () => {}) => {
        const cartProduct = cart.find((prod) => prod._id === product._id);
        setLoader(true);
        let isError = false;
        if (cartProduct.qty > 1) {
            await fetchData({
                method: "post",
                url: `/api/user/cart/${product.id}`,
                headers: { authorization: auth.authToken },
                data: {
                    action: {
                        type: "decrement",
                    },
                },
            }).then((res) => {
                    if (res.status !== 404 && res.status !== 500) {
                        setCart(res.data.cart);
                    } else {
                        isError = true;
                    }
                })
                .catch((err) => console.log(err.response));
        } else {
            removeFromCart(product);
        }
        setLoader(false);
        if (isError) {
            navigate("/login");
        }
    };

    const fetchCart = () => {
        fetchData({
            method: "get",
            url: "/api/user/cart",
            headers: { authorization: auth.authToken },
            data: {},
        }).then((res) => setCart(res.data.cart));
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            fetchCart();
        } else {
            setCart([]);
        }
    }, [auth]);;

    return (
        <CartContext.Provider
            value={{
                cart,
                fetchCart,
                setCart,
                addToCart,
                incrementCount,
                decrementQuantity,
                removeFromCart,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
