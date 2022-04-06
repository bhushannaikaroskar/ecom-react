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
} from "./context";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <ThemeProvider>
                    <FilterProvider>
                        <CartProvider>
                            <WishListProvider>
                                <App />
                            </WishListProvider>
                        </CartProvider>
                    </FilterProvider>
                </ThemeProvider>
            </Router>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);


