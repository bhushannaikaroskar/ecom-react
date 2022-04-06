import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const toggle = () => {
        if(theme === "dark"){
            setTheme("light")
			localStorage.setItem('grand-data-theme', 'light');
        }else{
            setTheme("dark")
			localStorage.setItem('grand-data-theme', 'dark');
        }
    };

    useEffect(()=>{
        document.documentElement.setAttribute("data-theme", theme);

    },[theme])

    useEffect(()=>{
        const themeData = localStorage.getItem("grand-data-theme");
        if(themeData){
            document.documentElement.setAttribute("data-theme", themeData);
            setTheme(themeData);
        }else{
            localStorage.setItem("grand-data-theme", "light");
        }
    },[])

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = ()=>useContext(ThemeContext)