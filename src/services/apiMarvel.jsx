import md5 from 'blueimp-md5';

export const fetchCharacters = async (searchTerm, characterId) => {
  try {
    const publicApiKey = import.meta.env.VITE_API_KEY_MAVEL;
    const privateApiKey = import.meta.env.VITE_API_KEY_PRIVATE_MARVEL;
    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
    const hash = md5(timestamp + privateApiKey + publicApiKey);

    let url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}`;

    if (characterId) {
      url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}`;
    } else if (searchTerm && searchTerm.trim() !== '') {
      url += `&nameStartsWith=${encodeURIComponent(searchTerm)}`;
    } else {
      url += `&orderBy=modified`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('La solicitud fetch no fue exitosa.');
    }
    const data = await response.json();
    console.log("Resultados desde call apiMarvel:", data.data.results);
    return data.data.results;
  } catch (error) {
    console.error('Error al fetchear los datos:', error);
    return [];
  }
};

