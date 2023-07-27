import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (characterId, characters) => {
    const isCharacterInFavorites = favorites.some((favorite) => favorite.characterId === characterId);

    const updatedFavorites = [...favorites];
    
    if (isCharacterInFavorites) {
      const index = updatedFavorites.findIndex((favorite) => favorite.characterId === characterId);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
      }
    } else {
      const selectedCharacterData = characters.find((character) => character.id === characterId);
      if (selectedCharacterData) {
        updatedFavorites.push({ characterId, data: selectedCharacterData });
        setFavorites(updatedFavorites);
      }
    }
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;