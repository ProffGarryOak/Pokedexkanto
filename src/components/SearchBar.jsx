import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, selectedType, setSelectedType }) => {
  const typeColors = {
    all: '#A8A8A8',
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  const typeIcons = {
    normal: '●',
    fire: '🔥',
    water: '💧',
    electric: '⚡',
    grass: '🌿',
    ice: '❄️',
    fighting: '✊',
    poison: '☠️',
    ground: '🏜️',
    flying: '🕊️',
    psychic: '🔮',
    bug: '🐛',
    rock: '🪨',
    ghost: '👻',
    dragon: '🐉',
    dark: '🌑',
    steel: '🛡️',
    fairy: '✨'
  };

  return (
    <div className="pokemon-search-container">
      <div className="pokemon-search-bar">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pokemon-search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      
      
    </div>
  );
};

// Helper function to determine contrasting text color
function getContrastColor(hexColor) {
  if (!hexColor) return '#000';
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#000000' : '#FFFFFF';
}

export default SearchBar;