import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductContext } from "../../context";
import { SearchIcon } from "../../icons/icons";

export default function SearchBar() {
    const [value, setValue] = useState("");
    const { setSearchValue } = useProductContext();
    const location = useLocation();
    const navigate = useNavigate();

    const searchHandler = (e) => {
        if (e.code === "Enter" || e.target.outerText === "search") {
            setSearchValue(value);
            setValue("");
            if (location.pathname !== "/product") {
                navigate("/product");
            }
        }
    };

    return (
        <div className="nav-search-container">
            <input
                style={{ width: "100%" }}
                type="search"
                value={value}
                className="input-field nav-search input-rounded"
                placeholder="Search"
                onChange={(e) => setValue(e.target.value)}
                onKeyDownCapture={searchHandler}
            />
            <div
                className="flex flex-start justify-content-center align-items-center p-0"
                style={{ paddingRight: "1rem", cursor: "pointer" }}
                value="search"
                onClick={(e) => {
                    searchHandler(e);
                }}
            >
                <SearchIcon />
            </div>
        </div>
    );
}
