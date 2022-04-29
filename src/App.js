import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
    Footer,
    HomePage,
    ProductPage,
    NavBar,
    WishListPage,
    CartPage,
    RestrictedRoute,
    LoginPage,
    SignUpPage,
    PrivateRoute,
    ErrorPage,
    ProfilePage,
    Profile,
    Orders,
    Address,
} from "./components";
import ProductDetail from "./components/product-detail-page/ProductDetail";

function App() {
    const location = useLocation();
    const isProductPage = location.pathname === "/product";

    return (
        <div className={"grand-body " + (isProductPage ? "grid-products" : "")}>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/wishlist" element={<WishListPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="" element={<Profile />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="address" element={<Address />} />
                    </Route>
                </Route>
                <Route element={<RestrictedRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer position="bottom-right" />
            <Footer />
        </div>
    );
}

export default App;
