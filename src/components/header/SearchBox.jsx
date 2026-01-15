import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSuggestions([]);
  }, [location]);
  return (
    <>
      <div className="search_box_container">
        <form onSubmit={handleSubmit} className="search_box">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search For Product"
            autoComplete="off"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestion">
            {suggestions.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id}>
                <li key={item.id}>
                  <img src={item.images[0]} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBox;
