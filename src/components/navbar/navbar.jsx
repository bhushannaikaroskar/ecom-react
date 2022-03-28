import React from "react";
import { NavLink } from "react-router-dom";
import { useCartContext, useWishListContext } from "../../context";
import ShoppingCartIcon, {
    AccountIcon,
    DarkModeIcon,
    WishListIcon,
} from "../../icons/icons";
import Logo from "./logo";
import SearchBar from "./searchbar";

export default function NavBar() {
    const { wishList } = useWishListContext();
    const { cart } = useCartContext();
    return (
        <nav className="grand-nav navbar navbar-responsive box-shadow-100 p-2_5 p-y-1">
            <Logo />
            <SearchBar />
            <div className="nav-items">
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/wishlist"
                >
                    <div className="badge-container flex flex-column">
                        <WishListIcon />
                        {wishList.length > 0 && (
                            <span className="badge">{wishList.length}</span>
                        )}
                    </div>
                </NavLink>
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/cart"
                >
                    <div className="badge-container flex flex-column">
                        <ShoppingCartIcon />
                        {cart.length > 0 && (
                            <span className="badge">{cart.length}</span>
                        )}
                    </div>
                </NavLink>
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/login"
                >
                    <AccountIcon />
                </NavLink>
                <button
                    id="toggle-theme"
                    className="btn btn-link-secondary justify-content-start font-medium  font-color-gray"
                >
                    <DarkModeIcon />
                </button>
            </div>
        </nav>
    );
}
