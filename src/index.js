import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
    AuthProvider,
    CartProvider,
    FilterProvider,
    WishListProvider,
    ThemeProvider,
    AddressProvider,
} from "./context";
import { makeServer } from "./server";
import OrdersProvider from "./context/OrdersProvider";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <FilterProvider>
                        <CartProvider>
                            <WishListProvider>
                                <AddressProvider>
                                    <OrdersProvider>
                                        <App />
                                    </OrdersProvider>
                                </AddressProvider>
                            </WishListProvider>
                        </CartProvider>
                    </FilterProvider>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
