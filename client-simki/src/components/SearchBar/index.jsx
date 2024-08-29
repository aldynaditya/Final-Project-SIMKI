import React from "react";
import '../../Style/components/SearchBar.css';  
import search from "../../images/search.png";

const SearchBar = ({ onSearch }) => {
    const handleChange = (event) => {
        const query = event.target.value.toLowerCase();
        console.log("Mencari: ", query);
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className="search-bar-container">
            <input 
                type="text" 
                placeholder="Pencarian" 
                className="search-bar-input" 
                onChange={handleChange}
            />
            <button className="search-bar-button">
                <img src={search} alt="Search" />
            </button>
        </div>
    );
};

export default SearchBar;
