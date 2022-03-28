import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const useCartReducer = (state, action) => {
    
    switch (action.type) {
        case "ADD_TO_CART":
            const isPresent = state.find((p) => p.id === action.payload.id);
            return isPresent
                ? [
                      ...state.map((p) => {
                          return p.id === action.payload.id
                              ? { ...p, quantity: p.quantity + 1 }
                              : p;
                      }),
                  ]
                : [...state, { ...action.payload, quantity: 1 }];

        case "REMOVE_FROM_CART":
            return [...state.filter((p) => p.id !== action.payload.id)];

        case "DECREMENT_QUANTITY":
            const product = state.find((p) => p.id === action.payload.id);
            return product
                ? product.quantity === 1
                    ? [...state.filter((p) => p.id !== action.payload.id)]
                    : [
                          ...state.map((p) =>
                              p.id === action.payload.id
                                  ? { ...p, quantity: p.quantity - 1 }
                                  : p
                          ),
                      ]
                : state;
        default:
            return [...state];
    }
};

export default function CartProvider({ children }) {
    const [cart, dispatchCart] = useReducer(useCartReducer, []);

    return (
        <CartContext.Provider
            value={{ cart, dispatchCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
