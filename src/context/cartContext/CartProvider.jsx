import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../../reducers";

const CartContext = createContext();



export default function CartProvider({ children }) {
    const [cart, dispatchCart] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider
            value={{ cart, dispatchCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
