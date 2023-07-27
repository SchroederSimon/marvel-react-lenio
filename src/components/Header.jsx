
import { useState } from 'react';
import '../components/Header.css'
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const WhiteModeButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'whitemode'
  })`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  .fa-solid {
    color: white;
  }
`;
const Header = () => {
    const [whiteMode, setWhiteMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()

    const handleWhiteModeToggle = () => {
        setWhiteMode((prevMode) => !prevMode);
        document.body.classList.toggle('white-mode');
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate(`/character/${encodeURIComponent(searchTerm)}`);
    };

    const handleFavoritesClick = () => {
        navigate('/characters/favorites');
    };

    return (
        <header className='navbar-container'>
            <nav className='navbar'>
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="src/assets/marvel-logo.png" alt="Marvel Logo" />
                    </Link>
                </div>
                <form className="navbar-input" action="" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder='Deadpool... Spiderman...'
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button><i className="fa-solid fa-magnifying-glass fa-2x"></i></button>
                </form>
                <WhiteModeButton whitemode={whiteMode ? 'black' : 'white'}
                
                    onClick={handleWhiteModeToggle}>
                    <i className="fa-solid fa-circle-half-stroke fa-2x"></i>
                </WhiteModeButton>
                <i
                    className="fa-regular fa-star fa-2x"
                    onClick={handleFavoritesClick}
                    style={{ color: 'white',   cursor: 'pointer' }}
                ></i>
            </nav>
        </header>
    )
}

export default Header;
