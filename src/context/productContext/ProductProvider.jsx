import { createContext, useContext, useEffect, useReducer, useState } from "react";
import {reducer,initialState} from "../../reducers/product-reducer"
import useAxios from "../../utils/custom-hooks/useAxios";

const ProductContext = createContext();

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
    const [state, dispatch] = useReducer(reducer, {...initialState});
    const [productData,setProductData] = useState([])
    const [searchValue,setSearchValue] = useState("")
    const {fetchData} = useAxios();
    const searchedData = productData.filter((product)=> product.title.toLowerCase().search(searchValue.toLowerCase()) !== -1)
    const filteredData = useFilterData(state,searchedData)

    useEffect(()=>{
        fetchData({
            method: "get",
            url: "/api/products"
        }).then((res)=>{
            setProductData(res.data.products)
        })
    },[])

    return (
        <ProductContext.Provider value={{ state, dispatch,filteredData,productData,setSearchValue,searchValue }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
