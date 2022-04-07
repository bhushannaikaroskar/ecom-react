import { createContext, useContext, useReducer } from "react";
import { errorToast, successToast } from "../../utils";
import useAxios from "../../utils/custom-hooks/useAxios";
import { useTheme } from "../themeContext/ThemeProvider";

const AuthContext = createContext();

const initialAuthState = {
    isAuthenticated: false,
    authToken: "",
};

export default function AuthProvider({ children }) {
    const { response, error, fetchData } = useAxios();
    const {theme} = useTheme()

    const authReducer = (state, action) => {
        switch (action.type) {
            case "VERIFIED":
                return {
                    ...state,
                    isAuthenticated: true,
                    authToken: action.payload.token,
                };
            case "RESET":
                return { ...initialAuthState };
            default:
                return state;
        }
    };

    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);

    const loginUser = (email, password) => {
        fetchData({
            method: "post",
            url: "/api/auth/login",
            headers: { accept: "*/*" },
            data: {
                email: email,
                password: password,
            },
        }).then((res) => {
            console.log(res);
            if (res.status !== 404 && res.status !== 401) {
                dispatchAuth({
                    type: "VERIFIED",
                    payload: { token: res.data.encodedToken },
                });
                successToast("Logged in Successfully",theme)
            } else {
                dispatchAuth({ type: "RESET" });
                errorToast("There was some error while logginng in",theme)
            }
        });
    };

    const signUpUser = async (email, password) => {
        await fetchData({
            method: "post",
            url: "/api/auth/signup",
            data: {
                email: email,
                password: password,
            },
        }).then((res) => {
            if (res.status !== 422) {
                dispatchAuth({
                    type: "VERIFIED",
                    payload: { token: res.data.encodedToken },
                });
                successToast("Signin Successful",theme)
            } else {
                dispatchAuth({ type: "RESET" });
                errorToast("There was some error in signing",theme)
            }
        });
    };

    const logout = () => {
        dispatchAuth({ type: "RESET" });
        successToast("Successfully logged out.",theme)
    };

    return (
        <AuthContext.Provider
            value={{ auth, response, error, loginUser, signUpUser, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
