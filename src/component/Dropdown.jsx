import React, { useState, useEffect } from "react";

// Fetching country data
const Dropdown = ({ selected, setSelected, label }) => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    // Fetch country data from API
    const fetchCountryList = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const formattedData = data.map((country) => ({
        name: country.name.common,
        currency: Object.keys(country.currencies || {}).join(", "),
        code: country.cca2,
      }));
      setCountryList(formattedData);
    };

    fetchCountryList();
  }, []);

  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {countryList.map((country) => (
          <option key={country.code} value={country.currency}>
            {country.name} ({country.currency})
            <img
              src={`https://flagsapi.com/${country.code}/flat/24.png`}
              alt={country.name}
              className="flag-img"
            />
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
