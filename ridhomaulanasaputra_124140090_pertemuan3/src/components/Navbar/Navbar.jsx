import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <span className="logo">📚 Buku Saya</span>
        <ul className="nav-links">
          <li><NavLink to="/" end>Beranda</NavLink></li>
          <li><NavLink to="/stats">Statistik</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
