import React from "react";
import { NavLink } from "react-router-dom";
import { useWishListContext } from "../../context";
import ShoppingCartIcon, {
    AccountIcon,
    DarkModeIcon,
    WishListIcon,
} from "../../icons/icons";
import Logo from "./logo";
import SearchBar from "./searchbar";

export default function NavBar() {

    const {wishList} = useWishListContext();
    return (
        <nav className="grand-nav navbar navbar-responsive box-shadow-100 p-2_5 p-y-1">
            <Logo />
            <SearchBar />
            <div className="nav-items">
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/wishlist"
                >
                    <div class="badge-container flex flex-column">
                        <WishListIcon />
                        {wishList.length>0 && <span class="badge">{wishList.length}</span>}
                    </div>
                </NavLink>
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/cart"
                >
                    <ShoppingCartIcon />
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
