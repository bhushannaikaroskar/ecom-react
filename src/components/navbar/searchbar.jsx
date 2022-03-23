import React from "react";
import { SearchIcon } from "../../icons/icons";

export default function SearchBar() {
    return (
        <div className="nav-search-container">
            <SearchIcon/>
            <input
                type="search"
                className="input-field nav-search input-rounded"
                placeholder="Search"
            />
        </div>
    );
}
