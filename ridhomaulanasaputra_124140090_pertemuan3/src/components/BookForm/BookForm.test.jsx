import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BookForm from './BookForm';

describe('Komponen BookForm', () => {
  test('merender kolom judul, penulis, dan status', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('Judul')).toBeInTheDocument();
    expect(screen.getByLabelText('Penulis')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  test('menampilkan pesan error dan tidak submit saat kolom kosong', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('memanggil onSubmit dengan data yang sudah di-trim', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: '  Laskar Pelangi  ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Andrea Hirata' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'baca',
    });
  });

  test('mode edit: form terisi data awal dan tombol berubah', () => {
    const book = { id: 1, title: 'Bumi', author: 'Tere Liye', status: 'milik' };
    render(<BookForm onSubmit={vi.fn()} initialData={book} onCancel={vi.fn()} />);

    expect(screen.getByLabelText('Judul')).toHaveValue('Bumi');
    expect(screen.getByLabelText('Penulis')).toHaveValue('Tere Liye');
    expect(screen.getByRole('button', { name: 'Simpan Perubahan' })).toBeInTheDocument();
  });
});
