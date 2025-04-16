import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite, onClick }) => {
  const typeColors = {
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

  // Determine card background style
  const getCardStyle = () => {
    if (pokemon.types.length === 2) {
      return {
        background: `linear-gradient(135deg, 
          ${typeColors[pokemon.types[0]]} 0%, 
          ${typeColors[pokemon.types[1]]} 100%)`,
        borderColor: typeColors[pokemon.types[0]]
      };
    }
    return {
      backgroundColor: typeColors[pokemon.types[0]],
      borderColor: typeColors[pokemon.types[0]]
    };
  };

  // Get contrasting text color
  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div 
      className="pokemon-card" 
      style={getCardStyle()}
      onClick={onClick}
    >
      {/* Card top decoration */}
      <div className="card-top-decoration">
        <div className="card-holographic-effect"></div>
        <div className="card-energy-symbols">
          {pokemon.types.map((type, index) => (
            <div 
              key={index} 
              className="energy-symbol"
              style={{ 
                backgroundColor: typeColors[type],
                color: getContrastColor(typeColors[type])
              }}
            >
              {type.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Card header */}
      <div className="card-header">
        <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
        <span className="pokemon-hp">
          HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}
        </span>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      
      {/* Pokémon image */}
      <div className="pokemon-image-container">
        <div className="image-frame">
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="pokemon-image"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Pokémon info */}
      <div className="pokemon-info">
        <h3 className="pokemon-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          <span className="pokemon-level">Lv. {Math.floor(pokemon.base_experience / 10) || 50}</span>
        </h3>
        
        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span 
              key={type} 
              className="type-badge"
              style={{ 
                backgroundColor: `${typeColors[type]}80`,
                borderColor: typeColors[type],
                color: getContrastColor(typeColors[type])
              }}
            >
              {type.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Weakness/Resistance section */}
        <div className="pokemon-weakness">
          <span className="weakness-label">Weakness:</span>
          <span className="weakness-value">
            {pokemon.types[0] === 'grass' ? 'FIRE' : 
             pokemon.types[0] === 'water' ? 'ELECTRIC' :
             pokemon.types[0] === 'fire' ? 'WATER' :
             pokemon.types[0] === 'electric' ? 'GROUND' : 
             'VARIES'}
          </span>
        </div>
      </div>

      {/* Card bottom decoration */}
      <div className="card-bottom-decoration">
        <div className="card-holographic-effect"></div>
      </div>
    </div>
  );
};

export default PokemonCard;