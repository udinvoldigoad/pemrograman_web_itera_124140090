import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <Router>
      {/* Provider membungkus semua halaman agar state buku dibagi global */}
      <BookProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </BookProvider>
    </Router>
  );
}

export default App;
