import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, useCartContext, useProductContext, useTheme, useWishListContext } from "../../context";
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
    const {setSearchValue} = useProductContext();
 
    return (
        <nav className="grand-nav navbar navbar-responsive box-shadow-100 p-2_5 p-y-1">
            <Logo />
            <NavLink style={{minWidth:"100%" , maxWidth:"800px"}} className="btn btn-link-secondary justify-content-start font-large font-dark-gray" to="/product">
                Shop
            </NavLink>
            <SearchBar />
            <div className="nav-items">
                <NavLink
                    className="btn btn-link-secondary justify-content-start font-color-gray"
                    to="/wishlist"
                    onClick={()=>setSearchValue("")}
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
                    onClick={()=>setSearchValue("")}
                >
                    <div className="badge-container flex flex-column">
                        <ShoppingCartIcon />
                        {cart.length > 0 && (
                            <span className="badge">{cart.length}</span>
                        )}
                    </div>
                </NavLink>
                <div className="badge-container account flex flex-column">
                    <NavLink
                        className="btn btn-link-secondary justify-content-start font-color-gray"
                        to="/login"
                        onClick={()=>setSearchValue("")}
                    >
                        <AccountIcon />
                    </NavLink>

                    {auth.isAuthenticated && (
                        <div className="account-modal">
                            <Link className="btn btn-link-secondary" to="/profile"> Profile </Link>
                            <button className="btn btn-link-secondary font-error" onClick={logout}>
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
