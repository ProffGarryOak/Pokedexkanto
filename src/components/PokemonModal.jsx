import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import './PokemonModal.css';

const PokemonModal = ({ pokemon, isFavorite, toggleFavorite, onClose }) => {
  
  const [activeImage, setActiveImage] = useState('normal');
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (pokemon.cry) {
      const crySound = new Howl({
        src: [pokemon.cry],
        html5: true
      });
      setSound(crySound);
      
      // Play sound when modal opens
      crySound.play();

      return () => {
        crySound.unload();
      };
    }
  }, [pokemon.cry]);

  const playSound = () => {
    if (sound) {
      sound.play();
    }
  };
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

  const primaryType = pokemon.types[0];
  const modalStyle = {
    backgroundColor: typeColors[primaryType] || '#A8A878'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pokemon-modal" style={modalStyle} onClick={e => e.stopPropagation()}>
       
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(pokemon.id)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="modal-content">
        <div className="modal-image-container">
          <img 
            src={activeImage === 'normal' ? pokemon.image : pokemon.shinyImage} 
            alt={pokemon.name}
            onClick={() => {
              setActiveImage(prev => prev === 'normal' ? 'shiny' : 'normal');
              playSound();
            }}
          />
          <div className="image-toggle">
            <button 
              className={activeImage === 'normal' ? 'active nrmlbtn' : 'nrmlbtn'}
              onClick={() => setActiveImage('normal')}
            >
              Normal
            </button>
            <button 
              className={activeImage === 'shiny' ? 'active shnbtn' : 'shnbtn'}
              onClick={() => setActiveImage('shiny')}
            >
              Shiny
            </button>
          </div>
          
        </div>
          
          <div className="modal-details">
            <div className="types">
              <h3>Type</h3>
              <div className="type-badges">
                {pokemon.types.map(type => (
                  <span 
                    key={type} 
                    className="type-badge"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="stats">
              <h3>Stats</h3>
              <div className="stat-bars">
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="stat-row">
                    <span className="stat-name">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar" 
                        style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                      >
                        {stat.base_stat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="physical-details">
              <div className="detail">
                <h4>Height</h4>
                <p>{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div className="detail">
                <h4>Weight</h4>
                <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
            
            <div className="abilities">
              <h3>Abilities</h3>
              <div className="ability-badges">
                {pokemon.abilities.map(ability => (
                  <span key={ability.ability.name} className="ability-badge">
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;