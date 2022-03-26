import React, { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

const initialState = {
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
    sort: "",
    category:[]
};

const filterData = (stateObj, data) => {
    let newData = [...data];

    if (stateObj.rating !== 0) {
        newData = newData.filter((product) => product.rating >= stateObj.rating);
    }

    if(stateObj.category.length >0){
        newData = newData.filter((product)=>stateObj.category.includes(product.category))
    }

    if(stateObj.maxPrice !== Infinity){
        newData = newData.filter((product) => product.price.newPrice <= stateObj.maxPrice);
    }

    switch (stateObj.sort) {
        case "LOW_TO_HIGH":
            newData.sort((a, b) => a.price.newPrice - b.price.newPrice);
            break;
        case "HIGH_TO_LOW":
            newData.sort((a, b) => b.price.newPrice - a.price.newPrice);
            break;
        case "POPULARITY":
            newData.sort((a, b) => b.popularity - a.popularity);
            break;
        default:
            break;
    }

    return newData;
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SORT":
            return { ...state, sort: action.payload };
        case "RATING":
            return { ...state, rating: action.payload };
        case "MAX_PRICE":
            console.log(action.payload)
            return { ...state, maxPrice: action.payload };
        case "CATEGORY":
            return state.category.includes(action.payload)
                ? {...state,category: [...state.category.filter((c) => c !== action.payload)]}
                : { ...state, category: [...state.category, action.payload] };
        default:
            return state;
    }
};

export default function FilterProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
export { filterData };
