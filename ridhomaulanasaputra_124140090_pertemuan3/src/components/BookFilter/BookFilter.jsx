import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({ status, onStatusChange, searchQuery, onSearchChange }) {
  return (
    <div className="book-filter">
      <input
        type="text"
        aria-label="Cari buku"
        placeholder="Cari judul atau penulis..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        aria-label="Filter status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="semua">Semua</option>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;
