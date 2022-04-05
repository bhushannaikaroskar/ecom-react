import { createContext, useContext, useReducer } from "react";
import useAxios from "../../utils/custom-hooks/useAxios";

const AuthContext = createContext();

const initialAuthState = {
    isAuthenticated: false,
    authToken: "",
};

export default function AuthProvider({ children }) {
    const { response, error, fetchData } = useAxios();

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
            } else {
                dispatchAuth({ type: "RESET" });
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
            } else {
                dispatchAuth({ type: "RESET" });
            }
        });
    };

    const logout = () => {
        dispatchAuth({ type: "RESET" });
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
