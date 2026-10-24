import { renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import useBookStats from './useBookStats';

describe('Hook useBookStats', () => {
  test('menghitung total dan jumlah per status', () => {
    const books = [
      { id: 1, title: 'A', author: 'X', status: 'milik' },
      { id: 2, title: 'B', author: 'Y', status: 'baca' },
      { id: 3, title: 'C', author: 'Z', status: 'baca' },
    ];
    const { result } = renderHook(() => useBookStats(books));

    expect(result.current).toEqual({ total: 3, milik: 1, baca: 2, beli: 0 });
  });

  test('mengembalikan nol semua jika daftar kosong', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current).toEqual({ total: 0, milik: 0, baca: 0, beli: 0 });
  });
});
