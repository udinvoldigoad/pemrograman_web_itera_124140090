import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

function Home() {
  const {
    filteredBooks,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    editingBook,
    setEditingBook,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();

  // Satu handler untuk dua mode: edit jika ada editingBook, selain itu tambah
  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus buku ini?')) return;
    deleteBook(id);
    // Kalau buku yang dihapus sedang diedit, tutup mode edit
    if (editingBook?.id === id) setEditingBook(null);
  };

  return (
    <main className="container home">
      {/* key memaksa form dibuat ulang saat pindah antara tambah/edit buku lain,
          sehingga state form selalu terisi dengan data yang benar */}
      <BookForm
        key={editingBook ? editingBook.id : 'new'}
        onSubmit={handleSubmit}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <BookFilter
        status={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <BookList
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default Home;
