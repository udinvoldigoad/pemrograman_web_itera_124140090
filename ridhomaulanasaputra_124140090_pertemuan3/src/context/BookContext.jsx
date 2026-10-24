import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext();

// Consumer hook: melempar error jika dipakai di luar Provider
// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  // Data buku disimpan permanen di localStorage lewat custom hook
  const [books, setBooks] = useLocalStorage('books_data', []);

  // State UI: filter status, kata kunci pencarian, dan buku yang sedang diedit
  const [statusFilter, setStatusFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  // --- CRUD ---
  const addBook = (book) => setBooks([...books, { ...book, id: Date.now() }]);

  const updateBook = (id, changes) =>
    setBooks(books.map((b) => (b.id === id ? { ...b, ...changes } : b)));

  const deleteBook = (id) => setBooks(books.filter((b) => b.id !== id));

  // --- Filter status + pencarian judul/penulis (case-insensitive) ---
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return books.filter((b) => {
      const matchStatus = statusFilter === 'semua' || b.status === statusFilter;
      const matchSearch =
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query);
      return matchStatus && matchSearch;
    });
  }, [books, statusFilter, searchQuery]);

  // Statistik dihitung dari seluruh buku (bukan yang terfilter)
  const stats = useBookStats(books);

  const value = {
    books,
    filteredBooks,
    stats,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    editingBook,
    setEditingBook,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
