import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthProvider";

export default function RestrictedRoute() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const redirect = () => {
        navigate(-1);
    };
    useEffect(() => {
        if (auth.isAuthenticated) {
            redirect();
        }
    });

    return <>{auth.isAuthenticated ? <div>Redirecting</div> : <Outlet />}</>;
}
