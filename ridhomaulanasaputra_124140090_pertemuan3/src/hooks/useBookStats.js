import { useMemo } from 'react';

// Hook turunan: menghitung statistik dari daftar buku
// Status yang dipakai: 'milik' | 'baca' | 'beli'
function useBookStats(books) {
  return useMemo(() => {
    const milik = books.filter((b) => b.status === 'milik').length;
    const baca = books.filter((b) => b.status === 'baca').length;
    const beli = books.filter((b) => b.status === 'beli').length;

    return {
      total: books.length,
      milik,
      baca,
      beli,
    };
  }, [books]);
}

export default useBookStats;
