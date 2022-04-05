import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
    CartProvider,
    FilterProvider,
    WishListProvider,
} from "./context";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
            <Router>
                <FilterProvider>
                    <CartProvider>
                        <WishListProvider>
                            <App />
                        </WishListProvider>
                    </CartProvider>
                </FilterProvider>
            </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
