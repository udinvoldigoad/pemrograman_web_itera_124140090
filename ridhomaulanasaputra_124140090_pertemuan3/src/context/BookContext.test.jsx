import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { BookProvider, useBooks } from './BookContext';

const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>;

describe('BookContext', () => {
  beforeEach(() => {
    // Bersihkan penyimpanan agar setiap test mulai dari kondisi kosong
    localStorage.clear();
  });

  test('addBook menambah buku dan menyimpannya ke localStorage', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    act(() => {
      result.current.addBook({ title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' });
    });

    expect(result.current.books).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('books_data'))).toHaveLength(1);
  });

  test('deleteBook menghapus buku berdasarkan id', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    act(() => {
      result.current.addBook({ title: 'Bumi', author: 'Tere Liye', status: 'beli' });
    });
    const id = result.current.books[0].id;
    act(() => {
      result.current.deleteBook(id);
    });

    expect(result.current.books).toHaveLength(0);
  });

  test('pencarian dan filter status menyaring daftar buku', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    act(() => {
      result.current.addBook({ title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' });
    });
    act(() => {
      result.current.addBook({ title: 'Bumi', author: 'Tere Liye', status: 'beli' });
    });

    act(() => result.current.setSearchQuery('tere'));
    expect(result.current.filteredBooks).toHaveLength(1);
    expect(result.current.filteredBooks[0].title).toBe('Bumi');

    act(() => {
      result.current.setSearchQuery('');
      result.current.setStatusFilter('milik');
    });
    expect(result.current.filteredBooks).toHaveLength(1);
    expect(result.current.filteredBooks[0].title).toBe('Laskar Pelangi');
  });

  test('useBooks melempar error jika dipakai di luar BookProvider', () => {
    // Redam console.error bawaan React agar output test tidak berisik
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useBooks())).toThrow(
      'useBooks harus digunakan di dalam BookProvider'
    );
    spy.mockRestore();
  });
});
