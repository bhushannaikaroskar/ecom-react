import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../context";
import { useAuth } from "../context/authContext/AuthProvider";
import { infoToast } from "../utils";

export default function PrivateRoute() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const {theme} = useTheme()

    const redirect = ()=>{
        navigate('../login')
    }

    useEffect(()=>{
        if(!auth.isAuthenticated){
            redirect()
            infoToast("Login to use wishlist",theme)
        }
    })

    return (
        <>
            {auth.isAuthenticated ? (
                <Outlet />
            ) : (
                <div>Private route accessed denied</div>
            )}
        </>
    );
}
