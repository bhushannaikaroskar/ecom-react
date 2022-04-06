export const initialState = {
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
    sort: "",
    category:[]
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SORT":
            return { ...state, sort: action.payload };
        case "RATING":
            return { ...state, rating: action.payload };
        case "MAX_PRICE":
            return { ...state, maxPrice: action.payload };
        case "CATEGORY":
            return state.category.includes(action.payload)
                ? {...state,category: [...state.category.filter((c) => c !== action.payload)]}
                : { ...state, category: [...state.category, action.payload] };
        case "RESET":
            return { ...initialState,category:[]};
                
        default:
            return state;
    }
};