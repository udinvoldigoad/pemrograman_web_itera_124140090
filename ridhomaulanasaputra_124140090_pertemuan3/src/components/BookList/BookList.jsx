import PropTypes from 'prop-types';
import './BookList.css';

const STATUS_LABEL = {
  milik: 'Milik',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

function BookList({ books, onEdit, onDelete }) {
  // Tampilan kosong (empty state)
  if (books.length === 0) {
    return <p className="empty-message">Belum ada buku yang cocok.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <div className="book-info">
            <strong>{book.title}</strong>
            <span className="book-author">{book.author}</span>
            <span className={`badge badge-${book.status}`}>
              {STATUS_LABEL[book.status]}
            </span>
          </div>
          <div className="book-actions">
            <button className="btn" onClick={() => onEdit(book)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(book.id)}>Hapus</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
