export const cartReducer = (state, action) => {  
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