import React from 'react';
import './TypeFilter.css';

const types = [
  'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ selectedType, setSelectedType }) => {
  return (
    <div className="type-filter">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {types.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;