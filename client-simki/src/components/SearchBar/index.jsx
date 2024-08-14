import React from "react";
import '../../Style/components/SearchBar.css';  
import search from "../../images/search.png";

const SearchBar = () => {
    const handleSearch = () => {
  
        const query = document.querySelector('.search-bar-input').value.toLowerCase();
        console.log("Mencari: ", query);
        

        const rows = document.querySelectorAll('table tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let rowContainsQuery = false;
            
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(query)) {
                    rowContainsQuery = true;
                }
            });
            
            if (rowContainsQuery) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
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
