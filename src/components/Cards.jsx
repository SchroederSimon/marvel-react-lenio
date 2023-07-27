import { useEffect, useState } from 'react';
import '../components/Cards.css'
import { fetchCharacters } from '../services/apiMarvel';
import { useParams } from 'react-router-dom';
import Modal from '../pages/Modal';
import useFavorites from '../customHooks/useFavorites';


const Cards = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const { favorites, toggleFavorite } = useFavorites();

    const { characterName } = useParams();

    const handleCharacterClick = async (characterId) => {
        const comics = await fetchCharacters(null, characterId);
        setSelectedCharacter({ characterId, comics });
        console.log("selectedCharacterId: cards", { characterId, comics });
      };

    useEffect(() => {
        const fetchData = async () => {
            if (characterName) {
                const data = await fetchCharacters(characterName);
                setCharacters(data);
            } else {
                const data = await fetchCharacters();
                setCharacters(data);
            }
        };
        fetchData();
    }, [characterName]);

    const handleFavoriteToggle = (characterId) => {
        toggleFavorite(characterId, characters);
      };
    
    

    return (
        <main className='card-container'>
            {characters.map((character) => (
                <div className="card" key={character.id}>
                    <div className="card-information">
                        <img onClick={() => handleCharacterClick(character.id)}
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={character.name}
                        />
                        <div className="card-information-name">
                            <h2>{character.name}</h2>
                        </div>
                        <div className="card-information-star">
                            <i
                                className={`fa-2x ${favorites.some((favorite) => favorite.characterId === character.id)
                                    ? 'fa-solid fa-star custom-star favorite'
                                    : 'fa-regular fa-star custom-star'
                                    }`}
                                onClick={() => handleFavoriteToggle(character.id)}
                            ></i>
                        </div>
                    </div>
                </div>
            ))}
            {selectedCharacter && (
                <Modal
                    onClose={() => setSelectedCharacter(null)}
                    character={selectedCharacter}
                />
            )}
        </main>
    );
}

export default Cards;
