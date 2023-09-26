import React, { useState, useEffect } from "react";
import "./DataFilter.css";

const DataFilter = ({ data, onFilter, property }) => {
  const uniqueValues = Array.from(new Set(data.map((item) => item[property])));

  const [selectedCriteria, setSelectedCriteria] = useState([]);

  const handleCriteriaSelection = (criteria) => {
    if (selectedCriteria.includes(criteria)) {
      setSelectedCriteria(selectedCriteria.filter((c) => c !== criteria));
    } else {
      setSelectedCriteria([...selectedCriteria, criteria]);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCriteria]);

  const applyFilter = () => {
    let filteredData = data;

    if (selectedCriteria.length > 0) {
      filteredData = data.filter((item) =>
        selectedCriteria.includes(item[property])
      );
    }

    onFilter(filteredData);
  };

  return (
    <div>
      <div className="data-filter-container">
        {uniqueValues.map((criteria) => (
          <label key={criteria}>
            <input
              type="checkbox"
              value={criteria}
              checked={selectedCriteria.includes(criteria)}
              onChange={() => handleCriteriaSelection(criteria)}
            />
            {criteria}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DataFilter;
