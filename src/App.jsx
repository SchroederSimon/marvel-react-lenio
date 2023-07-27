import './App.css'
import Cards from './components/Cards'
import Header from './components/Header'
import Favorites from './pages/Favorites'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="character/:characterName" element={<Cards />} />
        <Route path="characters/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App
