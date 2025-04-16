import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import PokemonModal from './components/PokemonModal';
import SkeletonLoader from './components/SkeletonLoader';
import { Howl } from 'howler';
import { motion, AnimatePresence } from 'framer-motion';
// import { PokeballLoading } from 'react-pokemon-loading';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        const detailedPokemon = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.other['official-artwork'].front_default || 
                    details.data.sprites.front_default,
              shinyImage: details.data.sprites.other['official-artwork'].front_shiny,
              types: details.data.types.map(type => type.type.name),
              stats: details.data.stats,
              abilities: details.data.abilities,
              height: details.data.height,
              weight: details.data.weight,
              cry: details.data.cries.latest || `https://pokemoncries.com/cries/${details.data.id}.mp3`
            };
          })
        );
        setPokemonList(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();

    // Load favorites from local storage
    const storedFavorites = localStorage.getItem('pokemonFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const results = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(results);
    setCurrentPage(1);
  }, [searchTerm, pokemonList]);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) 
        ? prev.filter(pokeId => pokeId !== id)
        : [...prev, id]
    );
  };

  // Pagination logic
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      {/* Animated background elements */}
      <div className="pokeball-bg"></div>
      <div className="particles"></div>
      
      <motion.header 
        className="app-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <h1>
          <span>Poké</span>dex Explorer
          <div className="header-decoration"></div>
        </h1>
        <div className='hi'><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
      </motion.header>

      <main className="pokemon-container">
        {loading ? (
          <div className="loading-screen">

            <p>Loading Pokémon...</p>
          </div>
        ) : (
          <>
            <AnimatePresence>
              <motion.div 
                className="pokemon-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.05 }}
              >
                {currentPokemon.map(pokemon => (
                  <motion.div
                    key={pokemon.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring' }}
                  >
                    <PokemonCard
                      pokemon={pokemon}
                      isFavorite={favorites.includes(pokemon.id)}
                      toggleFavorite={toggleFavorite}
                      onClick={() => setSelectedPokemon(pokemon)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredPokemon.length === 0 && (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" alt="Psyduck" />
                <p>No Pokémon found matching your search!</p>
              </motion.div>
            )}

            {totalPages > 1 && (
              <motion.div 
                className="pagination"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  « Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={currentPage === pageNum ? 'active' : ''}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next »
                </button>
              </motion.div>
            )}
          </>
        )}
      </main>

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            isFavorite={favorites.includes(selectedPokemon.id)}
            toggleFavorite={toggleFavorite}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;