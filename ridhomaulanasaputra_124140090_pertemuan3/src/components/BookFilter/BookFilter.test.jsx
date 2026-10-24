import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BookFilter from './BookFilter';

describe('Komponen BookFilter', () => {
  const setup = () => {
    const onStatusChange = vi.fn();
    const onSearchChange = vi.fn();
    render(
      <BookFilter
        status="semua"
        onStatusChange={onStatusChange}
        searchQuery=""
        onSearchChange={onSearchChange}
      />
    );
    return { onStatusChange, onSearchChange };
  };

  test('memanggil onSearchChange saat mengetik di kolom pencarian', () => {
    const { onSearchChange } = setup();
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'laskar' } });
    expect(onSearchChange).toHaveBeenCalledWith('laskar');
  });

  test('memanggil onStatusChange saat status filter diganti', () => {
    const { onStatusChange } = setup();
    fireEvent.change(screen.getByLabelText('Filter status'), { target: { value: 'baca' } });
    expect(onStatusChange).toHaveBeenCalledWith('baca');
  });
});
