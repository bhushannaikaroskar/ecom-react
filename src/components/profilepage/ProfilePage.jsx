import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./profilepage.css";

const activeLink = {
    color:"var(--PRIMARY-500)",
    fontWeight:"600",
    borderLeft:"5px solid var(--PRIMARY-400)"
}

export default function ProfilePage() {

    return (
        <div className="grand-main">
            <h2 className="fw-600 text-align-center font-xx-large">
                My Account
            </h2>
            <div className="profile-container">
                <div className="profile-options">
                    <ul className="list">
                        <li className="list-item p-0">
                            <NavLink style={({isActive})=>isActive?activeLink:{}} className="btn btn-link-secondary" to="/profile/">
                                Profile
                            </NavLink>
                        </li>
                        <li className="list-item p-0">
                            <NavLink style={({isActive})=>isActive?activeLink:{}}  className="btn btn-link-secondary" to="/profile/address">
                                Address
                            </NavLink>
                        </li>
                        <li className="list-item p-0">
                            <NavLink style={({isActive})=>isActive?activeLink:{}}  className="btn btn-link-secondary" to="/profile/orders">
                                orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="profile-content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
