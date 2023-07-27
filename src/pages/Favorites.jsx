import { useEffect, useState } from 'react';
import '../components/Cards.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className='card-container'>
      {favorites.length === 0 ? (
        <h1>No favorite characters yet.</h1>
      ) : (
        favorites.map((favorite) => (
          <div className='card' key={favorite.characterId}>
            <div className='card-information'>
              <img
                src={`${favorite.data.thumbnail.path}.${favorite.data.thumbnail.extension}`}
                alt={favorite.data.name}
              />
              <div className='card-information-name'>
                <h2>{favorite.data.name}</h2>
              </div>
              <div className='card-information-star'>
                <i className='fa-solid fa-star fa-2x favorite'></i>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;