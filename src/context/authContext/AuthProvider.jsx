import { createContext, useContext, useReducer } from "react";
import { errorToast, successToast } from "../../utils";
import useAxios from "../../utils/custom-hooks/useAxios";
import { useTheme } from "../themeContext/ThemeProvider";

const AuthContext = createContext();

const initialAuthState = {
    isAuthenticated: false,
    authToken: "",
    user:{
        firstName:"",
        lastName:"",
        email:"",
    }
};

export default function AuthProvider({ children }) {
    const { response, error, fetchData } = useAxios();
    const {theme} = useTheme()

    const authReducer = (state, action) => {
        let email,firstName,lastName,_id;
        switch (action.type) {
            case "VERIFIED":
                console.log(action.payload.foundUser);
                ({email,firstName,lastName,_id} = action.payload.foundUser);
                console.log(email,firstName,lastName,_id)
                return {
                    ...state,
                    isAuthenticated: true,
                    user:{email,firstName,lastName,_id},
                    authToken: action.payload.token,

                };
            case "SIGNUP_VERIFIED":
                // console.log(action.payload.foundUser)
                ({email,firstName,lastName,_id} = action.payload.createdUser);
                console.log(email,firstName,lastName,_id)
                return {
                    ...state,
                    isAuthenticated: true,
                    user:{email,firstName,lastName,_id},
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
                    payload: { token: res.data.encodedToken,...res.data },
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
                    type: "SIGNUP_VERIFIED",
                    payload: { token: res.data.encodedToken,...res.data },
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
