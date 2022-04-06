import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth, useCartContext, useTheme, useWishListContext } from "../../context";
import ShoppingCartIcon, {
    AccountIcon,
    DarkModeIcon,
    LightModeIcon,
    WishListIcon,
} from "../../icons/icons";
import Logo from "./logo";
import SearchBar from "./searchbar";

export default function NavBar() {
    const { wishList } = useWishListContext();
    const { cart } = useCartContext();
    const { auth,logout } = useAuth();
    const {theme,toggle} = useTheme()
 
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
                <div class="badge-container account flex flex-column">
                    <NavLink
                        className="btn btn-link-secondary justify-content-start font-color-gray"
                        to="/login"
                    >
                        <AccountIcon />
                    </NavLink>

                    {auth.isAuthenticated && (
                        <div class="account-modal">
                            <button class="btn btn-link-secondary font-error" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <button
                    id="toggle-theme"
                    className="btn btn-link-secondary justify-content-start font-medium  font-color-gray"
                    onClick={toggle}
                >
                    {theme === "light" ? <DarkModeIcon />:<LightModeIcon/>}
                </button>
            </div>
        </nav>
    );
}
