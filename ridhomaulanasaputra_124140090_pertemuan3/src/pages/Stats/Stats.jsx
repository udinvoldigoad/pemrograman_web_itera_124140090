import { useBooks } from '../../context/BookContext';
import './Stats.css';

function Stats() {
  const { stats } = useBooks();

  return (
    <main className="container stats-page">
      <h1>Statistik Buku</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span>Total Buku</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.milik}</span>
          <span>Milik</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.baca}</span>
          <span>Sedang Dibaca</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.beli}</span>
          <span>Ingin Dibeli</span>
        </div>
      </div>
    </main>
  );
}

export default Stats;
