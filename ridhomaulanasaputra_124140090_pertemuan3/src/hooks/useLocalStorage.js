import { useState, useEffect } from 'react';

// Hook generik: state yang otomatis tersinkron dengan localStorage
function useLocalStorage(key, initialValue) {
  // Lazy initializer: baca localStorage hanya sekali saat pertama render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Simpan ulang setiap kali nilai berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
