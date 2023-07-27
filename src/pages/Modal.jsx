import styled from 'styled-components';
import PropTypes from 'prop-types'; // Import PropTypes from the prop-types package
import '../pages/Modal.css'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 30px;
  max-width: 800px;
  max-height: 800px;
  overflow-y: auto;
  border-radius: 10px;
`;


const Modal = ({ onClose, character }) => {
    const { comics } = character;

    return (
        <ModalContainer>
            <ModalContent>
                <div className="comic-button">
                    <button onClick={onClose}>X</button>
                </div>
                <div>
                    <ul className="list-comics">
                        {comics.map((comic) => (
                            <li key={comic.id}>
                                <div className="content-comics">
                                    <h2>{comic.title}</h2>
                                    <img
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                    />
                                    <h3>Description</h3>
                                    <p>{comic.description}</p>
                                    <p>Format: {comic.format}</p>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            </ModalContent>
        </ModalContainer>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    character: PropTypes.shape({
        characterId: PropTypes.number.isRequired,
        comics: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                description: PropTypes.string,
                issueNumber: PropTypes.number,
                format: PropTypes.string,
                thumbnail: PropTypes.shape({
                    path: PropTypes.string,
                    extension: PropTypes.string,
                }).isRequired,
            })
        ),
    }),
};

export default Modal;