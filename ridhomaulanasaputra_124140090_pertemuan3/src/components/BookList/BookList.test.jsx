import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BookList from './BookList';

const books = [
  { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: 2, title: 'Bumi', author: 'Tere Liye', status: 'beli' },
];

describe('Komponen BookList', () => {
  test('merender semua buku beserta penulisnya', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Tere Liye')).toBeInTheDocument();
  });

  test('menampilkan pesan kosong jika tidak ada buku', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Belum ada buku yang cocok.')).toBeInTheDocument();
  });

  test('memanggil onDelete dengan id buku saat tombol Hapus diklik', () => {
    const handleDelete = vi.fn();
    render(<BookList books={books} onEdit={vi.fn()} onDelete={handleDelete} />);

    fireEvent.click(screen.getAllByText('Hapus')[0]);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  test('memanggil onEdit dengan objek buku saat tombol Edit diklik', () => {
    const handleEdit = vi.fn();
    render(<BookList books={books} onEdit={handleEdit} onDelete={vi.fn()} />);

    fireEvent.click(screen.getAllByText('Edit')[1]);
    expect(handleEdit).toHaveBeenCalledWith(books[1]);
  });
});
