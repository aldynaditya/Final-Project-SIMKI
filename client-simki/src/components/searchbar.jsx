import React from "react";
import './SearchBar.css';  // Pastikan file ini ada untuk styling
import search from "../images/search.png";

const SearchBar = () => {
    const handleSearch = () => {
        // Logika untuk pencarian
        const query = document.querySelector('.search-bar-input').value;
        console.log("Mencari nama: ", query);
        // Tambahkan logika pencarian sesuai kebutuhan Anda
    };

    return (
        <div className="search-bar-container">
            <input 
                type="text" 
                placeholder="Pencarian" 
                className="search-bar-input" 
            />
            <button className="search-bar-button" onClick={handleSearch}>
                <img src={search} alt="Search" />
            </button>
        </div>
    );
};

export default SearchBar;
