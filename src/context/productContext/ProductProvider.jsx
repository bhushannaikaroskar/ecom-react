import { createContext, useContext, useReducer } from "react";
import {reducer} from "../../reducers/product-reducer"
import { productData} from "../../data"

const ProductContext = createContext();

const initialState = {
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
    sort: "",
    category:[]
};

const useFilterData = (stateObj, data) => {
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


export default function FilterProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const filteredData = useFilterData(state,productData)

    return (
        <ProductContext.Provider value={{ state, dispatch,filteredData }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
